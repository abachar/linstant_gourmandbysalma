import { useMutation } from "@common/hooks";
import { PageLayout } from "@components/layouts";
import { CardList, EmptyState } from "@components/ui";
import { useNavigate } from "@tanstack/solid-router";
import { ShoppingBag } from "lucide-solid";
import type { Component } from "solid-js";
import { deleteSaleByIdFn, type FindSalesByRangeReturn } from "../api.functions";
import { SaleCardContent, SaleListFilter } from "./components";

type Sale = FindSalesByRangeReturn["sales"][number];

export const SaleListPage: Component<FindSalesByRangeReturn> = ({ sales, selectedFilter }) => {
	const navigate = useNavigate();
	const { mutate: deleteSale } = useMutation({
		fn: deleteSaleByIdFn,
		onSuccess: () => window.location.reload(),
	});

	const onCardClick = (sale: Sale) => navigate({ to: `/sales/$id`, params: { id: sale.id } });

	const onDeleteClick = (sale: Sale) => {
		if (!confirm("Supprimer cette vente ?")) return;
		deleteSale({ data: { id: sale.id } });
	};

	return (
		<PageLayout title="Ventes" addUrl="/sales/new">
			<SaleListFilter selectedFilter={selectedFilter} />

			{sales.length === 0 ? (
				<EmptyState
					emptyIcon={<ShoppingBag />}
					emptyLabel="Aucune vente trouvée."
					actionUrl="/sales/new"
					actionLabel="Créer une vente"
				/>
			) : (
				<CardList rows={sales} onCardClick={onCardClick} onDeleteClick={onDeleteClick}>
					{(sale) => <SaleCardContent sale={sale} />}
				</CardList>
			)}
		</PageLayout>
	);
};
