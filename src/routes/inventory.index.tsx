import { getInventoryFn, InventoryListPage } from "@features/inventory";
import { createFileRoute } from "@tanstack/solid-router";

export const Route = createFileRoute("/inventory/")({
  loader: () => getInventoryFn(),
  component: RouteComponent,
});

function RouteComponent() {
  const data = Route.useLoaderData();

  return <InventoryListPage inventoryItems={data()} />;
}
