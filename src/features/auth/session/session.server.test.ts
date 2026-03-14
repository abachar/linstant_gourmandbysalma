import { beforeAll, describe, expect, it } from "vitest";
import { createSessionToken, importSessionKey, SESSION_MAX_AGE_SECONDS, verifySessionToken } from "./session.server";

const TEST_SECRET = "test-secret-for-vitest-1234567890ab";

let key: CryptoKey;

beforeAll(async () => {
	key = await importSessionKey(TEST_SECRET);
});

describe("importSessionKey", () => {
	it("retourne une CryptoKey HMAC", async () => {
		const k = await importSessionKey(TEST_SECRET);
		expect(k.type).toBe("secret");
		expect(k.algorithm.name).toBe("HMAC");
	});
});

describe("createSessionToken", () => {
	it("retourne un token au format base64.hex", async () => {
		const token = await createSessionToken(key);
		expect(token).toMatch(/^[A-Za-z0-9+/=]+\.[0-9a-f]+$/);
	});

	it("encode un timestamp en base64", async () => {
		const before = Date.now();
		const token = await createSessionToken(key);
		const after = Date.now();

		const [encoded] = token.split(".");
		const timestamp = parseInt(Buffer.from(encoded, "base64").toString("utf-8"), 10);
		expect(timestamp).toBeGreaterThanOrEqual(before);
		expect(timestamp).toBeLessThanOrEqual(after);
	});

	it("génère des tokens distincts à chaque appel", async () => {
		const t1 = await createSessionToken(key);
		await new Promise((r) => setTimeout(r, 2)); // ensure different timestamps
		const t2 = await createSessionToken(key);
		expect(t1).not.toBe(t2);
	});
});

describe("verifySessionToken", () => {
	it("valide un token récemment créé", async () => {
		const token = await createSessionToken(key);
		expect(await verifySessionToken(token, key)).toBe(true);
	});

	it("rejette undefined", async () => {
		expect(await verifySessionToken(undefined, key)).toBe(false);
	});

	it("rejette un token vide", async () => {
		expect(await verifySessionToken("", key)).toBe(false);
	});

	it("rejette un token mal formé (sans point)", async () => {
		expect(await verifySessionToken("abcdef", key)).toBe(false);
	});

	it("rejette un token avec signature invalide", async () => {
		const token = await createSessionToken(key);
		const [encoded] = token.split(".");
		expect(await verifySessionToken(`${encoded}.deadbeef`, key)).toBe(false);
	});

	it("rejette un token signé avec une clé différente", async () => {
		const otherKey = await importSessionKey("autre-secret-complètement-différent");
		const token = await createSessionToken(otherKey);
		expect(await verifySessionToken(token, key)).toBe(false);
	});

	it("rejette un token expiré", async () => {
		// Forge a token with a timestamp older than SESSION_MAX_AGE_SECONDS
		const expiredTimestamp = Date.now() - SESSION_MAX_AGE_SECONDS * 1000 - 1000;
		const encoded = Buffer.from(expiredTimestamp.toString()).toString("base64");
		const sig = Buffer.from(await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(encoded))).toString("hex");
		const token = `${encoded}.${sig}`;
		expect(await verifySessionToken(token, key)).toBe(false);
	});

	it("rejette un token avec timestamp futur", async () => {
		const futureTimestamp = Date.now() + 1_000_000;
		const encoded = Buffer.from(futureTimestamp.toString()).toString("base64");
		const sig = Buffer.from(await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(encoded))).toString("hex");
		const token = `${encoded}.${sig}`;
		expect(await verifySessionToken(token, key)).toBe(false);
	});
});
