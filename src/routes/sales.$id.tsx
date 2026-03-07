import { getOneSaleByIdFn, SaleShowPage } from "@features/sales";
import { createFileRoute } from "@tanstack/solid-router";

export const Route = createFileRoute("/sales/$id")({
	loader: ({ params }) => getOneSaleByIdFn({ data: { id: params.id } }),
	component: RouteComponent,
});

function RouteComponent() {
	const data = Route.useLoaderData();
	return <SaleShowPage sale={data()} />;
}
