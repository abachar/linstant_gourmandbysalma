import { createServerFn } from "@tanstack/solid-start";
import { isValid, parse } from "date-fns";
import { findDaySales, getDashboard } from "./api.server";

export const findDashboardFn = createServerFn({ method: "GET" })
	.inputValidator((data: { month: string | undefined }) => data)
	.handler(async ({ data }) => {
		const d = data.month ? parse(data.month, "yyyy-MM-dd", new Date()) : new Date();
		return getDashboard(d);
	});

export type FindDashboardReturn = Awaited<ReturnType<typeof findDashboardFn>>;

export const findDaySalesFn = createServerFn({ method: "GET" })
	.inputValidator((data: { date: string }) => data)
	.handler(async ({ data }) => {
		const date = parse(data.date, "yyyy-MM-dd", new Date());
		return isValid(date) ? findDaySales(date) : [];
	});
