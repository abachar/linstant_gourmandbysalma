import { createFileRoute } from "@tanstack/solid-router";
import { PageLayout } from "@components";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <PageLayout title="Bienvenue, Salma !">
      <div>Hello "/dashboard/"!</div>
    </PageLayout>
  );
}
