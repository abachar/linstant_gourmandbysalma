import { createFileRoute } from '@tanstack/solid-router'

export const Route = createFileRoute('/inventory/new')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/inventory/new"!</div>
}
