import { createServerFn } from "@tanstack/react-start";
import { getSession, login } from "./api.server";

export const loginFn = createServerFn({ method: "POST" })
	.inputValidator((data: { email: string; password: string }) => data)
	.handler(async ({ data }) => login(data.email, data.password));

export const getSessionFn = createServerFn({ method: "GET" }).handler(getSession);
