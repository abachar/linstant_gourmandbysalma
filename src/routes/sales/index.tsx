import { createFileRoute, Link } from "@tanstack/solid-router";
import { PageLayout } from "@components";

export const Route = createFileRoute("/sales/")({
  component: RouteComponent,
});

const HeaderAction = () => (
  <Link
    to="/sales/new"
    class="flex items-center justify-center rounded-full size-10 bg-primary text-white shadow-lg shadow-primary/20"
  >
    <span class="material-symbols-outlined">add</span>
  </Link>
);

function RouteComponent() {
  return (
    <PageLayout title="Ventes" action={<HeaderAction />}>
      <div>Hello "/sales/"!</div>
    </PageLayout>
  );
}
