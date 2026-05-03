# Code Standards

## General

- Keep modules small and single-purpose
- Fix root causes, do not layer workarounds
- Do not mix unrelated concerns in one component or route
- Respect the system boundaries defined in `architecture-context.md`

## TypeScript

- Strict mode is required throughout the project
- Avoid `any`; — use explicit interfaces or narrowly scoped types
- Validate unknown external input at system boundaries before trusting it
- Use `interface` for obejct contracts. 

## Next.js

- Default to server components
- Add `"use client"` only when the component needs browser interactivity, hooks, or real-time state.
- Keep route handlers focused on a single responsibility.
- Long-running work belongs in background tasks, not in request handlers.

## Styling

- Use CSS custom property tokens — no hardcoded hex values
- Follow the border radius scale defined in ui-context.md

- Use CSS custom property tokens defined in `globals.css` — no raw Tailwind color classes like `zinc-*` or hardcoded hex values.
- Reference tokens through their Tailwind utility names: `bg-base`, `text-copy-primary`, `border-surface-border`, `text-brand`, etc.
- Maintain the border radius scale: `rounded-xl` for small elements, `rounded-2xl` for cards, `rounded-3xl` for modals.

## API Routes

- Validate and parse request input before any logic runs
- Enforce auth and ownership checks before any mutation
- Return consistent, predictable response shapes
- Keep route handlers thin - push complexity into shared modules or background taks

## Data and Storage

- Project metadata and relationships belongs in PostgreSQL via Prisma.
- Canvas snapshots and generated scpec belong in Vercel Blob; Prisma stores only the blob URL reference.
- Do not store large generate content directly in the database
- Task run records are first-class relation data - threat ownership and run IDs as verifed before any token issuance

## File Organization

- `lib/` — shared infrastructure: Prisma client, auth helpers, utilities.
- `trigger/` — all durable background tasks and AI workflows
- `components/` — UI composition only; no business logic.
- `app/api/` — route handlres for auth, triggering, and persistence.
- Name files after the reponsibility they contain, not the technology
