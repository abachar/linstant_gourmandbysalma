import { drizzle } from "drizzle-orm/node-postgres";
import { sales, purchases, inventory } from "./schema";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable not set");
}

export const db = drizzle(process.env.DATABASE_URL, {
  schema: { sales, purchases, inventory },
  logger: true
});

export { sales, purchases, inventory };
