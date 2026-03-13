import { useMutation } from "@common/hooks";
import { PageLayout } from "@components/layouts";
import { CardList, EmptyState } from "@components/ui";
import { useNavigate } from "@tanstack/solid-router";
import { ShoppingBasket } from "lucide-solid";
import type { Component } from "solid-js";
import type { FindAllPurchasesReturn } from "../api.functions";
import { deletePurchaseByIdFn } from "../api.functions";
import { HeaderUploadButton, PurchaseCardContent, PurchaseListFilter } from "./components";

export const PurchaseListPage: Component<FindAllPurchasesReturn> = (props) => {
	const navigate = useNavigate();
	const { mutate: deletePurchase } = useMutation({
		fn: deletePurchaseByIdFn,
		onSuccess: () => window.location.reload(),
	});

	const onEditClick = (purchase: FindAllPurchasesReturn["purchases"][number]) =>
		navigate({ to: `/purchases/$id/edit`, params: { id: purchase.id } });

	const onDeleteClick = (purchase: FindAllPurchasesReturn["purchases"][number]) =>
		deletePurchase({ data: { id: purchase.id } });

	return (
		<PageLayout title="Achats" addUrl="/purchases/new" moreActions={<HeaderUploadButton />}>
			<PurchaseListFilter availableYears={props.availableYears} selectedYear={props.selectedYear} />

			{props.purchases.length === 0 ? (
				<EmptyState
					emptyIcon={<ShoppingBasket />}
					emptyLabel="Aucun achat trouvé."
					actionUrl="/purchases/new"
					actionLabel="Créer un achat"
				/>
			) : (
				<CardList rows={props.purchases} onEditClick={onEditClick} onDeleteClick={onDeleteClick}>
					{(purchase) => <PurchaseCardContent purchase={purchase} />}
				</CardList>
			)}
		</PageLayout>
	);
};
