import { useMutation } from "@common/hooks";
import { PageLayout } from "@components/layouts";
import { CardList, EmptyState } from "@components/ui";
import { useNavigate } from "@tanstack/solid-router";
import { Refrigerator } from "lucide-solid";
import type { Component } from "solid-js";
import { deleteProductByIdFn, type FindAllProductsReturn } from "../api.functions";
import { ProductCardContent } from "./components";

type Product = FindAllProductsReturn[number];

export const ProductListPage: Component<{ products: FindAllProductsReturn }> = ({ products }) => {
	const navigate = useNavigate();
	const { mutate: deleteProduct } = useMutation({
		fn: deleteProductByIdFn,
		onSuccess: () => window.location.reload(),
	});

	const onEditClick = (product: Product) => navigate({ to: `/products/$id/edit`, params: { id: product.id } });

	const onDeleteClick = (product: Product) => {
		if (!confirm("Supprimer ce produit ?")) return;
		deleteProduct({ data: { id: product.id } });
	};

	return (
		<PageLayout title="Stock" addUrl="/products/new">
			<div class="flex items-center justify-between mb-3 px-1">
				<h2 class="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Stock Actuel</h2>
				<span class="text-xs font-medium text-slate-400">{products.length} Produits</span>
			</div>

			{products.length === 0 ? (
				<EmptyState
					emptyIcon={<Refrigerator />}
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
