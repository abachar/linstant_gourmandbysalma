import { createServerFn } from "@tanstack/solid-start";
import {
	createPurchase,
	deletePurchaseById,
	findAllPurchases,
	findPurchaseById,
	importPurchasesFromCsv,
	updatePurchase,
} from "./api.server";

export const findAllPurchasesFn = createServerFn({ method: "GET" })
	.inputValidator((data: { year: number }) => data)
	.handler(async ({ data }) => findAllPurchases(data.year));

export type FindAllPurchasesReturn = Awaited<ReturnType<typeof findAllPurchases>>;

export const findPurchaseByIdFn = createServerFn({ method: "GET" })
	.inputValidator((data: { id: string }) => data)
	.handler(async ({ data }) => findPurchaseById(data.id));

export type FindPurchaseByIdReturn = Awaited<ReturnType<typeof findPurchaseByIdFn>>;

export const createPurchaseFn = createServerFn({ method: "POST" })
	.inputValidator((data: { date: string; amount: string; description?: string }) => data)
	.handler(async ({ data }) => createPurchase(data));

export const updatePurchaseFn = createServerFn({ method: "POST" })
	.inputValidator((data: { id: string; date: string; amount: string; description?: string }) => data)
	.handler(async ({ data }) => updatePurchase(data));

export const deletePurchaseByIdFn = createServerFn({ method: "POST" })
	.inputValidator((data: { id: string }) => data)
	.handler(async ({ data }) => deletePurchaseById(data.id));

export const importPurchasesFromCsvFn = createServerFn({ method: "POST" })
	.inputValidator((data: { content: string }) => data)
	.handler(async ({ data }) => importPurchasesFromCsv(data.content));
