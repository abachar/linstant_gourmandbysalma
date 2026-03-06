import { getInventory } from "./api.server";
import { createServerFn } from "@tanstack/solid-start";

export const getInventoryFn = createServerFn({ method: "GET" })
  .handler(getInventory);

export type GetInventoryReturn = Awaited<ReturnType<typeof getInventory>>;
