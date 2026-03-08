import { ProductCreatePage } from "@features/products";
import { createFileRoute } from "@tanstack/solid-router";

export const Route = createFileRoute("/products/new")({
	component: RouteComponent,
});

function RouteComponent() {
	return <ProductCreatePage />;
}
