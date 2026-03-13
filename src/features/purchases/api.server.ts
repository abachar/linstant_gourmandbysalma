import { createHash } from "node:crypto";
import { db, purchases } from "@common/db";
import { parse } from "csv-parse/sync";
import { desc, eq } from "drizzle-orm";

export async function findAllPurchases() {
	const result = await db.select().from(purchases).orderBy(desc(purchases.date));
	return result.map((s) => ({
		id: s.id,
		date: s.date,
		description: s.description,
		amount: s.amount,
		isImported: s.importRef !== null,
		createdAt: s.createdAt,
	}));
}

export async function importPurchasesFromCsv(csvText: string) {
	console.log("Import purchases from Revolut");

	const records = parse<{ Type: string; "Date de début": string; Description: string; Montant: string }>(csvText, {
		columns: true,
		skip_empty_lines: true,
		relax_column_count: true,
	});

	console.log("Parsed", records.length, "records");

	const rows = records
		.filter((record) => ["Paiement par carte", "Remboursement sur carte"].includes(record.Type))
		.map((record) => ({
			date: record["Date de début"].split(" ")[0] ?? "",
			amount: (Number(record.Montant) * -1).toFixed(2),
			description: record.Description,
		}))
		.map((row) => ({
			...row,
			date: new Date(row.date),
			importRef: createHash("sha256").update(`${row.date}|${row.amount}|${row.description}`).digest("hex"),
		}));

	console.log("Found", records, "paiments");

	const result = await db
		.insert(purchases)
		.values(rows)
		.onConflictDoNothing({ target: purchases.importRef })
		.returning({ id: purchases.id });

	console.log("Inserted", result.length, "rows");
}

export async function findPurchaseById(id: string) {
	const [purchase] = await db.select().from(purchases).where(eq(purchases.id, id)).limit(1);
	return purchase;
}

export async function createPurchase(data: { date: string; amount: string; description?: string }) {
	const [result] = await db
		.insert(purchases)
		.values({
			date: new Date(data.date),
			amount: data.amount,
			description: data.description ?? null,
		})
		.returning({ id: purchases.id });
	return { id: result.id };
}

export async function updatePurchase(data: { id: string; date: string; amount: string; description?: string }) {
	await db
		.update(purchases)
		.set({
			date: new Date(data.date),
			amount: data.amount,
			description: data.description ?? null,
		})
		.where(eq(purchases.id, data.id));
}

export async function deletePurchaseById(id: string) {
	await db.delete(purchases).where(eq(purchases.id, id));
}
