import { drizzle } from "drizzle-orm/node-postgres";
import { sales, purchases, inventory } from "./schema";
import { desc } from "drizzle-orm";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable not set");
}

const db = drizzle(process.env.DATABASE_URL, {
  schema: { sales, purchases, inventory },
});

export enum SearchSaleFilter {
  ALL = "all",
  WEEK = "week",
  FORTNIGHT = "fortnight",
  MONTH = "month",
  UPCOMING = "upcoming",
  PAST = "past",
}

export function getSales(filter: SearchSaleFilter) {
  return db.query.sales.findMany({
    orderBy: [desc(sales.deliveryDatetime)],
  });
}
