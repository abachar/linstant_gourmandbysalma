import { getPurchases } from "./api.server";
import { createServerFn } from "@tanstack/solid-start";

export const getPurchasesFn = createServerFn({ method: "GET" })
  .handler(getPurchases);

export type GetPurchasesReturn = Awaited<ReturnType<typeof getPurchases>>;
