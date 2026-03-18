import { findPurchaseByIdFn, PurchaseEditPage } from "@features/purchases";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/purchases/$id/edit")({
	loader: ({ params }) => findPurchaseByIdFn({ data: { id: params.id } }),
	component: RouteComponent,
});

function RouteComponent() {
	const data = Route.useLoaderData();
	return <PurchaseEditPage purchase={data} />;
}
