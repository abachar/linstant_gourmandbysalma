import { InventoryEditPage, getInventoryByIdFn } from "@features/inventory";
import { createFileRoute } from "@tanstack/solid-router";

export const Route = createFileRoute("/inventory/$id/edit")({
  loader: ({ params }) => getInventoryByIdFn({ data: { id: params.id } }),
  component: RouteComponent,
});

function RouteComponent() {
  const data = Route.useLoaderData();
  return <InventoryEditPage item={data()} />;
}
