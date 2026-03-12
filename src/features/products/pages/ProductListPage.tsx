import { HeaderAddButton } from "@components/buttons";
import { PageLayout } from "@components/layouts";
import { CardList, EmptyState } from "@components/ui";
import { useNavigate } from "@tanstack/solid-router";
import type { Component } from "solid-js";
import type { FindAllProductsReturn } from "../api.functions";
import { ProductCardContent } from "./components";

export const ProductListPage: Component<{ products: FindAllProductsReturn }> = ({ products }) => {
	const navigate = useNavigate();
	const onEditClick = (product: FindAllProductsReturn[number]) =>
		navigate({ to: `/products/$id/edit`, params: { id: product.id } });
	const onDeleteClick = () => {};

	return (
		<PageLayout title="Stock" action={<HeaderAddButton to="/products/new" />}>
			<div class="flex items-center justify-between mb-3 px-1">
				<h2 class="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Stock Actuel</h2>
				<span class="text-xs font-medium text-slate-400">{products.length} Produits</span>
			</div>

			{products.length === 0 ? (
				<EmptyState
					emptyIcon="inventory_2"
					emptyLabel="Aucun produit en stock."
					actionUrl="/products/new"
					actionLabel="Ajouter le premier produit"
				/>
			) : (
				<CardList rows={products} onEditClick={onEditClick} onDeleteClick={onDeleteClick}>
					{(product) => <ProductCardContent product={product} />}
				</CardList>
			)}
		</PageLayout>
	);
};
