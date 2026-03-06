import { queryOptions, useQuery } from "@tanstack/solid-query";
import { useServerFn } from "@tanstack/solid-start";
import { Component, For } from "solid-js";
import { getDaySalesFn } from "../../api.functions";
import { amount } from "@common/format";
import { datetimeLong } from "_/with-react/src/lib/formatters";
import { Link } from "@tanstack/solid-router";

export const DaySalesDialog: Component<{ date: string; onClose: () => void }> = ({ date, onClose }) => {
  const getDaySales = useServerFn(getDaySalesFn);
  const res = useQuery(() => queryOptions({
    queryKey: ['dashboard', 'sales', date],
    queryFn: () => getDaySales({ data: { date } }),
  }));

  return (
    <div class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
		<dialog
			open
			class="m-auto bg-white dark:bg-surface-dark rounded-xl p-0 max-w-[90vw] w-100 border border-slate-200 dark:border-white/10 shadow-2xl"
		>
			<div class="flex justify-between items-center p-4 border-b border-slate-200 dark:border-white/10">
				<h3 class="text-slate-900 dark:text-white font-bold text-lg">
					Commandes du 12 Janvier 2025
				</h3>
				<button
					type="button"
					onClick={onClose}
					class="size-8 flex items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-white/10 text-slate-500 dark:text-white/60"
				>
					<span class="material-symbols-outlined">close</span>
				</button>
			</div>
        <div class="p-4 max-h-[60vh] overflow-y-auto">
          {res.isLoading && <p class="text-slate-400 text-sm text-center py-4">Chargement...</p>}
          <div class="space-y-3">
            <For each={res.data}>
              {(sale) => (
                <Link to="/sales/$id" params={{ id: sale.id }} class="block p-3 rounded-lg bg-slate-50 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors">
                  <div class="flex justify-between items-start">
  									<div>
  										<p class="font-bold text-slate-900 dark:text-white text-sm">
  											{sale.clientName}
  										</p>
  										<p class="text-xs text-slate-500 dark:text-[#c9929b] mt-0.5">
  											{datetimeLong(sale.deliveryDatetime)}
  										</p>
  									</div>
  									<p class="font-bold text-slate-900 dark:text-white text-sm">
  										{amount(sale.amount)}
  									</p>
								  </div>
                </Link>
              )}
            </For>
          </div>
			</div>
		</dialog>
	</div>
	);
};
