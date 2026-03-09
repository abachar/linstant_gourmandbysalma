import { amount } from "@common/format";
import type { Component } from "solid-js";
import type { FindTaxReportingReturn } from "../../api.functions";

type MonthlyItem = FindTaxReportingReturn["monthlyItems"][0];

export const TaxReportingTableRow: Component<{ monthlyItem: MonthlyItem }> = ({ monthlyItem }) => {
	return (
		<div class="p-4 rounded-xl bg-white dark:bg-surface-dark shadow-sm border border-slate-100 dark:border-white/5">
			<div class="flex justify-between items-center mb-3">
				<p class="text-slate-900 dark:text-white text-base font-bold">{monthlyItem.monthLabel}</p>
				<p class="text-xl font-black text-slate-900 dark:text-white tabular-nums">{amount(monthlyItem.totalAmount)}</p>
			</div>
			<div class="grid grid-cols-3 gap-2">
				<div class="bg-blue-50 dark:bg-blue-500/10 p-2 rounded-lg text-center">
					<p class="text-[10px] text-blue-400 uppercase font-bold mb-0.5">Bancaire</p>
					<p class="text-sm font-bold text-blue-600 dark:text-blue-400 tabular-nums">
						{amount(monthlyItem.bankTotalAmount)}
					</p>
				</div>
				<div class="bg-emerald-50 dark:bg-emerald-500/10 p-2 rounded-lg text-center">
					<p class="text-[10px] text-emerald-500 uppercase font-bold mb-0.5">Espèces</p>
					<p class="text-sm font-bold text-emerald-600 dark:text-emerald-400 tabular-nums">
						{amount(monthlyItem.cashTotalAmount)}
					</p>
				</div>
				<div class="bg-primary/10 dark:bg-primary/20 p-2 rounded-lg text-center">
					<p class="text-[10px] text-primary uppercase font-bold mb-0.5">TVA 12.3%</p>
					<p class="text-sm font-bold text-primary tabular-nums">{amount(monthlyItem.taxAmount)}</p>
				</div>
			</div>
		</div>
	);
};
