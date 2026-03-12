import { amount, dateShort } from "@common/format";
import { Link } from "@tanstack/solid-router";
import { Show, type Component } from "solid-js";
import type { FindAllPurchasesReturn } from "../../api.functions";

export const PurchaseTableRow: Component<{ purchase: FindAllPurchasesReturn[number] }> = ({ purchase }) => {
	return (
		<div class="bg-white dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-border-dark shadow-sm overflow-hidden">
			<div class="flex items-center gap-4 p-3">
				<div class="flex flex-col flex-1 min-w-0">
					<div class="flex justify-between items-center">
						<p class="text-slate-900 dark:text-white text-base font-semibold leading-normal">
							{dateShort(purchase.date)}
						</p>
						<p class="text-slate-900 dark:text-white text-base font-bold">{amount(purchase.amount)}</p>
					</div>
					<div class="flex items-center gap-1.5 mt-0.5">
						<Show when={purchase.isImported}>
							<span class="material-symbols-outlined text-[12px] text-slate-400 dark:text-white/30">
								cloud_download
							</span>
							<span class="text-[10px] font-bold uppercase tracking-wide text-slate-400 dark:text-white/30 mr-1">
								Import
							</span>
						</Show>
						<p class="text-slate-500 dark:text-white/50 text-xs truncate">{purchase.description ?? "Achat"}</p>
					</div>
				</div>
			</div>
			<div class="flex border-t border-slate-100 dark:border-white/5">
				<Link
					to="/purchases/$id/edit"
					params={{ id: purchase.id }}
					class="flex-1 h-10 flex items-center justify-center gap-2 text-slate-600 dark:text-slate-300 text-sm font-medium hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
				>
					<span class="material-symbols-outlined text-lg">edit</span>
					Modifier
				</Link>
				<button
					type="button"
					class="flex-1 border-l border-slate-100 dark:border-white/5 h-10 flex items-center justify-center gap-2 text-primary text-sm font-medium hover:bg-primary/5 transition-colors"
				>
					<span class="material-symbols-outlined text-lg">delete</span>
					Supprimer
				</button>
			</div>
		</div>
	);
};
