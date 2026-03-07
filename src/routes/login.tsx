import { LoginPage } from "@features/auth";
import { createFileRoute } from "@tanstack/solid-router";

export const Route = createFileRoute("/login")({
	component: RouteComponent,
});

function RouteComponent() {
	return <LoginPage />;
}
