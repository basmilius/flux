# Nimbus

**Nimbus** is a demo single-page application for a creative & development agency.
It is the reference app for **Flux UI** — it exercises every Flux package together
in a realistic, cohesive product:

- **`@flux-ui/application`** — the app shell (side menu, top bar, content layouts,
  nested context menus).
- **`@flux-ui/components`** — tables, kanban, calendar, tree view, stepper,
  command palette, slide-over, tour, forms, panes, badges, and more.
- **`@flux-ui/statistics`** — KPIs, area/bar/donut/radar charts, meters,
  comparisons, percentage bars and detail tables.
- **`@flux-ui/internals`** / **`@flux-ui/types`** — shared composables and the
  public type surface.

Everything is **in-memory**. There is no backend: data is generated with
`@faker-js/faker` from a fixed seed, so the app is fully reproducible and a reload
(or _Reset demo data_) restores the initial state.

It deliberately exercises **the entire Flux component surface** — every
component that's meaningful to use in a real app appears somewhere. The only
exports it doesn't render directly are internal building blocks (base
`FluxButton`/`FluxPressable`, the `FluxRoot` providers, the auto-applied
transitions, the `:sources`-driven command-palette internals, the statistics base
classes) and `FluxApplicationSide` (still in development).

## Running

From the monorepo root (install once):

```bash
bun install
```

Then, from the root:

```bash
bun run --cwd packages/nimbus dev      # dev server on http://localhost:5175
bun run --cwd packages/nimbus build    # type-check (vue-tsc) + production build
bun run --cwd packages/nimbus check    # type-check only
bun run --cwd packages/nimbus preview   # preview the production build
```

> Uses **bun** (never npm/pnpm) and requires **Node ≥ 23**. FontAwesome Pro icons
> need `FONTAWESOME_NPM_AUTH_TOKEN` set (see the repo root `.npmrc`).

## What's inside

| Area | Highlights |
| ---- | ---------- |
| **Dashboard** | KPIs, revenue area chart, task donut, active projects, upcoming events, activity timeline, goal progress, onboarding **Tour** |
| **Projects** | Filterable `FluxDataTable`; detail with a **nested context menu** (Overview · Board · Files · Calendar · Activity · Settings) |
| **New project** | Deep-linkable **`FluxStepper`** wizard rendered into a `FluxOverlay` via a named router view (`/projects/new`) |
| **Invoice editor** | Full CRUD form (`/invoices/new` + `/:id/edit`) — async select, date inputs, quantity selectors, tags, drop zone |
| **Reports** | Tabbed (Overview / Financial / Team / Pipeline) via the top-bar `#tabs` view; every statistics chart type |
| **Billing** | `FluxApplicationHero` + decorative visuals + plan `FluxPaneGroup` + `FluxPublishButton` |
| **Activity** | Standalone `FluxPagination` feed; the inbox uses a `FluxVirtualScroller` |
| **Board** | `FluxKanban` with draggable task cards |
| **Files** | `FluxTreeView` |
| **Activity** | `FluxComment` thread with a live composer |
| **Clients / Team** | Data table + detail; team card-grid + member profiles with utilisation |
| **Calendar** | Full `FluxCalendar` with draggable, reschedulable events |
| **Timesheets** | Weekly pivot built on `FluxTable` primitives with per-day/-project totals |
| **Invoices** | Filterable table, line-item detail, **mark as paid** (confirm → snackbar) |
| **Pipeline** | Sales `FluxKanban` with deal value totals per stage |
| **Goals** | OKRs with colored `FluxProgressBar`s and editable key results |
| **Inbox** | Read/unread list with a `FluxSlideOver` detail |
| **Reports** | Bar / radar / donut charts, meters, comparisons, percentage & detail tables |
| **Settings** | `FluxTabs` (profile, workspace, notifications, appearance) |
| **Global** | ⌘K `FluxCommandPalette`, notifications flyout, profile menu, dark-mode toggle, reset-data |

## Architecture

```
src/
  app/          # router, icons, vue-i18n (statistics only), flux plugin
  assets/css/   # app-level font + layout overrides
  component/    # shared components (menu, command palette, avatars, tour, …)
  composable/   # defineTitle (top-bar icon/title per page)
  data/seed.ts  # faker-seeded data set (faker.seed for reproducibility)
  store/        # in-memory reactive module stores + resetData()
  view/         # one folder per route (Page.vue / Top.vue / detail/…)
```

- **Stores** are plain composables over a single `reactive` `db` object
  (`store/state.ts`); no Pinia. Cross-entity links (project ↔ client ↔ team ↔
  invoice ↔ deal) are resolved through store getters.
- **Shell** — `Root.vue` mounts `FluxRoot`; `view/Layout.vue` is the
  `FluxApplication` shell with the side menu, top bar (page title via
  `defineTitle`, a named `top` router-view for page actions, command palette,
  notifications and profile) and the onboarding tour.
- **Page titles/actions** live in the top bar — pages set their icon/title with
  `defineTitle` and contribute toolbar buttons through a named `top` router-view.
- **Dark mode** toggles the `dark` attribute on `<html>`.

This project is intentionally not published; it exists to dogfood and showcase
Flux UI.
