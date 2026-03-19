import { dateShort } from "@common/format";
import { addMonths, isBefore, isPast } from "date-fns";
import type { FindAllProductsReturn } from "../../api.functions";

export const ProductCardContent = ({ product }: { product: FindAllProductsReturn[number] }) => {
	const expirationStatus = product.expirationDate
		? isPast(product.expirationDate)
			? "expired"
			: isBefore(product.expirationDate, addMonths(new Date(), 1))
				? "soon"
				: "ok"
		: null;

	return (
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
			<div className="mt-1 flex items-center gap-3 text-[11px] text-slate-400 dark:text-slate-500">
				<span>Modifié le {dateShort(product.updatedAt)}</span>
				{product.expirationDate && (
					<>
						<span>·</span>
						<span
							className={
								expirationStatus === "expired"
									? "text-primary font-semibold"
									: expirationStatus === "soon"
										? "text-warning font-semibold"
										: ""
							}
						>
							DLC {dateShort(product.expirationDate)}
						</span>
					</>
				)}
			</div>
		</div>
	);
};
