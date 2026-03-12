import { HeaderAddButton } from "@components/buttons";
import { PageLayout } from "@components/layouts";
import { CardList, EmptyState } from "@components/ui";
import { useNavigate } from "@tanstack/solid-router";
import type { Component } from "solid-js";
import type { FindAllPurchasesReturn } from "../api.functions";
import { PurchaseCardContent } from "./components";

export const PurchaseListPage: Component<{ purchases: FindAllPurchasesReturn }> = ({ purchases }) => {
	const navigate = useNavigate();
	const onEditClick = (purchase: FindAllPurchasesReturn[number]) =>
		navigate({ to: `/purchases/$id/edit`, params: { id: purchase.id } });
	const onDeleteClick = () => {};

	return (
		<PageLayout title="Achats" action={<HeaderAddButton to="/purchases/new" />}>
			<div class="flex items-center justify-between mb-3 px-1">
				<h2 class="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Liste des achats</h2>
			</div>

			{purchases.length === 0 ? (
				<EmptyState
					emptyIcon="shopping_bag"
					emptyLabel="Aucun achat trouvé."
					actionUrl="/purchases/new"
					actionLabel="Créer un achat"
				/>
			) : (
				<CardList rows={purchases} onEditClick={onEditClick} onDeleteClick={onDeleteClick}>
					{(purchase) => <PurchaseCardContent purchase={purchase} />}
				</CardList>
			)}
		</PageLayout>
	);
};
