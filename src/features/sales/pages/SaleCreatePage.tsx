import { PageLayout } from "@components/layouts";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { createSaleFn } from "../api.functions";
import { SaleForm, type SaleFormValues } from "./components/SaleForm";

export const SaleCreatePage = () => {
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
				onSubmit={handleSubmit}
				submitLabel="Enregistrer la vente"
				cancelHref="/sales/"
				isPending={isPending}
			/>
		</PageLayout>
	);
};
