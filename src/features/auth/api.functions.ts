import { createServerFn } from "@tanstack/solid-start";
import { getSession, login } from "./api.server";

export const loginFn = createServerFn({ method: "POST" })
	.inputValidator((data: { password: string }) => data)
	.handler(async ({ data }) => login(data.password));

export const getSessionFn = createServerFn({ method: "GET" }).handler(getSession);
