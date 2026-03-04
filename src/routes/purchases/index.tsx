import { createFileRoute, Link } from "@tanstack/solid-router";
import { PageLayout } from "@components";

export const Route = createFileRoute("/purchases/")({
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

const RouteComponent = () => {
  return (
    <PageLayout title="Achats" action={<HeaderAction />}>
      <div>Hello "/purchases/"!</div>
    </PageLayout>
  );
};
