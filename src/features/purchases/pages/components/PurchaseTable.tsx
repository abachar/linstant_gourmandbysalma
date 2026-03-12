import { EmptyState } from "@components/ui";
import type { Component } from "solid-js";
import type { FindAllPurchasesReturn } from "../../api.functions";
import { PurchaseTableRow } from "./PurchaseTableRow";

export const PurchaseTable: Component<{ purchases: FindAllPurchasesReturn }> = ({ purchases }) => {
	return purchases.length === 0 ? (
		<EmptyState
			emptyIcon="shopping_bag"
			emptyLabel="Aucun achat trouvé."
			actionUrl="/purchases/new"
			actionLabel="Créer un achat"
		/>
	) : (
		<div class="space-y-5">
			{purchases.map((purchase) => (
				<PurchaseTableRow purchase={purchase} />
			))}
		</div>
	);
};
