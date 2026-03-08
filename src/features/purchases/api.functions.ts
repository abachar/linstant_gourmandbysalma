import { createServerFn } from "@tanstack/solid-start";
import { createPurchase, deletePurchaseById, findAllPurchases, findPurchaseById, updatePurchase } from "./api.server";

export const findAllPurchasesFn = createServerFn({ method: "GET" }).handler(findAllPurchases);

export type FindAllPurchasesReturn = Awaited<ReturnType<typeof findAllPurchasesFn>>;

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
