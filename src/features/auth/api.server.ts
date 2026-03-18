import { scrypt, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";
import { getCookie, getRequestIP, setCookie } from "@tanstack/react-start/server";
import { RateLimiterMemory } from "rate-limiter-flexible";
import { createSessionToken, SESSION_MAX_AGE_SECONDS, verifySessionToken } from "./session";

const rateLimiter = new RateLimiterMemory({ points: 5, duration: 15 * 60 });
const scryptAsync = promisify(scrypt);
const COOKIE_NAME = "auth_session";

function getSessionKey(): Uint8Array {
	const secretHex = process.env.SESSION_SECRET_HEX;
	if (!secretHex) throw new Error("SESSION_SECRET_HEX is not set");
	return Buffer.from(secretHex, "hex");
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

export async function login(email: string, password: string) {
	const ip = getRequestIP({ xForwardedFor: true }) ?? "unknown";

	try {
		await rateLimiter.consume(ip);
	} catch (e: unknown) {
		const msBeforeNext = (e as { msBeforeNext?: number }).msBeforeNext ?? 0;
		const remainingMin = Math.ceil(msBeforeNext / 60000);
		throw new Error(`Trop de tentatives. Réessayez dans ${remainingMin} minute${remainingMin > 1 ? "s" : ""}.`);
	}

	const emailValid = verifyEmail(email);
	const passwordValid = emailValid && (await verifyPassword(password));

	if (!emailValid || !passwordValid) {
		throw new Error("Email ou mot de passe incorrect.");
	}

	await rateLimiter.delete(ip);

	const key = getSessionKey();
	const token = await createSessionToken(key);
	setCookie(COOKIE_NAME, token, {
		httpOnly: true,
		sameSite: "lax",
		path: "/",
		maxAge: SESSION_MAX_AGE_SECONDS,
		secure: process.env.NODE_ENV === "production",
	});
}

export async function getSession() {
	try {
		const token = getCookie(COOKIE_NAME);
		const key = getSessionKey();
		return { authenticated: await verifySessionToken(token, key) };
	} catch (e) {
		console.error(e);
		return { authenticated: false };
	}
}
