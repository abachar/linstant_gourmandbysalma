import { PageLayout } from "@components/layouts";
import { HeaderCancelButton } from "@components/buttons";
import { useNavigate } from "@tanstack/solid-router";
import { createSignal, type Component } from "solid-js";
import { formatDatetimeLocal } from "@common/format/date";
import type { GetOneSaleByIdReturn } from "../api.functions";
import { updateSaleFn } from "../api.functions";
import { SaleForm, type SaleFormValues } from "./components/SaleForm";

export const SaleEditPage: Component<{ sale: GetOneSaleByIdReturn }> = ({ sale }) => {
  const navigate = useNavigate();
  const [isPending, setIsPending] = createSignal(false);

  const initialValues: SaleFormValues = {
    clientName: sale.clientName,
    deliveryDatetime: formatDatetimeLocal(sale.deliveryDatetime),
    deliveryAddress: sale.deliveryAddress ?? "",
    description: sale.description ?? "",
    amount: sale.amount,
    deposit: sale.deposit,
    depositPaymentMethod: sale.depositPaymentMethod,
    remaining: sale.remaining,
    remainingPaymentMethod: sale.remainingPaymentMethod,
  };

  async function handleSubmit(values: SaleFormValues) {
    setIsPending(true);
    try {
      await updateSaleFn({
        data: {
          id: sale.id,
          ...values,
          deliveryAddress: values.deliveryAddress || undefined,
          description: values.description || undefined,
        },
      });
      navigate({ to: "/sales/$id", params: { id: sale.id } });
    } finally {
      setIsPending(false);
    }
  }

  return (
    <PageLayout title="Modifier vente" action={<HeaderCancelButton />}>
      <SaleForm
        initialValues={initialValues}
        onSubmit={handleSubmit}
        submitLabel="Enregistrer"
        cancelHref={`/sales/${sale.id}`}
        isPending={isPending()}
      />
    </PageLayout>
  );
};
