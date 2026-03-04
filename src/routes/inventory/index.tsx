import { createFileRoute, Link } from "@tanstack/solid-router";
import { PageLayout } from "@components";

export const Route = createFileRoute("/inventory/")({
  component: RouteComponent,
});

const HeaderAction = () => (
  <Link
    to="/inventory/new"
    class="flex items-center justify-center rounded-full size-10 bg-primary text-white shadow-lg shadow-primary/20"
  >
    <span class="material-symbols-outlined">add</span>
  </Link>
);

function RouteComponent() {
  return (
    <PageLayout title="Stock" action={<HeaderAction />}>
      <div>Hello "/inventory/"!</div>
    </PageLayout>
  );
}
