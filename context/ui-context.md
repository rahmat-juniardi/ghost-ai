# UI Context

## Theme

Dark only. No light mode. The design language is a dark technical
workspace — near-black backgrounds, layered surfaces,
and vivid accent colors for interactive elements.


## Colors
All colors are defines as CSS Custom properties in `globals.css` and mapped to Tailwind tokens via `@theme inline`. Components mus use these tokens - no hardcoded hex value or raw Tailwinds color classes like `zinc-*`.

| Role | CSS Variable | Hex / Value |
| :--- | :--- | :--- |
| Page background | `--bg-base` | `#080809` |
| Surface | `--bg-surface` | `#111114` |
| Elevated surface | `--bg-elevated` | `#18181c` |
| Subtle surface | `--bg-subtle` | `#1e1e23` |
| Default border | `--border-default` | `#2a2a30` |
| Subtle border | `--border-subtle` | `#3a3a42` |
| Primary text | `--text-primary` | `#f0f0f4` |
| Secondary text | `--text-secondary` | `#c0c0cc` |
| Muted text | `--text-muted` | `#808090` |
| Faint text | `--text-faint` | `#505060` |
| Brand accent | `--accent-primary` | `#00c8d4` (cyan) |
| Brand dim | `--accent-primary-dim` | `rgba(0, 200, 212, 0.12)` |
| AI accent | `--accent-ai` | `#6457f9` (indigo-purple) |
| AI text | `--accent-ai-text` | `#8b82ff` |
| Error | `--state-error` | `#ff4d4f` |
| Success | `--state-success` | `#34d399` |
| Warning | `--state-warning` | `#fbbf24` |

Tailwind utility names map to these variables. Use `bg-base`, `bg-surface`, `text-copy-primary`, `text-copy-muted`, `border-surface-border`, `text-brand`, `bg-accent-dim`, etc.


## Typography

| Role      | Font              | Variable      |
| --------- | ----------------- | ------------- |
| UI text   | Geist Sans | `--font-sans` |
| Code/mono | Geist Mono | `--font-mono` |

Both fonts are loaded via `next/font/google` and applied as CSS variables on the `<html>` element. The base `body` uses Geist Sans with `antialiased`

## Border Radius

Radius increases with surface depth - smaller for inner elements, larger for outer containers.

| Context           | Class            |
| ----------------- | ---------------- |
| Inline / small UI | `rounded-xl` |
| Cards / panels    | `rounded-2xl` |
| Modals / overlays | `rounded-3xl` |

## Component Library

`shadcn/ui` on top of Tailwind. Components live
in `components/ui/`. Use the CLI to add new components
rather than writing from scratch.

### Icons
* Use the `lucide-react` library for consistent iconography.
* Icons should generally be size `16` (`size={16}`) when used within buttons or list items.
* Use `strokeWidth={2}` for a balanced visual weight.

### Typography
* **Primary font:** Inter (or system sans-serif).
* **Headings:** Use `font-semibold` or `font-bold` with tight tracking (`tracking-tight`).
* **Body text:** Use `text-sm` for most UI elements and `text-base` for long-form content.
* **Monospace:** Use a mono font for code snippets or technical IDs.

## Layout Patterns

- Editor: full-viewport split with
  left sidebar, center canvas, right sidebar
- Sidebars: fixed width with border separator
- Modals: centered overlay with backdrop blur
- Navbar: top bar with bottom border


