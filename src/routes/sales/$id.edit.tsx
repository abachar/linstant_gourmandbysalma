import { createFileRoute } from "@tanstack/solid-router";

export const Route = createFileRoute("/sales/$id/edit")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/sales/edit"!</div>;
}
