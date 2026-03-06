import {  asc, sql } from "drizzle-orm";
import { db, inventory } from "@common/db";

export async function getInventory() {
	const result = await db
		.select()
		.from(inventory)
    .orderBy(asc(inventory.productName));

	return result.map((s) => ({
		id: s.id,
		productName: s.productName,
		quantity: s.quantity
	}));
}
