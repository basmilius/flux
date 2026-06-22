---
name: flux-ui
description: >-
  Use when building, editing, or reviewing Vue 3 UI with Flux (by Bas Milius) —
  the @flux-ui/components library (docs at flux-ui.dev) and its siblings
  @flux-ui/application (app shell / dashboards) and @flux-ui/statistics
  (KPIs/charts). Trigger on Flux-prefixed components (FluxPrimaryButton,
  FluxFormField, FluxPane), on FluxRoot / showConfirm / showSnackbar / showPrompt
  / showAlert, on its composables (useBreakpoints, useFluxStore, use*Injection),
  or any import from @flux-ui/*. Use it to pick the right component, get imports
  and composition right, and avoid the naming traps. This is the Vue 3 Flux
  (basmilius), NOT the Livewire/Blade Flux from fluxui.dev and NOT the Flux
  web-components library — never mix their syntaxes.
license: MIT (skill content); Flux itself is MIT, by Bas Milius
---

# Flux UI (Vue 3)

Flux is an opinionated **Vue 3** component library by Bas Milius — **named
exports** from `@flux-ui/components` (SFCs, `<script lang="ts" setup>`), with docs
and the full per-component API at **flux-ui.dev**. Real apps also use the siblings
**`@flux-ui/application`** (app shell) and **`@flux-ui/statistics`** (KPIs/charts)
— see `references/ecosystem.md`.

**Versioning:** install the Flux packages and `@basmilius/vite-preset` with the
**`@latest`** dist-tag, *not* a guessed caret range (a caret won't match the
`-next` prerelease — see `references/conventions.md`). flux-ui.dev is the source of
truth for exact props; export names are in `references/component-index.md`. This
skill encodes the durable judgment and defers prop/emit/slot tables to the docs.

## 1. Disambiguation — read first

"Flux UI" is an overloaded name. This skill is ONLY about:

- **basmilius/flux** — Vue 3, npm `@flux-ui/components`, docs at flux-ui.dev.

Do NOT apply this skill (and do NOT mix syntax) for:

- **livewire/flux** (fluxui.dev) — a Laravel/Livewire/Blade kit using
  `flux:button` style tags. Completely different project.
- The **Flux web-components** library (`j-flex`, `j-box`, …). Different again.

If you ever emit a Blade tag like `flux:button` or a `j-` web-component for a
Vue Flux task, you have mixed libraries — stop and use the `Flux`-prefixed Vue
component instead.

## 2. Setup essentials

- **Install:** `@flux-ui/components` needs **two peer pieces**:
  `bun add @flux-ui/components sass-embedded @basmilius/vite-preset` (any package
  manager works). Flux is SCSS-based, hence `sass-embedded`.
- **Vite config:** add `preset()` **plus one plugin per Flux package** from
  `@basmilius/vite-preset` — `flux()` (components), `fluxApplication()`,
  `fluxStatistics()`. Omitting a package's plugin makes it resolve to dist with
  unimported CSS → **unstyled shell/charts**. 
  ```ts
  import { flux, fluxApplication, fluxStatistics, preset } from '@basmilius/vite-preset';
  export default defineConfig({ plugins: [vue(), preset(), flux(), fluxApplication(), fluxStatistics()] });
  ```
- **Stylesheet:** import the global styles once (under the preset, the SCSS
  entry): `import '@flux-ui/components/css/index.scss';`.
- **Peer deps** (not bundled): Flux 3.x needs **Vue 3.6 beta** —
  `vue@^3.6.0-beta.13`, **not `vue@latest`** (3.5.x fails the peer). Plus `luxon`
  (components), `vue-router` (application), and `echarts` + `lodash-es` +
  `vue-i18n` (statistics — register it with **`globalInjection: false`** or the UI
  shows raw `flux.*` keys / charts throw). Full matrix: `references/conventions.md`.
- **Provider:** mount a single `FluxRoot` as the app's main wrapper. It renders
  the overlay/snackbar/tooltip providers internally, so `showAlert/showConfirm/
  showPrompt/showSnackbar`, `FluxOverlay`, and `FluxTooltip` all need it.
  The `show*` functions throw if no `FluxRoot` is mounted.
- **Icons:** **Font Awesome**, registered once via `fluxRegisterIcons(...)`, then
  referenced by **name string** (`icon-leading="circle-check"`, `FluxIconName`).
  Works with Free **or** Pro — **ask which tier** before adding the dep (Pro needs
  a paid token; default Free). Also register each component's **"Required icons"**
  from its doc page (internal sort/pagination/checkmark icons) or they render
  blank. Depth: §6 + `references/conventions.md`.
- **Routing:** Vue Router integration is opt-in. Components that link use
  `type="route"` + `:to` (type `FluxTo`). There's a dedicated **Nuxt** install
  page too.
- **Styling/theming:** dark mode, colors and typography are CSS custom
  properties (design tokens on `:root`), not utility classes.

Full setup detail and the token reference: `references/conventions.md`.

## 3. The naming rule (most common trap)

Component names are PascalCase with a `Flux` prefix. **Most** names are just the
doc path PascalCased and concatenated — but several groups break the pattern.
Guessing these is the single most common mistake. The authoritative export list
is `references/component-index.md`; the traps:

| Doc path                | Export                  | Trap                          |
| ----------------------- | ----------------------- | ----------------------------- |
| `form/field`            | `FluxFormField`         | path PascalCased (typical)    |
| `pane/body`             | `FluxPaneBody`          | typical                       |
| `button/primary`        | `FluxPrimaryButton`     | **variant moves to front**    |
| `button/secondary`      | `FluxSecondaryButton`   | **variant moves to front**    |
| `pane/clickable`        | `FluxClickablePane`     | **variant moves to front**    |
| `layout/flex`           | `FluxFlex`              | **`Layout` segment dropped**  |
| `layout/container`      | `FluxContainer`         | **`Layout` segment dropped**  |
| `form/toggle`           | `FluxToggle`            | **`Form` dropped**            |
| `form/quantity-selector`| `FluxQuantitySelector`  | **`Form` dropped**            |
| `form/slider/ranged`    | `FluxFormRangeSlider`   | **reordered, not `…Ranged`**  |
| `form/date`             | `FluxFormDateInput`     | **`Input` suffix added**      |
| `filter/async-option`   | `FluxFilterOptionAsync` | **`Async` is a suffix**       |
| `layout/flex/button`    | `FluxButtonStack`       | **flex helper → `…Stack`**    |

Rule of thumb: prefer `references/component-index.md` over deriving a name. If
you must derive, PascalCase the path — but treat anything under `button/*`,
`form/*` (controls), `layout/*`, `pane/*` and `filter/*` as suspect and look it
up. The base button is `FluxButton`; grouping wrappers have their own names
(`FluxButtonStack`, `FluxFormRadioGroup`, `FluxCommandPaletteGroup`, …).

## 4. Choosing a component (selection map)

Match the user's need to a component; the **complete list with doc URLs** is
`references/component-index.md` (open it to confirm an exact name). Quick routing:

- **Buttons** → `FluxPrimaryButton` / `FluxSecondaryButton` /
  `FluxDestructiveButton`, `FluxSplitButton` (action+menu), `FluxButtonStack`
  (row). Not bare `FluxButton` (see component-index). Plain link → `FluxLink`.
- **Forms** → wrap each control in `FluxFormField` inside a `FluxForm`. Note the
  trap names: on/off is `FluxToggle`, stepper is `FluxQuantitySelector`, range is
  `FluxFormRangeSlider`, dates are `FluxFormDateInput` etc. Full control list +
  composition: `references/forms.md`.
- **Dialogs & feedback** → short & code-driven → `showConfirm` / `showPrompt` /
  `showAlert` / `showSnackbar`; rich or deep-linkable → `FluxOverlay` /
  `FluxSlideOver` via route; inline → `FluxNotice` / `FluxBadge` / `FluxTooltip`.
  `references/dialogs-and-feedback.md`.
- **Layout** → `FluxFlex`/`FluxGrid`, `FluxContainer`, `FluxPane` (the card
  surface), `FluxSplitView`. `references/layout.md`.
- **Data & navigation** → `FluxDataTable` or `FluxTable` primitives (+ filters),
  `FluxKanban`, `FluxTreeView`, `FluxCalendar`; `FluxMenu`, `FluxTabs`/`FluxTabBar`,
  `FluxStepper`, `FluxCommandPalette`, `FluxSegmentedControl`.
  `references/data-and-navigation.md`.
- **Dashboard / multi-page app** → use the **`@flux-ui/application`** shell
  (`FluxApplication` + `FluxApplicationMenu` + `FluxApplicationTop`,
  `FluxApplicationContent`), with **`@flux-ui/statistics`** for KPIs/charts — not
  hand-rolled layout. `references/patterns.md` §6, `references/ecosystem.md`.
- **Typography / text** → `FluxText` (Flux type scale: size/weight/color, tabular
  figures, truncate) instead of raw HTML + custom CSS. Detail on its doc page.
- **Composables** → `useBreakpoints` (responsive), `useFluxStore` (global store),
  `use*Injection` (custom controls). `references/composables.md`.

## 5. Composition cheatsheet

Getting the wrapper nesting right matters more than props. Full, copy-ready
skeletons (app shell, CRUD form, data-table + filters, dashboard, dialogs) live
in `references/patterns.md`. The nesting rules:

- **Form:** `FluxForm` › `FluxPaneBody` › `FluxFormField` (label/hint/error) ›
  control; submit is a `FluxPrimaryButton is-submit`. Extra messages go through
  the field's `#addition` slot (one `FluxFormFieldAddition` each:
  `icon`, `mode="hint" | "error"`, `:message`).
- **Pane (card):** `FluxPane` › `FluxPaneHeader` / `FluxPaneBody` / `FluxPaneFooter`.
- **Flex:** `FluxFlex` (`direction`, `:gap` in **px**) wrapping children or
  `FluxFlexItem`.
- **Programmatic dialog** (needs `FluxRoot` mounted): `showConfirm` returns a
  boolean — `if (await showConfirm({...})) { … showSnackbar({...}) }`. See
  `references/dialogs-and-feedback.md`.
- **Overlay / slide-over (`v-if`):** put the `v-if` on the **pane inside**
  `FluxOverlay`/`FluxSlideOver`, never on the surface itself (keep `@close` there)
  — otherwise it unmounts instantly and skips its leave transition. Details:
  `references/dialogs-and-feedback.md`.
- **Dashboard / multi-page app:** use the `@flux-ui/application` shell — §4 and
  `references/patterns.md` §6.

## 6. Conventions quick reference

- **Icons** are **registered** Font Awesome names: `fluxRegisterIcons(icons)`
  once, then a kebab name string (`icon-leading="circle-check"`, `FluxIconName`);
  unregistered = blank. Also register each component's **Required icons** from its
  doc page (internal sort/pagination icons). **Trap:** `FluxIcon`/`FluxBoxedIcon`
  take the icon via **`name`**, not `icon`.
- **`gap`/spacing** = a **number in pixels** (`:gap="9"`), not a token index.
  Theme **design tokens** are CSS custom properties (`--primary-500`, …), not prop
  values.
- **Colors** = `FluxColor` token names: `gray | primary | danger | info |
  success | warning` (destructive = `color="danger"`).
- **`v-model`** binds normally; the model type is per control.
- **Types:** import type aliases (`FluxIconName`, `FluxColor`, `FluxTo`, …) from
  **`@flux-ui/types`** — they're NOT re-exported by `@flux-ui/components` (type
  error). Components/functions/composables come from `@flux-ui/components`.
- **Content: prop vs slot varies** — don't assume a `message`/`title`/`label`
  prop. Chips use `label`; `FluxTooltip` uses `content`; `FluxNotice`/
  `FluxPlaceholder` take prop *or* slot; `FluxInfo`/`FluxItemContent` render
  **only** their default slot (`<FluxInfo>text</FluxInfo>`).
- **Dark mode** is built in — don't hand-roll dark variants.

Depth for all of the above: `references/conventions.md`.

## 7. When you need exact props

For any component whose precise props/emits/slots you are unsure of, **open its
doc page** (every URL is in `references/component-index.md`). Each page has a
consistent `Props` / `Emits` / `Slots` / `Examples` layout and a working code
sample showing the exact import. Because the library still evolves and you should
work against the latest version, prefer this over assuming a prop exists.

## Reference files

- `references/component-index.md` — the complete, **build-verified** list of
  every component & transition with doc URLs and the naming traps. Start here.
- `references/conventions.md` — install, Vite preset, FluxRoot, Font Awesome
  registration, routing/Nuxt, design tokens, colors, dark mode, types.
- `references/forms.md` — the form group, the Field composition, controls, the
  CRUD-form pattern.
- `references/dialogs-and-feedback.md` — overlay vs programmatic, the
  show* functions and their real return types, notices/inline feedback.
- `references/layout.md` — flex, grid, container, pane, split-view, spacing.
- `references/data-and-navigation.md` — tables, pagination, kanban, tree view,
  timeline; menus, tabs, stepper, breadcrumb, command palette, toolbar.
- `references/composables.md` — all composables, useFluxStore, helpers, types,
  and the documented patterns.
- `references/patterns.md` — **idiomatic end-to-end skeletons** distilled from a
  production Flux app: app shell, CRUD form, data-table + filters, the
  confirm→act→snackbar loop, pane composition, and the dashboard (shell + top bar
  + context menus + statistics).
- `references/ecosystem.md` — the sibling packages `@flux-ui/application`
  (app shell) and `@flux-ui/statistics` (KPIs/charts), with their export surface.
