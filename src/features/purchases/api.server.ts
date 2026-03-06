import {  desc } from "drizzle-orm";
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
