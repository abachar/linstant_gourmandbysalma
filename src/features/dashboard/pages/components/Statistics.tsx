import { amount } from "@common/format";
import type { Component } from "solid-js";
import type { FindDashboardReturn } from "../../api.functions";

const StatisticCard: Component<{ title: string; monthValue: number; yearValue: number }> = ({
	title,
	monthValue,
	yearValue,
}) => {
	return (
		<div class="bg-white dark:bg-white/5 rounded-xl p-5 border border-slate-200 dark:border-white/10">
			<p class="text-slate-500 dark:text-white/60 text-xs font-medium mb-1 uppercase tracking-wider">{title}</p>
			<p class="text-slate-900 dark:text-white text-2xl font-bold">{amount(monthValue)}</p>
			<p class="text-slate-400 dark:text-white/40 text-[10px] mt-1 italic">Année: {amount(yearValue)}</p>
		</div>
	);
};

export const Statistics: Component<FindDashboardReturn> = ({
	currentMonthSales,
	currentMonthExpenses,
	currentYearSales,
	currentYearExpenses,
	currentMonthTax,
	currentYearTax,
}) => {
	const monthProfit = currentMonthSales - currentMonthExpenses;
	const yearProfit = currentYearSales - currentYearExpenses;

	return (
		<div>
			<div class="flex items-center justify-between mb-4 px-1">
				<h3 class="text-slate-900 dark:text-white font-bold text-lg">Finances</h3>
				<span class="text-primary text-xs font-medium bg-primary/10 px-2 py-1 rounded-full">Ce mois</span>
			</div>
			<div class="grid grid-cols-2 gap-4">
				<StatisticCard title="Chiffre d'affaires" monthValue={currentMonthSales} yearValue={currentYearSales} />
				<StatisticCard title="Dépenses" monthValue={currentMonthExpenses} yearValue={currentYearExpenses} />
				<StatisticCard title="Bénéfice Net" monthValue={monthProfit} yearValue={yearProfit} />
				<StatisticCard title="Taxe" monthValue={currentMonthTax} yearValue={currentYearTax} />
			</div>
		</div>
	);
};
