import { db, sales } from "@common/db";
import { getMonthName } from "@common/format";
import { sql } from "drizzle-orm";

const TAX_RATE = 0.123;

async function getAvailableYears() {
  const result = await db
    .select({
      year: sql<number>`EXTRACT(YEAR FROM ${sales.deliveryDatetime})::int`,
    })
    .from(sales)
    .groupBy(sql`EXTRACT(YEAR FROM ${sales.deliveryDatetime})`)
    .orderBy(sql`EXTRACT(YEAR FROM ${sales.deliveryDatetime}) DESC`);

  return result.map((r) => r.year);
}

async function getMonthlySummary(year: number) {
  const result = await db
    .select({
      month: sql<number>`EXTRACT(MONTH FROM ${sales.deliveryDatetime})::int`,
      totalDeposit: sql<number>`
        COALESCE(SUM(
          CASE WHEN ${sales.depositPaymentMethod} = 'Bancaire'
          THEN ${sales.deposit}::numeric
          ELSE 0 END
        ), 0)
      `,
      totalRemaining: sql<number>`
        COALESCE(SUM(
          CASE WHEN ${sales.remainingPaymentMethod} = 'Bancaire'
          THEN ${sales.remaining}::numeric
          ELSE 0 END
        ), 0)
      `,
    })
    .from(sales)
    .where(sql`EXTRACT(YEAR FROM ${sales.deliveryDatetime}) = ${year}`)
    .groupBy(sql`EXTRACT(MONTH FROM ${sales.deliveryDatetime})`)
    .orderBy(sql`EXTRACT(MONTH FROM ${sales.deliveryDatetime}) DESC`);

  return result.map((row) => {
      const totalToDeclare = Number(row.totalDeposit) + Number(row.totalRemaining);
      return {
        month: row.month,
        monthLabel: getMonthName(row.month),
        totalToDeclare: Math.round(totalToDeclare * 100) / 100,
        taxAmount: Math.round(totalToDeclare * TAX_RATE * 100) / 100,
      };
    });
}

export async function getTaxReporting(year: number) {
  return {
    selectedYear: year,
    availableYears: await getAvailableYears(),
    monthlyItems: await getMonthlySummary(year),
  };
}
