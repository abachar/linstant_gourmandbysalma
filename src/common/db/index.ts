import { drizzle } from "drizzle-orm/node-postgres";
import { inventory, purchases, sales } from "./schema";

if (!process.env.DATABASE_URL) {
	console.error("DATABASE_URL environment variable not set");
	process.exit(1);
}

console.log("⏳ Tentative de connexion à la base de données...");
export const db = drizzle(process.env.DATABASE_URL, {
	schema: { sales, purchases, inventory },
	logger: process.env.NODE_ENV !== "production",
});

db.execute("SELECT 1")
	.then(() => console.log("✅ Drizzle : Connexion établie avec succès !"))
	.catch((err) => {
		console.error("❌ Drizzle : Échec de la connexion !", err.message);
		process.exit(1);
	});

export { sales, purchases, inventory };
