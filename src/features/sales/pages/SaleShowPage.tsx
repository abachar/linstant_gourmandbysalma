import { HeaderCancelButton } from "@components/buttons";
import { PageLayout } from "@components/layouts";
import { type Component } from "solid-js";
import type { GetOneSaleByIdReturn } from "../api.functions";
import { SaleDetails, SaleShowActions } from "./components";

export const SaleShowPage: Component<{sale: GetOneSaleByIdReturn}> = ({sale}) => {
  return (
    <PageLayout title={`Vente - ${sale.clientName}`} action={<HeaderCancelButton />}>
      <div class="space-y-4">
      <SaleDetails sale={sale} />
        <SaleShowActions sale={sale} />
      </div>
		</PageLayout>
	);
};
