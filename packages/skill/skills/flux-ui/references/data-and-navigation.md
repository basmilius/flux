# Data display & navigation

Exact props for everything here live on the component doc pages
(`references/component-index.md` has the URLs). This file covers *which*
component and *how the pieces fit*.

## Tables

Two levels of abstraction — pick deliberately:

- **`FluxDataTable`** — the higher-level, batteries-included table. Reach for
  this first for typical list views with sorting, selection, etc.
- **`FluxTable` primitives** — `FluxTableHeader`, `FluxTableRow`, `FluxTableCell`,
  `FluxTableActions`, `FluxTableBar`. Compose these for a **small, static** table
  (no pagination), e.g. a "recent items" panel. Unlike `FluxDataTable` (named
  per-column cell slots), the primitive uses an explicit `#header` (a
  `FluxTableRow` of `FluxTableHeader`s) and one `FluxTableRow` › `FluxTableCell`
  per row. Custom cells/rows read the table context via `useTableInjection`.
  **Place a `FluxTable` inside a `FluxPane`** — its cell edge-padding only applies
  within a pane structure; a titled block is `FluxLayerPane` › `FluxPaneHeader` +
  `FluxPane` › `FluxTable` (set `:is-bordered="false"` to drop the inner cell
  borders). A bare `FluxTable` directly in a `FluxLayerPane` loses its edge padding.

Pattern: a worked **filterable data table** lives at
`https://flux-ui.dev/guide/patterns/filterable-data-table` — read it when
combining a table with `Flux Filter*` components and pagination. For the
data-driven `FluxDataTable` shape (`:items` + per-column scoped slots, sticky
headers, row actions) see `references/patterns.md` §3.

## Pagination

`FluxPagination` (+ `FluxPaginationBar`) for page navigation under a table/list.

## Other data structures

- **Kanban**: `FluxKanban` › `FluxKanbanColumn` › `FluxKanbanItem`
  (`useKanbanInjection` for custom pieces).
- **Tree view**: `FluxTreeView` (and the form control `FluxFormTreeViewSelect`).
- **Timeline**: `FluxTimeline` › `FluxTimelineItem`.
- **Calendar**: `FluxCalendar` › `FluxCalendarItem` (`useCalendarInjection`);
  standalone `FluxDatePicker`.
- **List items**: `FluxItem` with `FluxItemContent`, `FluxItemMedia`,
  `FluxItemActions`, `FluxItemStack`; `FluxComment`, `FluxPersona`, `FluxAvatar`
  for people/content rows.
- **Gallery**: `FluxGallery` › `FluxGalleryItem`.

## Filtering

`FluxFilterBar` hosts filter controls inside a `FluxFilter`: `FluxFilterOption`,
`FluxFilterOptions`, `FluxFilterOptionAsync` ⚠, `FluxFilterOptionsAsync` ⚠,
`FluxFilterDate`, `FluxFilterDateRange`, `FluxFilterRange`. (`FluxFilter` is the
standalone version — `v-model` a `FluxFilterState` + the same controls in its
default slot — for filtering a non-table list without the bar.) Custom filter
controls read context via `useFilterInjection`; build reusable filters with
`defineFilter` (or the `defineFilterMacro` compile macro from
`@flux-ui/components/vite`).

Each control takes `name` / `label` / `icon`; **`FluxFilterRange` additionally
requires `min` and `max`** (+ optional `:formatter`), and `FluxFilterOption(s)`
take `:options` (`FluxFilterOptionItem[]`, `{ label, value, icon? }`) while the
async variants take `:fetch-options` / `:fetch-relevant` / `:fetch-search`
(returning `FluxFilterOptionRow[]`). The value each writes into the `v-model`
state (keyed by `name`) differs by type: **single option → a scalar; multi
`Options` → an array; `Date` → a `DateTime`; `DateRange` / `Range` → a 2-tuple** —
guard with `Array.isArray` when you apply them. Worked **filterable data-table** skeleton (the
`#filter` slot, `v-model` filter state, option/async/date filters):
`references/patterns.md` §3.

## Navigation

- **Breadcrumb**: `FluxBreadcrumb` › `FluxBreadcrumbItem`.
- **Menus**: `FluxMenu` with `FluxMenuItem`, `FluxMenuGroup`, `FluxMenuOptions`,
  `FluxMenuCollapsible`, `FluxMenuTitle`, `FluxMenuSubHeader`. Good for sidebars
  and dropdown menus. **Always wrap `FluxMenuItem`s in a `FluxMenuGroup`** — the
  group provides the correct grouping/spacing; bare items (incl. in an
  application *context* menu after `FluxApplicationMenuContext`) sit too far apart.
- **Tabs**: `FluxTabs` › `FluxTab` (in-page tabbed content);
  `FluxTabBar` › `FluxTabBarItem` (top-level/bar-style nav, `useTabBarInjection`).
- **Stepper / wizard**: `FluxStepper` › `FluxStepperSteps` › `FluxStepperStep`.
  Pattern: `https://flux-ui.dev/guide/patterns/stepper-wizard`.
- **Command palette**: `FluxCommandPalette` for ⌘K-style global search/actions.
  It is **`:sources`-driven and has no default slot** — feed it a
  `FluxCommandSource[]` (each source: `key`, `label`, optional `tab`, and `items`
  with `{ id, label, subLabel?, icon?, onActivate }`). `FluxCommandPaletteGroup` /
  `FluxCommandPaletteItem` are the internal building blocks it renders from that
  data, **not** components you place yourself.
- **Toolbar**: `FluxToolbar` › `FluxToolbarGroup`.
- **Segmented control**: `FluxSegmentedControl` › `FluxSegmentedControlItem` for
  a small set of mutually exclusive options (`useSegmentedControlInjection`).
- **Links**: `FluxLink` for inline navigation; button `type="route"`/`"link"`
  for button-styled navigation (see `references/conventions.md`).

## Expand / collapse

`FluxExpandable` (+ `FluxExpandableGroup` for accordion behaviour). Custom
triggers read state via `useExpandableGroupInjection`.
