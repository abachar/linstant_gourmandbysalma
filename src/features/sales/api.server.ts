import { endOfDay, startOfDay } from "date-fns";
import { between, desc, eq } from "drizzle-orm";
import { db, sales } from "@common/db";

export async function getSales(from: Date, end: Date) {
	return await db
		.select()
		.from(sales)
    .where(between(sales.deliveryDatetime, startOfDay(from), endOfDay(end)))
    .orderBy(desc(sales.deliveryDatetime));
}

export async function getOneSaleById(id: string) {
  const [sale] = await db
    .select()
    .from(sales)
    .where(eq(sales.id, id))
    .limit(1);

  return sale;
}
