# Progress Tracker

Update this file after every meaningful implementation
change.

## Current Phase

- ✅ Design system — complete
- ✅ Editor chrome (Navbar + Sidebar) — complete

## Current Goal

- Implement editor base chrome components (Navbar + Sidebar per `02-editor.md`)

## Completed

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

## In Progress

- Editor chrome components built and verified.

## Next Up

- [First editor feature — per project roadmap]

## Open Questions

- None.

## Architecture Decisions

- **Dark-only theme:** The project is dark-only as specified in `ui-context.md`. All CSS variables are set in `:root` and the `.dark` block is a passthrough. The `dark` class is hardcoded on `<html>`.
- **Token mapping:** Custom project tokens (e.g., `--bg-base`, `--text-primary`) are defined as raw CSS vars and mapped to Tailwind utility names via `@theme inline` (e.g., `--color-bg-base: var(--bg-base)`). Shadcn semantic tokens reference the same custom vars (e.g., `--background: var(--bg-base)`).

## Session Notes

- Design system implementation (feature spec `01-design-system.md`) is done.
- All 7 shadcn components are in `components/ui/` and must not be manually edited.
- Components use `@base-ui/react` primitives (shadcn base-nova style).
- Editor chrome (feature spec `02-editor.md`) implemented:
  - `components/editor/editor-navbar.tsx` — fixed-top navbar with sidebar toggle (PanelLeftOpen/PanelLeftClose), left/center/right sections, dark background with bottom border.
  - `components/editor/project-sidebar.tsx` — floating sidebar that slides in from left, backdrop overlay, Projects header with close button, shadcn Tabs (My Projects / Shared) with empty placeholder states, and full-width New Project button with Plus icon.
  - Both components compile without TypeScript errors; production build succeeds.
  - Dialog pattern documented: use existing `globals.css` color tokens (e.g., `--bg-elevated` for dialog background, `--border-default` for borders).
- Next up: follow the project roadmap for the next feature.
