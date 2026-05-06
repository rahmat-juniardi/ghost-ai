# Progress Tracker

Update this file after every meaningful implementation
change.

## Current Phase

- ✅ Design system — complete
- ✅ Editor chrome (Navbar + Sidebar) — complete
- ✅ Authentication (Clerk) — complete

## Current Goal

- Collaborative canvas — per project roadmap

## Completed

- Project dialogs (feature spec `04-project-dialogs.md`) — complete
- Prisma data models (feature spec `05-prisma.md`) — complete
  - Created `prisma/models/project.prisma` with `Project` and `ProjectCollaborator` models
    - `Project`: ownerId, name, description (optional), status enum (DRAFT/ARCHIVED), canvasJsonPath, timestamps, indexes on ownerId and createdAt
    - `ProjectCollaborator`: project relation with cascade delete, email, timestamps, unique constraint on [projectId, email], indexes on email and [projectId, createdAt]
  - Created `lib/prisma.ts` — cached singleton that branches by DATABASE_URL:
    - `prisma+postgres://` → Accelerate path via PrismaPg adapter
    - `postgres://` → direct connection via `@prisma/adapter-pg`
    - Caches on `globalThis` in non-production
  - Migration `20260506071903_init` created and applied successfully
  - Build verified: `npm run build` passes with zero TypeScript errors
  - Created `lib/project-dialogs.ts` with `useProjectDialogs` hook: dialog state, form state, loading state, mock data, slug helper, and `ProjectDialogContext` for passing actions to children
  - Created `components/editor/create-project-dialog.tsx` — project name input with live slug preview that updates as the user types
  - Created `components/editor/rename-project-dialog.tsx` — prefilled input, auto-focuses, Enter submits, shows current project name in description
  - Created `components/editor/delete-project-dialog.tsx` — destructive confirmation with no input, confirm button uses `variant="destructive"`
  - Updated `components/editor/project-sidebar.tsx` — renders mock project lists, shows Pencil/Trash2 actions only for owned projects (hidden for shared/collaborator projects), actions appear on hover, wired New Project button
  - Updated `app/editor/layout.tsx` — uses hook, provides context, renders all three dialogs, passes mock submit handlers
  - Updated `app/editor/page.tsx` — editor home screen: heading "Create a project or open an existing one", description, New Project button with Plus icon, no card wrapper, uses context to open create dialog
  - Build verified: `npm run build` passes with zero TypeScript errors
- Installed and configured `shadcn/ui` (v4.6.0) with Tailwind v4
- Installed `lucide-react`, `clsx`, `tailwind-merge`
- Created `lib/utils.ts` with reusable `cn()` helper
- Added shadcn components: `Button`, `Card`, `Dialog`, `Input`, `Tabs`, `Textarea`, `ScrollArea`
- Set up dark-only theme in `globals.css` with all custom project tokens:
  - Page/surface layers (`--bg-base`, `--bg-surface`, `--bg-elevated`, `--bg-subtle`)
  - Borders (`--border-default`, `--border-subtle`)
  - Text colors (`--text-primary`, `--text-secondary`, `--text-muted`, `--text-faint`)
  - Accents (`--accent-primary`, `--accent-primary-dim`, `--accent-ai`, `--accent-ai-text`)
  - States (`--state-error`, `--state-success`, `--state-warning`)
  - Mapped all custom tokens to Tailwind utility names in `@theme inline`
  - Wired shadcn semantic tokens to our custom variables
- Updated `app/layout.tsx`:
  - Font variables `--font-sans` / `--font-mono` (from Geist/Geist Mono)
  - Added `dark` class to `<html>` for dark-only theme
  - Updated metadata to "Ghost AI"
