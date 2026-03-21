import { PageLayout } from "@components/layouts";
import type { GetDistinctClientsReturn } from "@features/sales/api.functions";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { createSaleFn } from "../api.functions";
import { SaleForm, type SaleFormValues } from "./components/SaleForm";

interface SaleCreatePageProps {
	knownClients?: GetDistinctClientsReturn;
}

export const SaleCreatePage = ({ knownClients }: SaleCreatePageProps) => {
	const navigate = useNavigate();
	const [isPending, setIsPending] = useState(false);

	const initialValues: SaleFormValues = {
		clientName: "",
		deliveryDatetime: "",
		deliveryAddress: "",
		description: "",
		amount: "",
		deposit: "",
		depositPaymentMethod: "Bancaire",
		remaining: "",
		remainingPaymentMethod: "Espèces",
	};

	async function handleSubmit(values: SaleFormValues) {
		setIsPending(true);
		try {
			const result = await createSaleFn({
				data: {
					...values,
					deliveryAddress: values.deliveryAddress || undefined,
					description: values.description || undefined,
				},
			});
			navigate({ to: "/sales/$id", params: { id: result.id } });
		} finally {
			setIsPending(false);
		}
	}

	return (
		<PageLayout title="Nouvelle vente" withCancel={true}>
			<SaleForm
				initialValues={initialValues}
				knownClients={knownClients}
				onSubmit={handleSubmit}
				submitLabel="Enregistrer la vente"
				cancelHref="/sales/"
				isPending={isPending}
			/>
		</PageLayout>
	);
};
