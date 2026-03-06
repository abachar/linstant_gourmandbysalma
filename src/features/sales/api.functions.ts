import { createServerFn } from "@tanstack/solid-start";
import { startOfMonth, endOfMonth, addDays, subDays, startOfDay, endOfDay, addYears } from 'date-fns';
import { getSales } from "./api.server";

function validFilter(filter: string) {
  return ['upcoming', 'month', 'past', 'all'].includes(filter) ? filter : 'upcoming';
}

// 'upcoming' | 'month' | 'past' | 'all'
function getSaleInterval(filter: string): [Date, Date] {
  const now = new Date();
  const minDate = new Date('2020-01-01T00:00:00');
  const maxDate = endOfDay(addYears(now, 2));

  switch (filter) {
    case 'upcoming': return [startOfDay(addDays(now, 1)), maxDate];
    case 'month': return [startOfMonth(now), endOfMonth(now)];
    case 'past': return [minDate, endOfDay(subDays(now, 1))];
  }

  // all & default
  return [minDate, maxDate];
}

export const getSalesFn = createServerFn({ method: "GET" })
	.inputValidator((data: { filter: string }) => data)
  .handler(async ({ data }) => {
    const selectedFilter = validFilter(data.filter);
    const [from, to] = getSaleInterval(selectedFilter);
    return {
      selectedFilter,
      sales: await getSales(from, to)
    };
	});

export type GetSalesReturn = Awaited<ReturnType<typeof getSalesFn>>;
