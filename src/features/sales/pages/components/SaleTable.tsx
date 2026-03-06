import { EmptyState } from "@components/ui";
import { Component } from "solid-js";
import { GetSalesReturn } from "../../api.functions";
import { SaleTableRow } from "./SaleTableRow";

export const SaleTable: Component<{ sales: GetSalesReturn}> = ({sales}) => {
  return (
    sales.length === 0 ? (
        <EmptyState
          emptyIcon="shopping_bag"
          emptyLabel="Aucune vente trouvée."
          actionUrl="/sales/new"
          actionLabel="Créer une vente"
        />
    ) : (
      <div class="space-y-5">
        {sales.map((sale) => <SaleTableRow sale={sale} />)}
      </div>
    )
  );
};
