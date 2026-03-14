export const SESSION_MAX_AGE_SECONDS = 7 * 24 * 60 * 60; // 7 days

export async function importSessionKey(secret: string): Promise<CryptoKey> {
	return crypto.subtle.importKey("raw", new TextEncoder().encode(secret), { name: "HMAC", hash: "SHA-256" }, false, [
		"sign",
		"verify",
	]);
}

export async function createSessionToken(key: CryptoKey): Promise<string> {
	const encoded = Buffer.from(Date.now().toString()).toString("base64");
	const sig = Buffer.from(await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(encoded))).toString("hex");
	return `${encoded}.${sig}`;
}

export async function verifySessionToken(token: string | undefined, key: CryptoKey): Promise<boolean> {
	if (!token) return false;

	const parts = token.split(".");
	if (parts.length !== 2) return false;

	const [encoded, sig] = parts;
	const isValid = await crypto.subtle.verify("HMAC", key, Buffer.from(sig, "hex"), new TextEncoder().encode(encoded));
	if (!isValid) return false;

	const timestamp = parseInt(Buffer.from(encoded, "base64").toString("utf-8"), 10);
	if (Number.isNaN(timestamp)) return false;

	const ageMs = Date.now() - timestamp;
	if (ageMs > SESSION_MAX_AGE_SECONDS * 1000) return false;
	if (ageMs < 0) return false;

	return true;
}
