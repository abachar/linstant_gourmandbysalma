import { createServerFn } from "@tanstack/solid-start";
import { addDays, addYears, endOfDay, endOfMonth, startOfDay, startOfMonth, subDays } from "date-fns";
import { createSale, deleteSaleById, findSaleById, findSalesByRange, updateSale } from "./api.server";

function validFilter(filter: string) {
	return ["upcoming", "month", "past", "all"].includes(filter) ? filter : "upcoming";
}

function getSaleInterval(filter: string): [Date, Date] {
	const now = new Date();
	const minDate = new Date("2020-01-01T00:00:00");
	const maxDate = endOfDay(addYears(now, 2));

	switch (filter) {
		case "upcoming":
			return [startOfDay(addDays(now, 1)), maxDate];
		case "month":
			return [startOfMonth(now), endOfMonth(now)];
		case "past":
			return [minDate, endOfDay(subDays(now, 1))];
	}

	// all
	return [minDate, maxDate];
}

export const findSalesByRangeFn = createServerFn({ method: "GET" })
	.inputValidator((data: { filter: string }) => data)
	.handler(async ({ data }) => {
		const selectedFilter = validFilter(data.filter);
		const [from, to] = getSaleInterval(selectedFilter);
		return {
			selectedFilter,
			sales: await findSalesByRange(from, to),
		};
	});

export type FindSalesByRangeReturn = Awaited<ReturnType<typeof findSalesByRangeFn>>;

export const findSaleByIdFn = createServerFn({ method: "GET" })
	.inputValidator((data: { id: string }) => data)
	.handler(async ({ data }) => findSaleById(data.id));

export type FindSaleByIdReturn = Awaited<ReturnType<typeof findSaleByIdFn>>;

export const createSaleFn = createServerFn({ method: "POST" })
	.inputValidator(
		(data: {
			clientName: string;
			deliveryDatetime: string;
			deliveryAddress?: string;
			description?: string;
			amount: string;
			deposit: string;
			depositPaymentMethod: string;
			remaining: string;
			remainingPaymentMethod: string;
		}) => data,
	)
	.handler(async ({ data }) => createSale(data));

export const deleteSaleByIdFn = createServerFn({ method: "POST" })
	.inputValidator((data: { id: string }) => data)
	.handler(async ({ data }) => deleteSaleById(data.id));

export const updateSaleFn = createServerFn({ method: "POST" })
	.inputValidator(
		(data: {
			id: string;
			clientName: string;
			deliveryDatetime: string;
			deliveryAddress?: string;
			description?: string;
			amount: string;
			deposit: string;
			depositPaymentMethod: string;
			remaining: string;
			remainingPaymentMethod: string;
		}) => data,
	)
	.handler(async ({ data }) => updateSale(data));
