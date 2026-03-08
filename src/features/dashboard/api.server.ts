import { db, purchases, sales } from "@common/db";
import {
	addMonths,
	eachDayOfInterval,
	endOfDay,
	endOfMonth,
	endOfWeek,
	endOfYear,
	format,
	startOfDay,
	startOfMonth,
	startOfWeek,
	startOfYear,
	subMonths,
} from "date-fns";
import { between, sql } from "drizzle-orm";

async function sumSales(from: Date, to: Date) {
	const result = await db
		.select({ total: sql<string>`coalesce(sum(${sales.amount}), 0)` })
		.from(sales)
		.where(between(sales.deliveryDatetime, from, to));

	return Number(result[0].total);
}

async function sumPurchases(from: Date, to: Date) {
	const result = await db
		.select({ total: sql<string>`coalesce(sum(${purchases.amount}), 0)` })
		.from(purchases)
		.where(between(purchases.date, from, to));

	return Number(result[0].total);
}

async function getMonthSales(d: Date) {
	const start = startOfWeek(startOfMonth(d), { weekStartsOn: 1 });
	const end = endOfWeek(endOfMonth(d), { weekStartsOn: 1 });

	const result = await db
		.select({
			date: sql<string>`to_char(${sales.deliveryDatetime}, 'YYYY-MM-DD')`,
			count: sql<number>`count(*)`,
		})
		.from(sales)
		.where(between(sales.deliveryDatetime, start, end))
		.groupBy(sql`to_char(${sales.deliveryDatetime}, 'YYYY-MM-DD')`)
		.orderBy(sql`to_char(${sales.deliveryDatetime}, 'YYYY-MM-DD')`);

	return eachDayOfInterval({ start, end }).map((date) => {
		const dateStr = format(date, "yyyy-MM-dd");
		const sale = result.find((r) => r.date === dateStr);
		return {
			date: dateStr,
			day: format(date, "dd"),
			count: sale?.count ?? 0,
			inCurrentMonth: format(date, "MM") === format(d, "MM"),
		};
	});
}

export async function getDashboard(d: Date) {
	const startOfMonthDate = startOfMonth(d);
	const endOfMonthDate = endOfMonth(d);
	const startOfYearDate = startOfYear(d);
	const endOfYearDate = endOfYear(d);

	return {
		calendarTitle: format(d, "MMMM yyyy"),
		prevMonth: format(startOfMonth(subMonths(d, 1)), "yyyy-MM-dd"),
		nextMonth: format(startOfMonth(addMonths(d, 1)), "yyyy-MM-dd"),
		currentMonthSales: await sumSales(startOfMonthDate, endOfMonthDate),
		currentMonthExpenses: await sumPurchases(startOfMonthDate, endOfMonthDate),
		currentYearSales: await sumSales(startOfYearDate, endOfYearDate),
		currentYearExpenses: await sumPurchases(startOfYearDate, endOfYearDate),
		monthSales: await getMonthSales(d),
	};
}

export async function getDaySales(d: Date) {
	const start = startOfDay(d);
	const end = endOfDay(d);

	const result = await db
		.select()
		.from(sales)
		.where(between(sales.deliveryDatetime, start, end));

	return result.map((s) => ({
		id: s.id,
		clientName: s.clientName,
		deliveryDatetime: s.deliveryDatetime,
		amount: s.amount,
	}));
}
