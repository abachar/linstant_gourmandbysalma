import { createServerFn } from "@tanstack/react-start";
import { createProduct, deleteProductById, findAllProducts, findProductById, updateProduct } from "./api.server";

export const findAllProductsFn = createServerFn({ method: "GET" }).handler(findAllProducts);

export type FindAllProductsReturn = Awaited<ReturnType<typeof findAllProductsFn>>;

export const findProductByIdFn = createServerFn({ method: "GET" })
	.inputValidator((data: { id: string }) => data)
	.handler(async ({ data }) => findProductById(data.id));

export type FindProductByIdReturn = Awaited<ReturnType<typeof findProductByIdFn>>;

export const createProductFn = createServerFn({ method: "POST" })
	.inputValidator((data: { productName: string; quantity: number }) => data)
	.handler(async ({ data }) => createProduct(data));

export const deleteProductByIdFn = createServerFn({ method: "POST" })
	.inputValidator((data: { id: string }) => data)
	.handler(async ({ data }) => deleteProductById(data.id));

export const updateProductFn = createServerFn({ method: "POST" })
	.inputValidator((data: { id: string; productName: string; quantity: number }) => data)
	.handler(async ({ data }) => updateProduct(data));
