import { PageLayout } from "@components/layouts";
import { CardList, EmptyState } from "@components/ui";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, useRouter } from "@tanstack/react-router";
import { ShoppingBasket } from "lucide-react";
import type { FindAllPurchasesReturn } from "../api.functions";
import { deletePurchaseByIdFn } from "../api.functions";
import { HeaderUploadButton, PurchaseCardContent, PurchaseListFilter } from "./components";

export const PurchaseListPage = (props: FindAllPurchasesReturn) => {
	const navigate = useNavigate();
	const router = useRouter();
	const { mutate: deletePurchase } = useMutation({
		mutationFn: deletePurchaseByIdFn,
		onSuccess: () => router.invalidate(),
	});

	const onEditClick = (purchase: FindAllPurchasesReturn["purchases"][number]) =>
		navigate({ to: "/purchases/$id/edit", params: { id: purchase.id } });

	const onDeleteClick = (purchase: FindAllPurchasesReturn["purchases"][number]) => {
		if (!confirm("Supprimer cet achat ?")) return;
		deletePurchase({ data: { id: purchase.id } });
	};

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
				<CardList
					rows={props.purchases}
					onEditClick={onEditClick}
					onDeleteClick={onDeleteClick}
					canEdit={(p) => !p.isImported}
					canDelete={(p) => !p.isImported}
				>
					{(purchase) => <PurchaseCardContent purchase={purchase} />}
				</CardList>
			)}
		</PageLayout>
	);
};
