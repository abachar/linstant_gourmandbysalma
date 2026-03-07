import { createServerFn } from "@tanstack/solid-start";
import { getPurchases, getPurchaseById, createPurchase, updatePurchase, deletePurchase } from "./api.server";

export const getPurchasesFn = createServerFn({ method: "GET" })
  .handler(getPurchases);

export type GetPurchasesReturn = Awaited<ReturnType<typeof getPurchases>>;

export const getPurchaseByIdFn = createServerFn({ method: "GET" })
  .inputValidator((data: { id: string }) => data)
  .handler(async ({ data }) => getPurchaseById(data.id));

export type GetPurchaseByIdReturn = Awaited<ReturnType<typeof getPurchaseById>>;

export const createPurchaseFn = createServerFn({ method: "POST" })
  .inputValidator((data: { date: string; amount: string; description?: string }) => data)
  .handler(async ({ data }) => createPurchase(data));

export const updatePurchaseFn = createServerFn({ method: "POST" })
  .inputValidator((data: { id: string; date: string; amount: string; description?: string }) => data)
  .handler(async ({ data }) => updatePurchase(data));

export const deletePurchaseFn = createServerFn({ method: "POST" })
  .inputValidator((data: { id: string }) => data)
  .handler(async ({ data }) => deletePurchase(data.id));
