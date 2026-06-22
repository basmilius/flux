# Pulse

**Pulse** is a demo single-page application for a **product & web analytics**
platform. It is a second reference app for **Flux UI** (alongside Nimbus),
focused on data visualisation — it leans hard on **`@flux-ui/statistics`** while
exercising the app shell and component library together.

- **`@flux-ui/application`** — the app shell (side menu, top bar, content
  layouts).
- **`@flux-ui/components`** — data table with filters, tree view, slide-over,
  command palette, flyouts, panes, badges, forms, tabs, timeline and more.
- **`@flux-ui/statistics`** — KPIs, metrics, comparisons, meters, percentage &
  radial bars, sparklines, detail tables and the full chart set (area, line,
  bar, mixed, donut, pie, polar-area, radar, treemap, heatmap, scatter, bubble,
  box-plot).
- **`@flux-ui/internals`** / **`@flux-ui/types`** — shared composables and the
  public type surface.

Everything is **in-memory**. There is no backend: data is generated with
`@faker-js/faker` from a fixed seed, so the app is fully reproducible and a
reload (or _Reset demo data_) restores the initial state. The realtime view is
driven by a small client-side ticker.

## Running

From the monorepo root (install once):

```bash
bun install
```

Then, from the root:

```bash
bun run --cwd packages/pulse dev      # dev server on http://localhost:5176
bun run --cwd packages/pulse build    # type-check (vue-tsc) + production build
bun run --cwd packages/pulse check    # type-check only
bun run --cwd packages/pulse preview  # preview the production build
```

> Uses **bun** (never npm/pnpm) and requires **Node ≥ 23**. FontAwesome Pro icons
> need `FONTAWESOME_NPM_AUTH_TOKEN` set (see the repo root `.npmrc`).

## What's inside

| Area | Highlights |
| ---- | ---------- |
| **Overview** | Six KPIs with period-over-period deltas, visitors/sessions area chart, channel donut, trend sparklines, top pages & channels, country percentage bar |
| **Realtime** | Live active users, per-minute pageviews bar, live event `FluxTimeline`, active pages / sources / countries — all ticking every couple of seconds |
| **Audience** | New vs returning, demographics (age bar, gender polar-area), technology (device donut, browser percentage bar, OS & language detail tables), engagement radar, session-duration box-plot, weekday × hour heatmap |
| **Acquisition** | Channel comparisons & paid-share meter, sessions-by-channel area, top referrers, a filterable **campaigns `FluxDataTable`** (status & medium filters, ROAS), spend-vs-revenue bubble chart, source treemap |
| **Behavior** | Filterable **top-pages `FluxDataTable`**, site-structure `FluxTreeView`, top events bar, time-on-page scatter, scroll-depth radial, entry/exit percentage bars, deep page detail in a `FluxSlideOver` |
| **Conversions** | KPI row, a custom **conversion funnel**, conversion-rate line, attribution pie, revenue area, conversions-by-channel bar, goal cards with `FluxProgressBar` |
| **Explorer** | Full-height **events-log `FluxDataTable`** with multi-select, single-select and async filters plus search and pagination |
| **Settings** | `FluxTabs` (profile, property, data sources, alerts, appearance) with forms, toggles, sliders, dark-mode and reset-data |
| **Global** | ⌘K `FluxCommandPalette`, alerts flyout, profile menu with property/theme drill-in, a global **period selector** (7 / 28 / 90 days) and dark mode |

## Architecture

```
src/
  app/          # router, icons, vue-i18n (statistics only), flux plugin
  assets/css/   # font families + a distinct indigo primary accent
  component/    # shell (menu, period selector, command palette, alerts, profile, export)
  composable/   # defineTitle (top-bar icon/title per page)
  data/seed.ts  # faker-seeded analytics data set (faker.seed for reproducibility)
  store/        # in-memory reactive stores (analytics, realtime, ui) + resetData()
  view/         # one folder per route (Page.vue / Top.vue)
  types.ts      # the data model
  util/         # number/duration/rate formatters + channel/device/event metadata
```

- **Stores** are plain composables over a single `reactive` `db` object
  (`store/state.ts`); no Pinia. `useAnalyticsStore` slices the 180-day metric
  series to the selected period (7 / 28 / 90 days) and derives totals, deltas and
  chart series; `useRealtimeStore` owns the live ticker.
- **Period** is global — the top-bar `PeriodSelector` writes the UI store and
  every time-bound page reacts to it.
- **Shell** — `Root.vue` mounts `FluxRoot`; `view/Layout.vue` is the
  `FluxApplication` shell with the side menu, top bar (page title via
  `defineTitle`, a named `top` router-view for page actions, command palette,
  alerts and profile).
- **Dark mode** toggles the `dark` attribute on `<html>`; the primary ramp is
  re-tinted to indigo in `assets/css`.

This project is intentionally not published; it exists to dogfood and showcase
Flux UI.
