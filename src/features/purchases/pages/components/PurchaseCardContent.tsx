import { amount, dateShort } from "@common/format";
import { CloudSync } from "lucide-solid";
import { type Component, Show } from "solid-js";
import type { FindAllPurchasesReturn } from "../../api.functions";

export const PurchaseCardContent: Component<{ purchase: FindAllPurchasesReturn[number] }> = ({ purchase }) => (
	<div class="flex flex-col flex-1 min-w-0">
		<div class="flex justify-between items-center">
			<p class="text-slate-900 dark:text-white text-base font-semibold leading-normal">{dateShort(purchase.date)}</p>
			<p class="text-slate-900 dark:text-white text-base font-bold">{amount(purchase.amount)}</p>
		</div>
		<div class="mt-2 flex items-center gap-2">
			<Show when={purchase.isImported}>
				<CloudSync class="text-slate-400 dark:text-white/30" />
			</Show>
			<p class="text-slate-500 dark:text-white/50 text-xs truncate">{purchase.description ?? "Achat"}</p>
		</div>
	</div>
);
