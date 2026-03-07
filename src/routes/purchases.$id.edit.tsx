import { PurchaseEditPage, getPurchaseByIdFn } from "@features/purchases";
import { createFileRoute } from "@tanstack/solid-router";

export const Route = createFileRoute("/purchases/$id/edit")({
  loader: ({ params }) => getPurchaseByIdFn({ data: { id: params.id } }),
  component: RouteComponent,
});

function RouteComponent() {
  const data = Route.useLoaderData();
  return <PurchaseEditPage purchase={data()} />;
}
