import { HeaderAddButton } from "@components/buttons";
import { PageLayout } from "@components/layouts";
import { type Component } from "solid-js";
import type { GetSalesReturn } from "../api.functions";
import { SaleListFilter, SaleTable } from "./components";

export const SaleListPage: Component<{ sales: GetSalesReturn, selectedFilter: string}> = ({sales, selectedFilter}) => {
	return (
    <PageLayout title="Ventes" action={<HeaderAddButton to="/sales/new" />}>
      <SaleListFilter selectedFilter={selectedFilter} />
      <SaleTable sales={sales} />
		</PageLayout>
	);
};
