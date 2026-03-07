import { amount, datetimeLong } from "@common/format";
import type { Component } from "solid-js";
import type { GetOneSaleByIdReturn } from "../../api.functions";

export const SaleDetails: Component<{ sale: GetOneSaleByIdReturn }> = ({ sale }) => {
	return (
		<>
			<div class="p-4 rounded-xl bg-white dark:bg-surface-dark shadow-sm border border-slate-100 dark:border-white/5">
				<div class="flex justify-between items-start mb-4">
					<div>
						<h3 class="text-xl font-bold text-slate-900 dark:text-white">{sale.clientName}</h3>
						<p class="text-slate-500 dark:text-[#c9929b] text-sm flex items-center gap-1 mt-1">
							<span class="material-symbols-outlined text-sm">schedule</span>
							{datetimeLong(sale.deliveryDatetime)}
						</p>
					</div>
					<p class="text-2xl font-black text-slate-900 dark:text-white text-right">{amount(sale.amount)}</p>
				</div>

				{sale.deliveryAddress && (
					<div class="flex items-center gap-2 py-3 border-t border-slate-100 dark:border-white/5">
						<span class="material-symbols-outlined text-slate-400 text-lg">location_on</span>
						<p class="text-sm text-slate-600 dark:text-[#c9929b]">{sale.deliveryAddress}</p>
					</div>
				)}

				{sale.description && (
					<div class="py-3 border-t border-slate-100 dark:border-white/5">
						<p class="text-sm font-medium text-slate-800 dark:text-slate-200">{sale.description}</p>
					</div>
				)}
			</div>

			{/* Payment Card */}
			<div class="p-4 rounded-xl bg-white dark:bg-surface-dark shadow-sm border border-slate-100 dark:border-white/5">
				<h4 class="text-slate-400 dark:text-white/40 text-[11px] font-bold uppercase tracking-widest mb-4">Paiement</h4>
				<div class="grid grid-cols-3 gap-2">
					<div class="bg-slate-50 dark:bg-black/20 p-3 rounded-lg text-center">
						<p class="text-[10px] text-slate-400 uppercase font-bold mb-1">Acompte</p>
						<p class="text-lg font-bold text-slate-700 dark:text-white">{amount(sale.deposit)}</p>
						<span class="text-[9px] px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400 font-bold">
							{sale.depositPaymentMethod}
						</span>
					</div>
					<div class="bg-primary/10 dark:bg-primary/20 p-3 rounded-lg text-center">
						<p class="text-[10px] text-primary uppercase font-bold mb-1">Reste</p>
						<p class="text-lg font-bold text-primary">{amount(sale.remaining)}</p>
						<span class="text-[9px] px-1.5 py-0.5 rounded bg-primary/10 text-primary font-bold">
							{sale.remainingPaymentMethod}
						</span>
					</div>
					<div class="bg-slate-50 dark:bg-black/20 p-3 rounded-lg text-center border border-primary/20">
						<p class="text-[10px] text-slate-400 uppercase font-bold mb-1">Total</p>
						<p class="text-lg font-bold text-slate-700 dark:text-white">{amount(sale.amount)}</p>
					</div>
				</div>
			</div>

			{/* Meta */}
			<p class="text-center text-slate-400 dark:text-white/40 text-xs italic">
				Créée le {datetimeLong(sale.createdAt)}
			</p>
		</>
	);
};
