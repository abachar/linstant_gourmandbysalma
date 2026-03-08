import { drizzle } from "drizzle-orm/node-postgres";
import { products, purchases, sales } from "./schema";

if (!process.env.DATABASE_URL) {
	throw new Error("DATABASE_URL environment variable not set");
}

export const db = drizzle(process.env.DATABASE_URL, {
	schema: { sales, purchases, products },
	logger: process.env.NODE_ENV !== "production",
});

export { sales, purchases, products };
