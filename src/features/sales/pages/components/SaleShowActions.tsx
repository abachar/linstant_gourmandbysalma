import { Link } from "@tanstack/solid-router";
import type { Component } from "solid-js";
import type { FindSaleByIdReturn } from "../../api.functions";

export const SaleShowActions: Component<{ sale: FindSaleByIdReturn }> = ({ sale }) => (
	<div class="flex gap-3 pt-4">
		<Link
			to="/sales/$id/edit"
			params={{ id: sale.id }}
			class="flex-1 h-12 rounded-xl bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-white font-bold text-sm flex items-center justify-center gap-2"
		>
			<span class="material-symbols-outlined">edit</span>
			Modifier
		</Link>
		<button
			type="button"
			class="flex-1 h-12 rounded-xl bg-primary/10 text-primary font-bold text-sm flex items-center justify-center gap-2"
		>
			<span class="material-symbols-outlined">delete</span>
			Supprimer
		</button>
	</div>
);
