import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { parse } from "csv-parse/sync";
import { db, inventory, purchases, sales } from "../src/common/db";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function parseCSV(filename: string): any[] {
	return parse(readFileSync(resolve(__dirname, `./data/${filename}`), "utf-8"), { columns: true });
}

function toTimestamp(value: string): Date {
	return new Date(value.replace(" ", "T").replace("+00", "Z"));
}

function mapPaymentMethod(value: string): string {
	if (value === "Cash") return "Espèces";
	if (value === "Revolut" || value === "PayPal") return "Bancaire";
	return value;
}

// ---------------------------------------------------------------------------
// Seed functions
// ---------------------------------------------------------------------------

async function seedInventory() {
	const records = parseCSV("inventory_rows.csv");

	for (const r of records) {
		await db.insert(inventory).values({
			id: r.id,
			productName: r.product_name,
			quantity: parseInt(r.quantity, 10),
			updatedAt: toTimestamp(r.created_at),
		});
	}

	console.log(`✓ Inventory : ${records.length} lignes`);
}

async function seedPurchases() {
	const records = parseCSV("purchases_rows.csv");

	for (const r of records) {
		await db.insert(purchases).values({
			id: r.id,
			date: new Date(r.date),
			amount: r.amount,
			description: r.description || null,
			createdAt: toTimestamp(r.created_at),
		});
	}

	console.log(`✓ Purchases : ${records.length} lignes`);
}

async function seedSales() {
	const records = parseCSV("sales_rows.csv");

	for (const r of records) {
		await db.insert(sales).values({
			id: r.id,
			clientName: r.clientName,
			deliveryDatetime: toTimestamp(r.deliveryDateTime),
			deliveryAddress: r.deliveryAddress || null,
			description: r.description || null,
			amount: r.amount,
			deposit: r.deposit,
			depositPaymentMethod: mapPaymentMethod(r.depositPaymentMethod),
			remaining: r.remaining,
			remainingPaymentMethod: mapPaymentMethod(r.remainingPaymentMethod),
			quoteGeneratedAt: r.quote_generated_at ? toTimestamp(r.quote_generated_at) : null,
			createdAt: toTimestamp(r.created_at),
		});
	}

	console.log(`✓ Sales     : ${records.length} lignes`);
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
async function main() {
	console.log("Seeding database...");
	await seedInventory();
	await seedPurchases();
	await seedSales();
	console.log("Done!");
	process.exit(0);
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
