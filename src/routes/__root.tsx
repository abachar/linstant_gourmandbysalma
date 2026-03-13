/// <reference types="vite/client" />
import { RootComponent } from "@components/layouts";
import { getSessionFn } from "@features/auth";
import { createRootRoute, redirect } from "@tanstack/solid-router";
import appCss from "../styles.css?url";

export const Route = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{ name: "viewport", content: "width=device-width, initial-scale=1" },
			{ title: "L'Instant Gourmand by Salma" },
		],
		links: [
			{ rel: "stylesheet", href: appCss },
			{ rel: "preconnect", href: "https://fonts.googleapis.com" },
			{ rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap",
			},
		],
	}),
	beforeLoad: async ({ location }) => {
		if (location.pathname === "/login") return;
		const { authenticated } = await getSessionFn();
		if (!authenticated) {
			throw redirect({ to: "/login" });
		}
	},
	component: RootComponent,
});
