import { HeaderAddButton, PageLayout } from "@components";
import { getSales, SearchSaleFilter } from "@shared/db";
import { amount, dateShort } from "@shared/formatter";
import { createFileRoute, Link } from "@tanstack/solid-router";
import { z } from "zod";

export const Route = createFileRoute("/sales/")({
  validateSearch: z.object({
    filter: z.enum(SearchSaleFilter).default(SearchSaleFilter.FORTNIGHT),
  }),
  loaderDeps: ({ search: { filter } }) => ({ filter }),
  loader: async ({ deps: { filter } }) => await getSales(filter),
  component: RouteComponent,
});

export const SALES_FILTERS: { value: SearchSaleFilter; label: string }[] = [
  { value: SearchSaleFilter.FORTNIGHT, label: "15 jours" },
  { value: SearchSaleFilter.WEEK, label: "7 jours" },
  { value: SearchSaleFilter.MONTH, label: "Ce mois" },
  { value: SearchSaleFilter.UPCOMING, label: "À venir" },
  { value: SearchSaleFilter.PAST, label: "Passées" },
  { value: SearchSaleFilter.ALL, label: "Tout" },
];

const Filters = () => {
  const filter = Route.useSearch({
    select: (search) => search.filter,
  });

  return (
    <div class="flex gap-2 py-3 overflow-x-auto hide-scrollbar">
      {SALES_FILTERS.map(({ value, label }) => (
        <Link
          to="/sales"
          search={{ filter: value }}
          class={`flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-xl px-4 ${
            filter() === value
              ? "bg-primary shadow-lg shadow-primary/20"
              : "bg-slate-200 dark:bg-surface-dark"
          }`}
        >
          <p
            class={`${filter() === value ? "text-white" : "text-slate-700 dark:text-white"} text-sm font-medium whitespace-nowrap`}
          >
            {label}
          </p>
        </Link>
      ))}
    </div>
  );
};

function RouteComponent() {
  const sales = Route.useLoaderData();

  return (
    <PageLayout title="Ventes" action={<HeaderAddButton to="/sales/new" />}>
      <Filters />

      {sales().length === 0 ? (
        <div class="flex flex-col items-center justify-center py-16 text-center">
          <div class="size-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
            <span class="material-symbols-outlined text-3xl">shopping_bag</span>
          </div>
          <p class="text-slate-500 dark:text-[#c9929b] text-sm mb-4">
            Aucune vente trouvée.
          </p>
          <Link
            to="/sales/new"
            class="h-12 px-6 rounded-xl bg-primary text-white font-bold text-sm flex items-center justify-center shadow-lg shadow-primary/20"
          >
            Créer une vente
          </Link>
        </div>
      ) : (
        <div class="space-y-5">
          {sales().map((sale) => (
            <Link
              to="/sales/$id"
              params={{ id: sale.id }}
              class="block p-4 rounded-xl bg-white dark:bg-surface-dark shadow-sm border border-slate-100 dark:border-white/5"
            >
              <div class="flex flex-col gap-3">
                <div class="flex justify-between items-start">
                  <div>
                    <div class="flex items-center gap-2 mb-1">
                      <p class="text-slate-500 dark:text-[#c9929b] text-xs font-medium flex items-center gap-1">
                        <span class="material-symbols-outlined text-sm">
                          schedule
                        </span>
                        {dateShort(sale.deliveryDatetime)}
                      </p>
                    </div>
                    <h3 class="text-lg font-bold text-slate-900 dark:text-white">
                      {sale.clientName}
                    </h3>
                  </div>
                  <p class="text-xl font-black text-slate-900 dark:text-white">
                    {amount(sale.amount)}
                  </p>
                </div>

                {sale.deliveryAddress && (
                  <div class="flex items-start gap-2 py-2 border-y border-slate-50 dark:border-white/5">
                    <span class="material-symbols-outlined text-slate-400 text-lg">
                      location_on
                    </span>
                    <p class="text-sm text-slate-600 dark:text-[#c9929b]">
                      {sale.deliveryAddress}
                    </p>
                  </div>
                )}

                {sale.description && (
                  <p class="text-sm font-medium text-slate-800 dark:text-slate-200">
                    {sale.description}
                  </p>
                )}

                <div class="grid grid-cols-3 gap-2 mt-1">
                  <div class="bg-slate-50 dark:bg-black/20 p-2 rounded-lg text-center">
                    <p class="text-[10px] text-slate-400 uppercase font-bold">
                      Acompte
                    </p>
                    <p class="text-sm font-bold text-slate-700 dark:text-white">
                      {amount(sale.deposit)}
                    </p>
                    <p class="text-[9px] text-slate-400">
                      {sale.depositPaymentMethod}
                    </p>
                  </div>
                  <div class="bg-primary/10 dark:bg-primary/20 p-2 rounded-lg text-center">
                    <p class="text-[10px] text-primary uppercase font-bold">
                      Reste
                    </p>
                    <p class="text-sm font-bold text-primary">
                      {amount(sale.remaining)}
                    </p>
                    <p class="text-[9px] text-primary/70">
                      {sale.remainingPaymentMethod}
                    </p>
                  </div>
                  <div class="bg-slate-50 dark:bg-black/20 p-2 rounded-lg text-center border border-primary/20">
                    <p class="text-[10px] text-slate-400 uppercase font-bold">
                      Total
                    </p>
                    <p class="text-sm font-bold text-slate-700 dark:text-white">
                      {amount(sale.amount)}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </PageLayout>
  );
}
