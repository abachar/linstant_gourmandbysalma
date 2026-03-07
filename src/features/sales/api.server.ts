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

type SaleData = {
  clientName: string;
  deliveryDatetime: string;
  deliveryAddress?: string;
  description?: string;
  amount: string;
  deposit: string;
  depositPaymentMethod: string;
  remaining: string;
  remainingPaymentMethod: string;
};

export async function createSale(data: SaleData) {
  const [result] = await db
    .insert(sales)
    .values({
      clientName: data.clientName,
      deliveryDatetime: new Date(data.deliveryDatetime),
      deliveryAddress: data.deliveryAddress ?? null,
      description: data.description ?? null,
      amount: data.amount,
      deposit: data.deposit,
      depositPaymentMethod: data.depositPaymentMethod,
      remaining: data.remaining,
      remainingPaymentMethod: data.remainingPaymentMethod,
    })
    .returning({ id: sales.id });

  return { id: result.id };
}

export async function updateSale(data: SaleData & { id: string }) {
  await db
    .update(sales)
    .set({
      clientName: data.clientName,
      deliveryDatetime: new Date(data.deliveryDatetime),
      deliveryAddress: data.deliveryAddress ?? null,
      description: data.description ?? null,
      amount: data.amount,
      deposit: data.deposit,
      depositPaymentMethod: data.depositPaymentMethod,
      remaining: data.remaining,
      remainingPaymentMethod: data.remainingPaymentMethod,
    })
    .where(eq(sales.id, data.id));
}
