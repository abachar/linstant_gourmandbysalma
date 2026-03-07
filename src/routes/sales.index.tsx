import { getSalesFn, SaleListPage } from "@features/sales";
import { createFileRoute } from "@tanstack/solid-router";
import { zodValidator } from "@tanstack/zod-adapter";
import z from "zod";

export const Route = createFileRoute("/sales/")({
	validateSearch: zodValidator(z.object({ filter: z.string().default("") })),
	loaderDeps: ({ search: { filter } }) => ({ filter }),
	loader: ({ deps }) => getSalesFn({ data: { filter: deps.filter } }),
	component: RouteComponent,
});

function RouteComponent() {
	const data = Route.useLoaderData();
	return <SaleListPage {...data()} />;
}
