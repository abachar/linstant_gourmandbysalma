import type { FindAllProductsReturn } from "../../api.functions";

export const ProductCardContent = ({ product }: { product: FindAllProductsReturn[number] }) => (
	<div className="flex flex-col flex-1 min-w-0">
		<div className="flex justify-between items-start">
			<p className="text-slate-900 dark:text-white text-base font-bold leading-tight line-clamp-1">
				{product.productName}
			</p>
			{product.quantity === 0 ? (
				<span className="text-primary font-bold text-sm">0 unité</span>
			) : product.quantity < 10 ? (
				<span className="text-warning font-bold text-sm">{product.quantity} unités</span>
			) : (
				<span className="text-success font-bold text-sm">{product.quantity} unités</span>
			)}
		</div>
		<div className="mt-2 flex items-center gap-1.5">
			{product.quantity === 0 ? (
				<>
					<div className="size-2 rounded-full bg-primary" />
					<span className="text-[10px] font-bold uppercase tracking-wide text-primary">Rupture</span>
				</>
			) : product.quantity < 10 ? (
				<>
					<div className="size-2 rounded-full bg-warning" />
					<span className="text-[10px] font-bold uppercase tracking-wide text-warning">Stock faible</span>
				</>
			) : (
				<>
					<div className="size-2 rounded-full bg-success" />
					<span className="text-[10px] font-bold uppercase tracking-wide text-success">En stock</span>
				</>
			)}
		</div>
	</div>
);
