import { createFileRoute } from "@tanstack/solid-router";
import { PageLayout, HeaderAddButton } from "@components";

export const Route = createFileRoute("/inventory/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <PageLayout title="Stock" action={<HeaderAddButton to="/inventory/new" />}>
      <div>Hello "/inventory/"!</div>
    </PageLayout>
  );
}
