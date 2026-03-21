import { formatDatetimeLocal } from "@common/format/date";
import { PageLayout } from "@components/layouts";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import type { FindSaleByIdReturn, GetDistinctClientsReturn } from "../api.functions";
import { updateSaleFn } from "../api.functions";
import { SaleForm, type SaleFormValues } from "./components/SaleForm";

export const SaleEditPage = ({ sale, knownClients }: { sale: FindSaleByIdReturn; knownClients?: GetDistinctClientsReturn }) => {
	const navigate = useNavigate();
	const [isPending, setIsPending] = useState(false);

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
		<PageLayout title="Modifier vente" withCancel={true}>
			<SaleForm
				initialValues={initialValues}
				knownClients={knownClients}
				onSubmit={handleSubmit}
				submitLabel="Enregistrer"
				cancelHref={`/sales/${sale.id}`}
				isPending={isPending}
			/>
		</PageLayout>
	);
};
