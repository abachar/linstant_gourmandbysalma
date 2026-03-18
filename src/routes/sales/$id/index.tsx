import { findSaleByIdFn, SaleShowPage } from "@features/sales";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/sales/$id/")({
	loader: ({ params }) => findSaleByIdFn({ data: { id: params.id } }),
	component: RouteComponent,
});

function RouteComponent() {
	const data = Route.useLoaderData();
	return <SaleShowPage sale={data} />;
}
