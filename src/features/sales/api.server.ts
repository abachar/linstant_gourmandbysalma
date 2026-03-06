import { endOfDay, startOfDay } from "date-fns";
import { between, desc } from "drizzle-orm";
import { db, sales } from "@common/db";

export async function getSales(from: Date, end: Date) {
	const result = await db
		.select()
		.from(sales)
    .where(between(sales.deliveryDatetime, startOfDay(from), endOfDay(end)))
    .orderBy(desc(sales.deliveryDatetime));

	return result.map((s) => ({
		id: s.id,
		clientName: s.clientName,
		deliveryDatetime: s.deliveryDatetime,
		deliveryAddress: s.deliveryAddress,
		description: s.description,
		deposit: s.deposit,
		depositPaymentMethod: s.depositPaymentMethod,
		remaining: s.remaining,
		remainingPaymentMethod: s.remainingPaymentMethod,
		amount: s.amount,
	}));
}
