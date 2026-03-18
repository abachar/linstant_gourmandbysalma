import { PageLayout } from "@components/layouts";
import { CardList, EmptyState } from "@components/ui";
import { useNavigate } from "@tanstack/react-router";
import { ShoppingBag } from "lucide-react";
import type { FindSalesByRangeReturn } from "../api.functions";
import { SaleCardContent, SaleListFilter } from "./components";

type Sale = FindSalesByRangeReturn["sales"][number];

export const SaleListPage = ({ sales, selectedFilter }: FindSalesByRangeReturn) => {
	const navigate = useNavigate();

	const onCardClick = (sale: Sale) => navigate({ to: "/sales/$id", params: { id: sale.id } });

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
