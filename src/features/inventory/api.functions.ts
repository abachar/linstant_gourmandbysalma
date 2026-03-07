import { createServerFn } from "@tanstack/solid-start";
import { getInventory, getInventoryById, createInventoryItem, updateInventoryItem } from "./api.server";

export const getInventoryFn = createServerFn({ method: "GET" })
  .handler(getInventory);

export type GetInventoryReturn = Awaited<ReturnType<typeof getInventory>>;

export const getInventoryByIdFn = createServerFn({ method: "GET" })
  .inputValidator((data: { id: string }) => data)
  .handler(async ({ data }) => getInventoryById(data.id));

export type GetInventoryByIdReturn = Awaited<ReturnType<typeof getInventoryById>>;

export const createInventoryItemFn = createServerFn({ method: "POST" })
  .inputValidator((data: { productName: string; quantity: number }) => data)
  .handler(async ({ data }) => createInventoryItem(data));

export const updateInventoryItemFn = createServerFn({ method: "POST" })
  .inputValidator((data: { id: string; productName: string; quantity: number }) => data)
  .handler(async ({ data }) => updateInventoryItem(data));
