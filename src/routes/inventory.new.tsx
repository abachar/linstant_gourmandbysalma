import { InventoryCreatePage } from "@features/inventory";
import { createFileRoute } from "@tanstack/solid-router";

export const Route = createFileRoute("/inventory/new")({
	component: RouteComponent,
});

function RouteComponent() {
	return <InventoryCreatePage />;
}
