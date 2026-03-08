import { HeaderAddButton } from "@components/buttons";
import { PageLayout } from "@components/layouts";
import type { Component } from "solid-js";
import type { FindAllProductsReturn } from "../api.functions";
import { ProductTable } from "./components";

export const ProductListPage: Component<{ products: FindAllProductsReturn }> = ({ products }) => {
	return (
		<PageLayout title="Stock" action={<HeaderAddButton to="/products/new" />}>
			<div class="flex items-center justify-between mb-3 px-1">
				<h2 class="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Stock Actuel</h2>
				<span class="text-xs font-medium text-slate-400">{products.length} Produits</span>
			</div>
			<ProductTable products={products} />
		</PageLayout>
	);
};
