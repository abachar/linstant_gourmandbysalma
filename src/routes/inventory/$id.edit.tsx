import { createFileRoute } from '@tanstack/solid-router'

export const Route = createFileRoute('/inventory/$id/edit')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/inventory/$id/edit"!</div>
}
