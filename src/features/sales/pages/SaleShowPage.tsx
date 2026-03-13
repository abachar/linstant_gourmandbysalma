import { PageLayout } from "@components/layouts";
import type { Component } from "solid-js";
import type { FindSaleByIdReturn } from "../api.functions";
import { SaleDetails, SaleShowActions } from "./components";

export const SaleShowPage: Component<{ sale: FindSaleByIdReturn }> = ({ sale }) => {
	return (
		<PageLayout title={`Vente - ${sale.clientName}`} withCancel={true}>
			<div class="space-y-4">
				<SaleDetails sale={sale} />
				<SaleShowActions sale={sale} />
			</div>
		</PageLayout>
	);
};
