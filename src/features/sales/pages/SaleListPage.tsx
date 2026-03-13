import { PageLayout } from "@components/layouts";
import { CardList, EmptyState } from "@components/ui";
import { useNavigate } from "@tanstack/solid-router";
import { ShoppingBag } from "lucide-solid";
import type { Component } from "solid-js";
import type { FindSalesByRangeReturn } from "../api.functions";
import { SaleCardContent, SaleListFilter } from "./components";

export const SaleListPage: Component<FindSalesByRangeReturn> = ({ sales, selectedFilter }) => {
	const navigate = useNavigate();
	const onCardClick = (sale: FindSalesByRangeReturn["sales"][number]) =>
		navigate({ to: `/sales/$id`, params: { id: sale.id } });

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
				<CardList rows={sales} onCardClick={onCardClick}>
					{(sale) => <SaleCardContent sale={sale} />}
				</CardList>
			)}
		</PageLayout>
	);
};
