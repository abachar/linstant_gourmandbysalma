import { HeaderCancelButton } from "@components/buttons";
import { PageLayout } from "@components/layouts";
import { useNavigate } from "@tanstack/solid-router";
import { type Component, createSignal } from "solid-js";
import { createSaleFn } from "../api.functions";
import { SaleForm, type SaleFormValues } from "./components/SaleForm";

export const SaleCreatePage: Component = () => {
	const navigate = useNavigate();
	const [isPending, setIsPending] = createSignal(false);

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
		<PageLayout title="Nouvelle vente" action={<HeaderCancelButton />}>
			<SaleForm
				initialValues={initialValues}
				onSubmit={handleSubmit}
				submitLabel="Enregistrer la vente"
				cancelHref="/sales/"
				isPending={isPending()}
			/>
		</PageLayout>
	);
};
