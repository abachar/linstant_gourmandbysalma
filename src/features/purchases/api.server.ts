import { desc, eq } from "drizzle-orm";
import { db, purchases } from "@common/db";

export async function getPurchases() {
	const result = await db
		.select()
		.from(purchases)
		.orderBy(desc(purchases.date));

	return result.map((s) => ({
		id: s.id,
		date: s.date,
		description: s.description,
		amount: s.amount,
	}));
}

export async function getPurchaseById(id: string) {
	const [purchase] = await db
		.select()
		.from(purchases)
		.where(eq(purchases.id, id))
		.limit(1);

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
