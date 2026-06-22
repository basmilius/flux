# Ecosystem: sibling packages

Flux ships as a small family of packages under the `@flux-ui` scope. This skill is
primarily about **`@flux-ui/components`**, but real apps compose the application
shell and data visualisations from two siblings. Install and import them separately
(not re-exported from `@flux-ui/components`), and **add each one's
`@basmilius/vite-preset` plugin** (`fluxApplication()` / `fluxStatistics()`) or it
loads from dist unstyled — see `references/conventions.md`.

## `@flux-ui/application` — the app shell

Provides the outer chrome of a Flux application (top bar, side menu, content
regions). A typical app uses `FluxApplication` as the root inside `FluxRoot`,
fills the `#menu` slot, and renders pages into `FluxApplicationContent`.

| Export | Purpose |
| ------ | ------- |
| `FluxApplication` | Root shell; has a `#menu` slot |
| `FluxApplicationTop` | Top bar |
| `FluxApplicationSide` | Side region |
| `FluxApplicationContent` | Page content region (e.g. `layout="narrow"`) |
| `FluxApplicationSection` | A section within the content |
| `FluxApplicationHero` | Hero region |
| `FluxApplicationMenu` | The application menu |
| `FluxApplicationMenuAccount` | Account block in the menu |
| `FluxApplicationMenuContext` | Context switcher |
| `FluxApplicationMenuContextStack` | Stacked context items |
| `FluxApplicationMenuPromo` | Promo block in the menu |
| `FluxApplicationMenuToggle` | Menu open/close toggle |

Composables & data: `useApplicationInjection`, `useApplicationMenu`,
`useApplicationContextMenu`, `useApplicationContextRegistration`, plus the
provide/inject key `FluxApplicationInjectionKey` and types
`FluxApplicationInjection`, `FluxApplicationContextInfo`, `FluxApplicationLayout`.

**Composition (verified against a production app):**

- **`FluxApplication`** is the shell root (inside `FluxRoot`); fill its `#menu`
  slot with a `FluxApplicationMenu`.
- **`FluxApplicationTop`** — top bar. Props `icon`, `title`; slots `#end`
  (right-aligned actions: search, notifications, profile) and `#tabs` (a named
  `<RouterView>` for page-level tabs). ⚠ It renders the tab-bar **row whenever the
  `#tabs` slot is *provided*** (`slots.tabs` truthy) — a `<RouterView name="tabs">`
  that renders nothing still counts, so an unconditional `#tabs` adds an empty tab
  row to *every* page and shrinks the title row. Provide it **conditionally**:
  `<template v-if="routeHasTabs" #tabs>` (compute `routeHasTabs` from
  `route.matched.some(r => r.components?.tabs != null)`).
- **`FluxApplicationMenu`** — the sidebar. Slots `#logo`, `#header` (account +
  context, often a `FluxApplicationMenuAccount`), `#footer` (settings/admin at
  the bottom), `#context` (`FluxApplicationMenuContextStack`). The nav items
  themselves are plain `@flux-ui/components` `FluxMenuGroup` › `FluxMenuItem`
  (`icon-leading`, `is-active`, `label`, `:to`, `type="route"`), groups split by
  `FluxDivider`.
- **`FluxApplicationContent`** — the page wrapper; `layout` is one of
  `default | dashboard | full | medium | narrow` (`FluxApplicationLayout`). Use
  `layout="dashboard"` for dashboards, `layout="narrow"` for forms/settings.
- **`FluxApplicationSection`** — a section inside the content; props `title`,
  `info`.
- **`FluxApplicationSide`** renders into `FluxApplication`'s `#side` slot (a right
  rail), but is **still in development — avoid it for now.**

**Peer deps:** `@flux-ui/application` requires **`luxon`** and **`vue-router`**
(install both; see `references/conventions.md`).

## `@flux-ui/statistics` — KPIs, charts & meters

Data-visualisation components: a grid system, KPI cards, a chart pane wrapper,
and a wide set of chart types (the charts wrap **ECharts**).

