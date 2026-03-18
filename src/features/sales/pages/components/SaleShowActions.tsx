import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "@tanstack/react-router";
import { Pencil, Trash2 } from "lucide-react";
import { deleteSaleByIdFn, type FindSaleByIdReturn } from "../../api.functions";

export const SaleShowActions = ({ sale }: { sale: FindSaleByIdReturn }) => {
	const navigate = useNavigate();

	const { mutate: deleteSale } = useMutation({
		mutationFn: deleteSaleByIdFn,
		onSuccess: () => navigate({ to: "/sales" }),
	});

	const onDeleteClick = () => {
		if (!confirm("Supprimer cette vente ?")) return;
		deleteSale({ data: { id: sale.id } });
	};

	return (
		<div className="flex gap-3 pt-4">
			<Link
				to="/sales/$id/edit"
				params={{ id: sale.id }}
				className="flex-1 h-12 rounded-xl bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-white font-bold text-sm flex items-center justify-center gap-2"
			>
				<Pencil size={18} /> Modifier
			</Link>
			<button
				type="button"
				onClick={onDeleteClick}
				className="flex-1 h-12 rounded-xl bg-primary/10 text-primary font-bold text-sm flex items-center justify-center gap-2"
			>
				<Trash2 size={18} /> Supprimer
			</button>
		</div>
	);
};
