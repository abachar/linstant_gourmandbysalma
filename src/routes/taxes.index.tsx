import { getTaxReportingFn, TaxReportingPage } from "@features/taxes";
import { createFileRoute } from "@tanstack/solid-router";
import { zodValidator } from "@tanstack/zod-adapter";
import z from "zod";

export const Route = createFileRoute("/taxes/")({
	validateSearch: zodValidator(z.object({ year: z.number().default(new Date().getFullYear()) })),
	loaderDeps: ({ search: { year } }) => ({ year }),
	loader: ({ deps }) => getTaxReportingFn({ data: { year: deps.year } }),
	component: RouteComponent,
});

function RouteComponent() {
	const data = Route.useLoaderData();
	return <TaxReportingPage {...data()} />;
}
