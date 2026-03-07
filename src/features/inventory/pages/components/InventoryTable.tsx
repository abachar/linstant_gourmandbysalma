import { EmptyState } from "@components/ui";
import type { Component } from "solid-js";
import type { GetInventoryReturn } from "../../api.functions";
import { InventoryTableRow } from "./InventoryTableRow";

export const InventoryTable: Component<{ inventoryItems: GetInventoryReturn }> = ({ inventoryItems }) => {
	return inventoryItems.length === 0 ? (
		<EmptyState
			emptyIcon="inventory_2"
			emptyLabel="Aucun produit en stock."
			actionUrl="/inventory/new"
			actionLabel="Ajouter le premier produit"
		/>
	) : (
		<div class="space-y-5">
			{inventoryItems.map((inventoryItem) => (
				<InventoryTableRow inventoryItem={inventoryItem} />
			))}
		</div>
	);
};
