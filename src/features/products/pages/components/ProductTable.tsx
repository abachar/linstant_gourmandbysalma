import { EmptyState } from "@components/ui";
import type { Component } from "solid-js";
import type { FindAllProductsReturn } from "../../api.functions";
import { ProductTableRow } from "./ProductTableRow";

export const ProductTable: Component<{ products: FindAllProductsReturn }> = ({ products }) => {
	return products.length === 0 ? (
		<EmptyState
			emptyIcon="inventory_2"
			emptyLabel="Aucun produit en stock."
			actionUrl="/products/new"
			actionLabel="Ajouter le premier produit"
		/>
	) : (
		<div class="space-y-5">
			{products.map((product) => (
				<ProductTableRow product={product} />
			))}
		</div>
	);
};
