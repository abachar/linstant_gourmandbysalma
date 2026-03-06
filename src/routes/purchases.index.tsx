import { getPurchasesFn, PurchaseListPage } from "@features/purchases";
import { createFileRoute } from "@tanstack/solid-router";

export const Route = createFileRoute("/purchases/")({
  loader: () => getPurchasesFn(),
  component: RouteComponent,
});

function RouteComponent() {
  const data = Route.useLoaderData();

  return <PurchaseListPage purchases={data()} />;
}
