import { DashboardPage, findDashboardFn } from "@features/dashboard";
import { createFileRoute } from "@tanstack/solid-router";
import { zodValidator } from "@tanstack/zod-adapter";
import { z } from "zod";

export const Route = createFileRoute("/")({
	validateSearch: zodValidator(z.object({ month: z.string().default("") })),
	loaderDeps: ({ search: { month } }) => ({ month }),
	loader: ({ deps }) => findDashboardFn({ data: { month: deps.month } }),
	component: RouteComponent,
});

function RouteComponent() {
	const data = Route.useLoaderData();

	return <DashboardPage {...data()} />;
}
