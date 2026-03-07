import { amount, dateShort } from "@common/format";
import { Link } from "@tanstack/solid-router";
import type { Component } from "solid-js";
import type { GetPurchasesReturn } from "../../api.functions";

export const PurchaseTableRow: Component<{ purchase: GetPurchasesReturn[number] }> = ({ purchase }) => {
	return (
		<Link
			to="/purchases/$id"
			params={{ id: purchase.id }}
			class="flex items-center gap-4 bg-white dark:bg-surface-dark rounded-xl p-3 border border-slate-200 dark:border-white/5 transition-colors"
		>
			<div class="flex flex-col justify-center flex-1">
				<div class="flex justify-between">
					<p class="text-slate-900 dark:text-white text-base font-semibold leading-normal line-clamp-1">
						{dateShort(purchase.date)}
					</p>
					<p class="text-slate-900 dark:text-white text-base font-bold">{amount(purchase.amount)}</p>
				</div>
				<p class="text-slate-500 dark:text-white/50 text-xs font-medium leading-normal">
					{purchase.description ?? "Achat"}
				</p>
			</div>
		</Link>
	);
};
