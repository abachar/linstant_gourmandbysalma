import { QueryClient, QueryClientProvider } from "@tanstack/solid-query";
import { Outlet } from "@tanstack/solid-router";
import type { Component } from "solid-js";
import { RootDocument } from "./RootDocument";

const queryClient = new QueryClient();

export const RootComponent: Component = () => (
	<QueryClientProvider client={queryClient}>
		<RootDocument>
			<Outlet />
		</RootDocument>
	</QueryClientProvider>
);
