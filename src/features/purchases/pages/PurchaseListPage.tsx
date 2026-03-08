import { HeaderAddButton } from "@components/buttons";
import { PageLayout } from "@components/layouts";
import type { Component } from "solid-js";
import type { FindAllPurchasesReturn } from "../api.functions";
import { PurchaseTable } from "./components";

export const PurchaseListPage: Component<{ purchases: FindAllPurchasesReturn }> = ({ purchases }) => {
	return (
		<PageLayout title="Achats" action={<HeaderAddButton to="/purchases/new" />}>
			<h3 class="text-white/60 text-sm font-bold uppercase tracking-widest px-1 py-2">Liste des achats</h3>
			<PurchaseTable purchases={purchases} />
		</PageLayout>
	);
};
