import { getSessionFn, LoginPage } from "@features/auth";
import { createFileRoute, redirect } from "@tanstack/solid-router";

export const Route = createFileRoute("/login")({
	beforeLoad: async () => {
		const { authenticated } = await getSessionFn();
		if (authenticated) {
			throw redirect({ to: "/" });
		}
	},
	component: RouteComponent,
});

function RouteComponent() {
	return <LoginPage />;
}
