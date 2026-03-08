import { findProductByIdFn, ProductEditPage } from "@features/products";
import { createFileRoute } from "@tanstack/solid-router";

export const Route = createFileRoute("/products/$id/edit")({
	loader: ({ params }) => findProductByIdFn({ data: { id: params.id } }),
	component: RouteComponent,
});

function RouteComponent() {
	const data = Route.useLoaderData();
	return <ProductEditPage product={data()} />;
}
