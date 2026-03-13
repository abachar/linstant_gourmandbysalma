import { PageLayout } from "@components/layouts";
import { CardList, EmptyState } from "@components/ui";
import { useMutation } from "@common/hooks";
import { useNavigate } from "@tanstack/solid-router";
import { ShoppingBasket } from "lucide-solid";
import { type Component, createSignal } from "solid-js";
import type { FindAllPurchasesReturn } from "../api.functions";
import { deletePurchaseByIdFn } from "../api.functions";
import { HeaderUploadButton, PurchaseCardContent, PurchaseListFilter } from "./components";

type Purchase = FindAllPurchasesReturn["purchases"][number];

export const PurchaseListPage: Component<FindAllPurchasesReturn> = (props) => {
	const navigate = useNavigate();
	const [purchases, setPurchases] = createSignal<Purchase[]>(props.purchases);

	const onEditClick = (purchase: Purchase) =>
		navigate({ to: `/purchases/$id/edit`, params: { id: purchase.id } });

	const { mutate: deletePurchase } = useMutation({ fn: deletePurchaseByIdFn });
	const onDeleteClick = async (purchase: Purchase) => {
		await deletePurchase({ data: { id: purchase.id } });
		setPurchases((prev) => prev.filter((p) => p.id !== purchase.id));
	};

	return (
		<PageLayout title="Achats" addUrl="/purchases/new" moreActions={<HeaderUploadButton />}>
			<PurchaseListFilter availableYears={props.availableYears} selectedYear={props.selectedYear} />

			{purchases().length === 0 ? (
				<EmptyState
					emptyIcon={<ShoppingBasket />}
					emptyLabel="Aucun achat trouvé."
					actionUrl="/purchases/new"
					actionLabel="Créer un achat"
				/>
			) : (
				<CardList rows={purchases()} onEditClick={onEditClick} onDeleteClick={onDeleteClick}>
					{(purchase) => <PurchaseCardContent purchase={purchase} />}
				</CardList>
			)}
		</PageLayout>
	);
};
