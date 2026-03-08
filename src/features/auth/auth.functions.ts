import { createHmac, scrypt, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";
import { createServerFn } from "@tanstack/solid-start";
import { getCookie, setCookie } from "@tanstack/solid-start/server";

const COOKIE_NAME = "session";
const MAX_AGE_SECONDS = 7 * 24 * 60 * 60; // 7 days

const scryptAsync = promisify(scrypt);

function getSecret(): string {
	const secret = process.env.SESSION_SECRET;
	if (!secret) throw new Error("SESSION_SECRET is not set");
	return secret;
}

function getPassword(): string {
	const password = process.env.APP_PASSWORD;
	if (!password) throw new Error("APP_PASSWORD is not set");
	return password;
}

async function verifyPassword(password: string, stored: string): Promise<boolean> {
	const [salt, hash] = stored.split(":");
	const hashBuffer = Buffer.from(hash, "hex");
	const derived = (await scryptAsync(password, salt, 64)) as Buffer;
	return timingSafeEqual(hashBuffer, derived);
}

function createSessionToken(): string {
	const timestamp = Date.now().toString();
	const encoded = Buffer.from(timestamp).toString("base64");
	const sig = createHmac("sha256", getSecret()).update(encoded).digest("hex");
	return `${encoded}.${sig}`;
}

function verifySessionToken(token: string): boolean {
	const parts = token.split(".");
	if (parts.length !== 2) return false;

	const [encoded, sig] = parts;

	const expectedSig = createHmac("sha256", getSecret()).update(encoded).digest("hex");
	if (expectedSig !== sig) return false;

	const timestamp = parseInt(Buffer.from(encoded, "base64").toString("utf-8"), 10);
	if (Number.isNaN(timestamp)) return false;

	const ageMs = Date.now() - timestamp;
	if (ageMs > MAX_AGE_SECONDS * 1000) return false;

	return true;
}

export const loginFn = createServerFn({ method: "POST" })
	.inputValidator((data: { password: string }) => data)
	.handler(async ({ data }) => {
		const expected = getPassword();
		const isValid = await verifyPassword(data.password, expected);
		if (!isValid) {
			throw new Error("Mot de passe incorrect");
		}

		const token = createSessionToken();
		setCookie(COOKIE_NAME, token, {
			httpOnly: true,
			sameSite: "lax",
			path: "/",
			maxAge: MAX_AGE_SECONDS,
			secure: process.env.NODE_ENV === "production",
		});
	});

export const getSessionFn = createServerFn({ method: "GET" }).handler(async () => {
	const token = getCookie(COOKIE_NAME);
	if (!token) return { authenticated: false as const };
	const valid = verifySessionToken(token);
	return { authenticated: valid };
});
