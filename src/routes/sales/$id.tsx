import { createFileRoute } from "@tanstack/solid-router";

export const Route = createFileRoute("/sales/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/sales/view"!</div>;
}
