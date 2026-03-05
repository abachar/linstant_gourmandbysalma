import { createFileRoute } from "@tanstack/solid-router";
import { PageLayout, HeaderAddButton } from "@components";

export const Route = createFileRoute("/purchases/")({
  component: RouteComponent,
});

const RouteComponent = () => {
  return (
    <PageLayout title="Achats" action={<HeaderAddButton to="/purchases/new" />}>
      <div>Hello "/purchases/"!</div>
    </PageLayout>
  );
};