- Build verified: all components import without errors, `cn()` works, no light styling appears
- Auth (feature spec `03-auth.md`) implemented:
  - Installed `@clerk/ui` for Clerk's `dark` theme
  - Created `proxy.ts` at project root with protected-first strategy (public: `/sign-in`, `/sign-up`)
  - Wrapped root layout with `ClerkProvider` using Clerk's `dark` theme
  - Mapped all Clerk appearance variables to existing CSS custom properties (no hardcoded colors)
  - Created `components/auth/auth-layout.tsx` — two-panel layout (left: logo + tagline + feature list, right: Clerk form) on large screens; form-only on small screens
  - Created `app/sign-in/[[...sign-in]]/page.tsx` with shared `AuthLayout`
  - Created `app/sign-up/[[...sign-up]]/page.tsx` with shared `AuthLayout`
  - Updated `app/page.tsx` to redirect authenticated users to `/editor`, unauthenticated to `/sign-in`
  - Added `UserButton` to editor navbar right section
  - Build verified: `npm run build` passes

## In Progress

- None.

## Next Up

- Collaborative canvas — per project roadmap

## Open Questions

- None.

## Architecture Decisions

- **Dark-only theme:** The project is dark-only as specified in `ui-context.md`. All CSS variables are set in `:root` and the `.dark` block is a passthrough. The `dark` class is hardcoded on `<html>`.
- **Token mapping:** Custom project tokens (e.g., `--bg-base`, `--text-primary`) are defined as raw CSS vars and mapped to Tailwind utility names via `@theme inline` (e.g., `--color-bg-base: var(--bg-base)`). Shadcn semantic tokens reference the same custom vars (e.g., `--background: var(--bg-base)`).
- **Route protection:** Uses `proxy.ts` (not `middleware.ts`) with protected-first strategy. Public routes are defined via `createRouteMatcher` for `/sign-in(.*)` and `/sign-up(.*)`. All other routes require authentication.
- **ClerkProvider placement:** Wraps `<html>` (not inside `<body>`) per the current SDK convention — `@clerk/nextjs` v7.3.0 allows this pattern.
- **Clerk theming:** Uses Clerk's `dark` theme from `@clerk/ui/themes` as the base, with all variable overrides pointing to the app's existing CSS custom properties. No hardcoded color values.

## Session Notes

- Design system implementation (feature spec `01-design-system.md`) is done.
- All 7 shadcn components are in `components/ui/` and must not be manually edited.
- Components use `@base-ui/react` primitives (shadcn base-nova style).
- Editor chrome (feature spec `02-editor.md`) implemented:
  - `components/editor/editor-navbar.tsx` — fixed-top navbar with sidebar toggle (PanelLeftOpen/PanelLeftClose), left/center/right sections, dark background with bottom border. Now includes `UserButton` in right section.
  - `components/editor/project-sidebar.tsx` — floating sidebar that slides in from left, backdrop overlay, Projects header with close button, shadcn Tabs (My Projects / Shared) with empty placeholder states, and full-width New Project button with Plus icon.
  - Both components compile without TypeScript errors; production build succeeds.
  - Dialog pattern documented: use existing `globals.css` color tokens (e.g., `--bg-elevated` for dialog background, `--border-default` for borders).
- Auth (feature spec `03-auth.md`) done. Clerk env vars were already in `.env.local` — no rename needed.
- Project dialogs (feature spec `04-project-dialogs.md`) done.
  - Key design: central `useProjectDialogs` hook manages all dialog/form/loading state in one place; `ProjectDialogContext` lets the editor home page trigger the create dialog without prop drilling through the layout.
  - Slug preview in Create dialog uses `toSlug()` helper that lowercases, replaces non-alphanumeric chars with hyphens, and collapses consecutive hyphens.
  - Sidebar project items show action buttons on hover (Pencil for rename, Trash2 for delete) — only for owned projects.
  - All three dialogs use `showCloseButton={false}` and provide Cancel/action buttons in a footer row, per the spec.
  - Mock submit handlers simulate a 500ms delay with `isLoading` state to demonstrate loading behavior.
- Next up: follow the project roadmap for the next feature.
