import { QueryClient } from "@tanstack/solid-query";
import { createRouter } from "@tanstack/solid-router";
import { setupRouterSsrQueryIntegration } from "@tanstack/solid-router-ssr-query";
import { routeTree } from "./routeTree.gen";
import { DefaultErrorComponent, DefaultNotFoundComponent } from "@components/defaults";

export function getRouter() {
	const queryClient = new QueryClient();

	const router = createRouter({
		routeTree,
		context: { queryClient },
		defaultPreload: "intent",
		defaultErrorComponent: DefaultErrorComponent,
		defaultNotFoundComponent: DefaultNotFoundComponent,
	});

	setupRouterSsrQueryIntegration({
		router,
		queryClient,
	});

	return router;
}
