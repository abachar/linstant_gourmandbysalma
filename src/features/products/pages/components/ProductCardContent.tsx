import type { Component } from "solid-js";
import type { FindAllProductsReturn } from "../../api.functions";

export const ProductCardContent: Component<{ product: FindAllProductsReturn[number] }> = ({ product }) => (
	<div class="flex flex-col flex-1 min-w-0">
		<div class="flex justify-between items-start">
			<p class="text-slate-900 dark:text-white text-base font-bold leading-tight line-clamp-1">{product.productName}</p>
			{product.quantity === 0 ? (
				<span class="text-primary font-bold text-sm">0 unité</span>
			) : product.quantity < 10 ? (
				<span class="text-warning font-bold text-sm">{product.quantity} unités</span>
			) : (
				<span class="text-success font-bold text-sm">{product.quantity} unités</span>
			)}
		</div>
		<div class="mt-2 flex items-center gap-1.5">
			{product.quantity === 0 ? (
				<>
					<div class="size-2 rounded-full bg-primary" />
					<span class="text-[10px] font-bold uppercase tracking-wide text-primary">Rupture</span>
				</>
			) : product.quantity < 10 ? (
				<>
					<div class="size-2 rounded-full bg-warning" />
					<span class="text-[10px] font-bold uppercase tracking-wide text-warning">Stock faible</span>
				</>
			) : (
				<>
					<div class="size-2 rounded-full bg-success" />
					<span class="text-[10px] font-bold uppercase tracking-wide text-success">En stock</span>
				</>
			)}
		</div>
	</div>
);
