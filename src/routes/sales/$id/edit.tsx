import { findSaleByIdFn, getDistinctClientsFn, SaleEditPage } from "@features/sales";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/sales/$id/edit")({
	loader: ({ params }) =>
		Promise.all([findSaleByIdFn({ data: { id: params.id } }), getDistinctClientsFn()]).then(([sale, knownClients]) => ({
			sale,
			knownClients,
		})),
	component: RouteComponent,
});

function RouteComponent() {
	const { sale, knownClients } = Route.useLoaderData();
	return <SaleEditPage sale={sale} knownClients={knownClients} />;
}
