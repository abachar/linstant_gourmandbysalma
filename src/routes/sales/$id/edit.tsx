import { findSaleByIdFn, SaleEditPage } from "@features/sales";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/sales/$id/edit")({
	loader: ({ params }) => findSaleByIdFn({ data: { id: params.id } }),
	component: RouteComponent,
});

function RouteComponent() {
	const data = Route.useLoaderData();
	return <SaleEditPage sale={data} />;
}
