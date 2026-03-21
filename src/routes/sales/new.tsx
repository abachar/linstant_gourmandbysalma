import { getDistinctClientsFn } from "@features/sales/api.functions";
import { SaleCreatePage } from "@features/sales";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/sales/new")({
	loader: () => getDistinctClientsFn(),
	component: RouteComponent,
});

function RouteComponent() {
	const knownClients = Route.useLoaderData();
	return <SaleCreatePage knownClients={knownClients} />;
}
