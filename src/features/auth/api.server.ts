import { scrypt, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";
import { getCookie, setCookie } from "@tanstack/solid-start/server";
import { createSessionToken, importSessionKey, SESSION_MAX_AGE_SECONDS, verifySessionToken } from "./session";

const scryptAsync = promisify(scrypt);
const COOKIE_NAME = "auth_session";

let _sessionKey: CryptoKey | null = null;
async function getSessionKey() {
	if (_sessionKey) return _sessionKey;

	const secret = process.env.SESSION_SECRET_HEX;
	if (!secret) throw new Error("SESSION_SECRET_HEX is not set");
	_sessionKey = await importSessionKey(secret);
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

export async function login(email: string, password: string) {
	if (!verifyEmail(email)) {
		throw new Error("Email ou mot de passe incorrect.");
	}

	const isValid = await verifyPassword(password);
	if (!isValid) {
		throw new Error("Email ou mot de passe incorrect.");
	}

	const key = await getSessionKey();
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
		const key = await getSessionKey();
		return { authenticated: await verifySessionToken(token, key) };
	} catch (e) {
		console.error(e);
		return { authenticated: false };
	}
}
