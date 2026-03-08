import { createServerFn } from "@tanstack/solid-start";
import { createProduct, findAllProducts, findProductById, updateProduct } from "./api.server";

export const findAllProductsFn = createServerFn({ method: "GET" }).handler(findAllProducts);

export type FindAllProductsReturn = Awaited<ReturnType<typeof findAllProducts>>;

export const findProductByIdFn = createServerFn({ method: "GET" })
	.inputValidator((data: { id: string }) => data)
	.handler(async ({ data }) => findProductById(data.id));

export type FindProductByIdReturn = Awaited<ReturnType<typeof findProductById>>;

export const createProductFn = createServerFn({ method: "POST" })
	.inputValidator((data: { productName: string; quantity: number }) => data)
	.handler(async ({ data }) => createProduct(data));

export const updateProductFn = createServerFn({ method: "POST" })
	.inputValidator((data: { id: string; productName: string; quantity: number }) => data)
	.handler(async ({ data }) => updateProduct(data));
