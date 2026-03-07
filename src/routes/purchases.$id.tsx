import { getPurchaseByIdFn, PurchaseShowPage } from "@features/purchases";
import { createFileRoute } from "@tanstack/solid-router";

export const Route = createFileRoute("/purchases/$id")({
	loader: ({ params }) => getPurchaseByIdFn({ data: { id: params.id } }),
	component: RouteComponent,
});

function RouteComponent() {
	const data = Route.useLoaderData();
	return <PurchaseShowPage purchase={data()} />;
}
