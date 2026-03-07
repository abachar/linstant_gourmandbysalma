import { SaleEditPage, getOneSaleByIdFn } from "@features/sales";
import { createFileRoute } from "@tanstack/solid-router";

export const Route = createFileRoute("/sales/$id/edit")({
  loader: ({ params }) => getOneSaleByIdFn({ data: { id: params.id } }),
  component: RouteComponent,
});

function RouteComponent() {
  const data = Route.useLoaderData();
  return <SaleEditPage sale={data()} />;
}
