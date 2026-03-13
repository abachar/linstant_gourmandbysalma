import { findAllPurchasesFn, PurchaseListPage } from "@features/purchases";
import { createFileRoute } from "@tanstack/solid-router";
import { zodValidator } from "@tanstack/zod-adapter";
import z from "zod";

export const Route = createFileRoute("/purchases/")({
	validateSearch: zodValidator(z.object({ year: z.number().default(new Date().getFullYear()) })),
	loaderDeps: ({ search: { year } }) => ({ year }),
	loader: ({ deps }) => findAllPurchasesFn({ data: { year: deps.year } }),
	component: RouteComponent,
});

function RouteComponent() {
	const data = Route.useLoaderData();
	return <PurchaseListPage {...data()} />;
}
