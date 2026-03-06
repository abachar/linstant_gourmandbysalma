import { createServerFn } from "@tanstack/solid-start";
import { getTaxReporting } from "./api.server";

export const getTaxReportingFn = createServerFn({ method: "GET" })
  .inputValidator((data: { year: number }) => data)
  .handler(async ({ data }) => getTaxReporting(data.year));

export type GetTaxReportingReturn = Awaited<ReturnType<typeof getTaxReporting>>;
