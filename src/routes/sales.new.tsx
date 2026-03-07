import { SaleCreatePage } from "@features/sales";
import { createFileRoute } from "@tanstack/solid-router";

export const Route = createFileRoute("/sales/new")({
  component: RouteComponent,
});

function RouteComponent() {
  return <SaleCreatePage />;
}
