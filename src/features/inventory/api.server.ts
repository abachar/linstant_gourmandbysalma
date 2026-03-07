import { db, inventory } from "@common/db";
import { asc, eq } from "drizzle-orm";

export async function getInventory() {
	return await db.select().from(inventory).orderBy(asc(inventory.productName));
}

export async function getInventoryById(id: string) {
	const [item] = await db.select().from(inventory).where(eq(inventory.id, id)).limit(1);

	return item;
}

export async function createInventoryItem(data: { productName: string; quantity: number }) {
	const [result] = await db
		.insert(inventory)
		.values({
			productName: data.productName,
			quantity: data.quantity,
			updatedAt: new Date(),
		})
		.returning({ id: inventory.id });

	return { id: result.id };
}

export async function updateInventoryItem(data: { id: string; productName: string; quantity: number }) {
	await db
		.update(inventory)
		.set({
			productName: data.productName,
			quantity: data.quantity,
			updatedAt: new Date(),
		})
		.where(eq(inventory.id, data.id));
}
