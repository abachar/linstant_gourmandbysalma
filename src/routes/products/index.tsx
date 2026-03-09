import { findAllProductsFn, ProductListPage } from "@features/products";
import { createFileRoute } from "@tanstack/solid-router";

export const Route = createFileRoute("/products/")({
	loader: () => findAllProductsFn(),
	component: RouteComponent,
});

function RouteComponent() {
	const data = Route.useLoaderData();
	return <ProductListPage products={data()} />;
}
