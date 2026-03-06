import { HeaderAddButton } from "@components/buttons";
import { PageLayout } from "@components/layouts";
import { type Component } from "solid-js";
import type { GetInventoryReturn} from "../api.functions";
import { InventoryTable } from "./components";

export const InventoryListPage: Component<{ inventoryItems: GetInventoryReturn}> = ({inventoryItems}) => {
	return (
    <PageLayout title="Stock" action={<HeaderAddButton to="/inventory/new" />}>
      <div class="flex items-center justify-between mb-3 px-1">
        <h2 class="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Stock Actuel
        </h2>
        <span class="text-xs font-medium text-slate-400">
          {inventoryItems.length} Produits
        </span>
      </div>
      <InventoryTable inventoryItems={inventoryItems} />
		</PageLayout>
	);
};
