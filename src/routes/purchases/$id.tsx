import { createFileRoute } from '@tanstack/solid-router'

export const Route = createFileRoute('/purchases/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/purchases/$id"!</div>
}