**Peer deps (required — charts won't install/run without them):** `echarts`,
`lodash-es`, and **`vue-i18n`** (must be registered on the app or charts throw at
runtime; use `globalInjection: false` — see `references/conventions.md`).

**Containers & summaries:** `FluxStatisticsGrid`, `FluxStatisticsChartPane`,
`FluxStatisticsKpi`, `FluxStatisticsMetric`, `FluxStatisticsChange`,
`FluxStatisticsComparison`, `FluxStatisticsMeter`, `FluxStatisticsPercentageBar`,
`FluxStatisticsRadialBar`, `FluxStatisticsSparkline`, `FluxStatisticsEmpty`.

**Legend:** `FluxStatisticsLegend`, `FluxStatisticsLegendItem`,
`FluxStatisticsLegendScope`.

**Details table:** `FluxStatisticsDetailsTable`, `FluxStatisticsDetailsTableRow`.

**Charts:** `FluxStatisticsChart` (generic) plus `FluxStatisticsAreaChart`,
`FluxStatisticsBarChart`, `FluxStatisticsBoxPlotChart`, `FluxStatisticsBubbleChart`,
`FluxStatisticsCandlestickChart`, `FluxStatisticsDonutChart`,
`FluxStatisticsHeatmapChart`, `FluxStatisticsLineChart`, `FluxStatisticsMixedChart`,
`FluxStatisticsPieChart`, `FluxStatisticsPolarAreaChart`, `FluxStatisticsRadarChart`,
`FluxStatisticsScatterChart`, `FluxStatisticsTreemapChart`. Low-level base:
`FluxStatisticsBase`. Color helper/type: `FluxStatisticsChartColor`.

A KPI dashboard typically nests KPIs and charts inside a `FluxStatisticsGrid`,
with each chart wrapped in a `FluxStatisticsChartPane`. Verified props:

- **`FluxStatisticsGrid`** — responsive column counts per breakpoint: `xs`, `sm`,
  `md`, `lg`, `xl` (numbers), plus `gap`. E.g. `<FluxStatisticsGrid :sm="2"
  :md="3" :xl="5">`.
- **`FluxStatisticsKpi`** — `title` (required), `value` (string/number, required),
  `icon`, optional `change` (`FluxStatisticsChange`) and `footer`.
- **`FluxStatisticsChartPane`** — `title`, `icon`, `aspect-ratio`; an `#info`
  slot for an explanatory note; put a chart component inside it.

**Chart prop traps (build-verified):** most charts take `:series`, but two don't —
**`FluxStatisticsTreemapChart` takes `:nodes`** (`FluxStatisticsChartTreemapNode[]`)
and **`FluxStatisticsPolarAreaChart` (like the pie/donut) takes `:slices`**. Series
colors accept a `FluxStatisticsChartColor` (`FluxColor | #hex | var(--token)`), but
**`FluxStatisticsLegendItem`'s `color` is only `FluxColor | #hex`** — a
`var(--…)` value is a type error there, so pass a token (`color="primary"`) or hex.
A custom legend goes in the `FluxStatisticsChartPane` **`#legend`** slot (wrap items
in `FluxStatisticsLegendScope`); the auto legend is just `<FluxStatisticsLegend/>`
in that slot.

See `references/patterns.md` §6 for the full dashboard skeleton.

## Other `@flux-ui` packages

- **`@flux-ui/types`** — the shared TypeScript surface (`FluxIconName`,
  `FluxColor`, `FluxTo`, the `*Object`/`*Injection` types, …). Type aliases are
  **not** re-exported by `@flux-ui/components` (importing one from there is a type
  error) — import them from `@flux-ui/types`. See `references/conventions.md` ›
  TypeScript.
- **`@flux-ui/internals`** — internal building blocks shared across packages; not
  intended for direct application use.
- **`@basmilius/vite-preset`** — the build-time `preset()` + `flux()` Vite
  plugins (see `references/conventions.md`).
