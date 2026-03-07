import { EmptyState } from "@components/ui";
import type { Component } from "solid-js";
import type { GetPurchasesReturn } from "../../api.functions";
import { PurchaseTableRow } from "./PurchaseTableRow";

export const PurchaseTable: Component<{ purchases: GetPurchasesReturn }> = ({ purchases }) => {
	return purchases.length === 0 ? (
		<EmptyState
			emptyIcon="shopping_bag"
			emptyLabel="Aucune vente trouvée."
			actionUrl="/sales/new"
			actionLabel="Créer une vente"
		/>
	) : (
		<div class="space-y-5">
			{purchases.map((purchase) => (
				<PurchaseTableRow purchase={purchase} />
			))}
		</div>
	);
};
