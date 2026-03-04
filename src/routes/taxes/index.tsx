import { createFileRoute } from "@tanstack/solid-router";
import { PageLayout } from "@components";

export const Route = createFileRoute("/taxes/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <PageLayout title="Taxes">
      <div>Hello "/taxes/"!</div>
    </PageLayout>
  );
}
