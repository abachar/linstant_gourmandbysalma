# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev          # Start dev server (http://localhost:5173)
pnpm build        # Build for production
pnpm start        # Run production server (srvx)
pnpm test         # Run tests (Vitest)
pnpm check        # Biome lint + format check
pnpm format       # Auto-format with Biome
pnpm lint         # Lint with Biome
```

## Stack

- **Framework**: TanStack Start — full-stack **React** SSR
- **Routing**: TanStack React Router (file-based, `routeTree.gen.ts` auto-generated — do NOT edit)
- **ORM**: Drizzle ORM (PostgreSQL)
- **CSS**: Tailwind CSS v4 — `@theme` is valid syntax (ignore IDE linting warnings)
- **Linter**: Biome (tabs, 120-char lines, double quotes)
- **Icons**: lucide-react

## Architecture

### Feature module convention

Each feature in `src/features/` follows this pattern:

| File | Purpose |
|---|---|
| `api.server.ts` | Raw DB operations (server-only, `.server.ts` extension enforced) |
| `api.functions.ts` | `createServerFn()` wrappers callable from client |
| `pages/*.tsx` | Page components (suffixed `*Page.tsx`) |
| `pages/components/` | Feature-specific UI components |

### Server functions

- Import `createServerFn` from `@tanstack/react-start` (NOT `/server` subpath)
- Cookies: `getCookie`/`setCookie` from `@tanstack/react-start/server`
- Export return types as: `type MyType = Awaited<ReturnType<typeof myServerFn>>`
- Only `createServerFn()` exports from `.server.ts` files are accessible on the client

### Data fetching in routes

- Route loaders call server functions directly (no TanStack Query cache currently)
- Components access data via `Route.useLoaderData()`
- Mutations use `useMutation` from `@tanstack/react-query`
- After mutations: `window.location.reload()` or `router.invalidate()` (query invalidation planned for backlog)

### Routing

- File-based routes in `src/routes/`
- Root route (`__root.tsx`) has `beforeLoad` auth guard — redirects to `/login` if unauthenticated
- `createAPIFileRoute` does NOT exist in this version of TanStack Start
- Nested route example: `/sales/$id` parent with `/sales/$id/edit` child

### Layout

- Mobile-first: sticky header + bottom nav (no sidebar)
- All pages wrap content in `PageLayout` component (`title`, optional `addUrl`, `withCancel`, `moreActions`)
- Primary color: `#ec1337`, Font: Plus Jakarta Sans
- Dark mode via `dark:` Tailwind classes

### Auth

- Custom HMAC-SHA256 session cookie (`auth_session`), 7-day expiry, single admin user
- Credentials stored in env vars (email + scrypt-hashed password)
- `getSessionFn` must be GET method (required for `beforeLoad`)
- No logout (auto-expiry by design)

## Path aliases

- `@common/*` → `src/common/*`
- `@components/*` → `src/components/*`
- `@features/*` → `src/features/*`
- `@assets/*` → `src/assets/*`

## Key conventions

- UI is entirely in **French**
- Date/amount formatting: use helpers from `@common/format`
- Database schema: `src/common/db/schema.ts` (sales, purchases, products tables)
