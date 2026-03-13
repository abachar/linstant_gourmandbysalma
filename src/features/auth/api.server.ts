import { scrypt, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";
import { getCookie, setCookie } from "@tanstack/solid-start/server";

const scryptAsync = promisify(scrypt);
const COOKIE_NAME = "auth_session";
const MAX_AGE_SECONDS = 7 * 24 * 60 * 60; // 7 days

let _sessionKey: CryptoKey | null = null;
async function getSessionKey() {
	if (_sessionKey) return _sessionKey;

	const secret = process.env.SESSION_SECRET_HEX;
	if (!secret) throw new Error("SESSION_SECRET_HEX is not set");
	const encodedSecret = new TextEncoder().encode(secret);
	_sessionKey = await crypto.subtle.importKey("raw", encodedSecret, { name: "HMAC", hash: "SHA-256" }, false, [
		"sign",
		"verify",
	]);
	return _sessionKey;
}

function getStoredPassword() {
	const adminPasswordHex = process.env.APP_ADMIN_PASSWORD_HEX;
	if (!adminPasswordHex) throw new Error("APP_ADMIN_PASSWORD_HEX is not set");

	// format: "salt:hash"
	const [salt, storedHash] = adminPasswordHex.split(":");
	if (!salt || !storedHash) throw new Error("APP_ADMIN_PASSWORD_HEX has invalide format");

	return [salt, storedHash];
}

function verifyEmail(email: string) {
	const adminEmail = process.env.APP_ADMIN_EMAIL;
	if (!adminEmail) throw new Error("APP_ADMIN_EMAIL is not set");
	return email === adminEmail;
}

async function verifyPassword(password: string) {
	const [salt, storedHash] = getStoredPassword();
	const derivedKey = (await scryptAsync(password, salt, 64)) as Buffer;
	const storedKey = Buffer.from(storedHash, "hex");

	// Comparaison en temps constant pour éviter les timing attacks
	return timingSafeEqual(derivedKey, storedKey);
}

async function createSessionToken() {
	const encoded = Buffer.from(Date.now().toString()).toString("base64");
	const key = await getSessionKey();
	const sig = Buffer.from(await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(encoded))).toString("hex");
	return `${encoded}.${sig}`;
}

export async function login(email: string, password: string) {
	if (!verifyEmail(email)) {
		throw new Error("Email ou mot de passe incorrect.");
	}

	const isValid = await verifyPassword(password);
	if (!isValid) {
		throw new Error("Email ou mot de passe incorrect.");
	}

	const token = await createSessionToken();
	setCookie(COOKIE_NAME, token, {
		httpOnly: true,
		sameSite: "lax",
		path: "/",
		maxAge: MAX_AGE_SECONDS,
		secure: process.env.NODE_ENV === "production",
	});
}

async function verifySessionToken(token: string | undefined) {
	if (!token) return false;

	const parts = token.split(".");
	if (parts.length !== 2) return false;

	const [encoded, sig] = parts;
	const key = await getSessionKey();
	const sigBuffer = Buffer.from(sig, "hex");
	const dataBuffer = new TextEncoder().encode(encoded);
	const isValid = await crypto.subtle.verify("HMAC", key, sigBuffer, dataBuffer);
	if (!isValid) return false;

	const decodedPayload = Buffer.from(encoded, "base64").toString("utf-8");
	const timestamp = parseInt(decodedPayload, 10);
	if (Number.isNaN(timestamp)) return false;

	const ageMs = Date.now() - timestamp;
	if (ageMs > MAX_AGE_SECONDS * 1000) return false;
	if (ageMs < 0) return false;
	return true;
}

export async function getSession() {
	try {
		const token = getCookie(COOKIE_NAME);
		return { authenticated: await verifySessionToken(token) };
	} catch (e) {
		console.error(e);
		return { authenticated: false };
	}
}
