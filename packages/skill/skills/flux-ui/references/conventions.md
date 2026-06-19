# Conventions & setup

Durable conventions that apply across all Flux components. For exact, current
detail, the Introduction and API guide pages at flux-ui.dev are authoritative —
work against the **latest** published version (the 3.x line; install via `@latest`).

## Installation

Flux is SCSS-based and ships a companion Vite preset. Install the Flux package
and the preset with the **`@latest`** dist-tag — don't guess a caret range, the
published versions don't follow naive assumptions (`@basmilius/vite-preset` is on
a **3.x** line, not 1.x, and a caret won't match a `-next` prerelease, so guessed
ranges fail to resolve):

```sh
bun add @flux-ui/components@latest sass-embedded @basmilius/vite-preset@latest
```

**Peer dependencies** (the Flux packages don't bundle these — install them or the
build fails / charts throw):

- **`vue`** → Flux 3.x requires **Vue 3.6**, which is currently in **beta**.
  Install `vue@^3.6.0-beta.13` (or newer beta) — **`vue@latest` (3.5.x) does NOT
  satisfy the peer range** and mis-resolves.
- `@flux-ui/components` → **`luxon`** (date handling). TS: add `@types/luxon`.
- `@flux-ui/application` → **`luxon`** and **`vue-router`** (the shell is
  route-driven).
- `@flux-ui/statistics` → **`echarts`**, **`lodash-es`**, and **`vue-i18n`** — and
  `vue-i18n` must be **registered on the app** (`app.use(createI18n({...}))`) or
  the charts throw at runtime. TS: add `@types/lodash-es`.

(Any package manager works — `npm install`, `pnpm install`, `yarn add`.)
Icons come from Font Awesome, which you add **separately** — see the Icons
section below: Flux works with **either Free or Pro**, so decide which before
installing (Pro needs a paid npm auth token; Free does not).

Add `preset()` **plus one plugin per Flux package you use** to your Vite config.
`@basmilius/vite-preset` exports a separate plugin per package — `flux()` for
`@flux-ui/components`, `fluxApplication()` for `@flux-ui/application`,
`fluxStatistics()` for `@flux-ui/statistics` (and `fluxDashboard()` for
`@flux-ui/dashboard`). Each one aliases its package to source (`~flux/<pkg>`) and
auto-wires the tsconfig path.

> **This matters:** if you use `@flux-ui/application` or `@flux-ui/statistics` but
> only add `flux()`, those packages resolve to their **dist** build, whose CSS is
> a separate `style.css` that nothing imports — so the **app shell / charts
> render completely unstyled** (sidebar collapses to a flat list, etc.). Add the
> matching plugin for every Flux package you import.

```ts [vite.config.ts]
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { flux, fluxApplication, fluxStatistics, preset } from '@basmilius/vite-preset';

export default defineConfig({
  // components only:           [vue(), preset(), flux()]
  // + application + statistics (a dashboard):
  plugins: [vue(), preset(), flux(), fluxApplication(), fluxStatistics()]
});
```

**Import the global stylesheet** once (e.g. in `main.ts`). Under the
`@basmilius/vite-preset` (which aliases each `@flux-ui/*` package to its `src/`),
import the SCSS source entry:

```ts
import '@flux-ui/components/css/index.scss';
```

(Without the preset, the prebuilt `@flux-ui/components/style.css` is the
equivalent.) `@flux-ui/application` and `@flux-ui/statistics` ship co-located
CSS-module styles that their components auto-import once their preset plugin is
added (above) — no separate global stylesheet for those.

## Internationalization (vue-i18n) — avoid raw `flux.*` keys

Flux components have their **own built-in English** strings (an internal
`useTranslate` with an `english` fallback — `flux.optional` → "Optional", etc.).
The catch: that fallback is used **only when no global vue-i18n `$t` is injected**.
If a vue-i18n instance injects a global `$t`, Flux delegates to it — and if your
messages don't contain the `flux.*` keys, the UI shows **raw keys like
`(flux.optional)`**.

This bites you because **`@flux-ui/statistics` requires vue-i18n**. When you add
it, configure i18n so Flux keeps its own strings — set **`globalInjection: false`**
(and `legacy: false`):

```ts
const i18n = createI18n({ legacy: false, globalInjection: false, locale: 'en' });
```

Statistics still works (its components use `useI18n()`, not global `$t`).
Alternatively, if you *want* a global `$t`, merge Flux's strings into your
messages: `import { english } from '@flux-ui/components'` →
`messages: { en: { ...english, ...yours } }`.

Install guides exist for plain Vue, **Vue Router**, and **Nuxt** — follow the
matching one (routing and SSR each need extra setup).

## Provider: FluxRoot

Mount **one** `FluxRoot` as your application's main wrapper:

```vue
<template>
  <FluxRoot>
    <!-- your application, e.g. <RouterView /> -->
  </FluxRoot>
</template>
<script lang="ts" setup>
  import { FluxRoot } from '@flux-ui/components';
</script>
```

`FluxRoot` internally renders `FluxOverlayProvider`, `FluxSnackbarProvider` and
`FluxTooltipProvider` (you never use those directly). They render, respectively:
stacked alerts/confirms/prompts and overlays; snackbars; and tooltips. So the
programmatic `show*` dialog functions, `FluxOverlay`, and `FluxTooltip` all
depend on a mounted `FluxRoot`. The `show*` functions **throw if none is present**.

## Icons = registered Font Awesome names

Flux does not take icon components. You **register** Font Awesome icon
definitions once, then reference them by **kebab-case name string** (typed
`FluxIconName`).

### Free or Pro — ask first

`fluxRegisterIcons` accepts **any** Font Awesome `IconDefinition`, regardless of
style or tier — the registry keys purely by icon name. So Flux works with **Font
Awesome Free or Pro**; Pro is **not** required for a consuming app.

- **Free** — no auth token: `@fortawesome/free-solid-svg-icons` (broadest free
  set), plus `@fortawesome/free-regular-svg-icons` (limited) and
  `@fortawesome/free-brands-svg-icons`.
- **Pro** — richer styles (regular/light/thin/duotone), but needs a paid Font
  Awesome npm account configured per Font Awesome's own Pro install docs:
  `@fortawesome/pro-regular-svg-icons`, etc.

**When scaffolding a project, ask the user which tier they have before adding a
Font Awesome dependency** — installing a Pro package without the token fails
(`bun install`/`npm install` errors). Default to **Free** when unknown. If a
component's "Required icons" name only exists in Pro, register the closest Free
style (often the solid variant of the same name).

```ts [icons.ts]
// Free (no token). Swap to '@fortawesome/pro-regular-svg-icons' if the project has Pro.
export { faCircleCheck, faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
```
```ts [register.ts]
import { fluxRegisterIcons } from '@flux-ui/components';
import * as icons from './icons';
fluxRegisterIcons(icons);
```
```vue
<FluxPrimaryButton label="Save" icon-leading="circle-check" />
```

Common props: `icon`, `icon-leading`, `icon-trailing`. An **unregistered** icon
simply renders nothing. `fluxRegisterIcons` and the `iconRegistry` are public.

**Register each component's "Required icons" — not just the ones you pass.** Many
components use icons *internally* (sort arrows, pagination chevrons, the date-time
input clock, checkmarks, close ✕, …) that you never reference in your template.
Every component's doc page on flux-ui.dev lists these under **"Required icons"**
(from a `requiredIcons:` front-matter list — e.g. `data-table` needs
`arrow-down-a-z`, `arrow-up-a-z`, `arrow-up-arrow-down`, `check`, `circle-xmark`,
`minus`). **When you add a component, open its doc page and register its Required
icons**, in addition to any `icon`/`icon-leading` you set — otherwise its sort
controls, pagination, etc. render blank. Don't guess the internal set; read it off
the page.

**Validate every icon name against the registry — including dynamic ones.** Before
declaring a screen done, confirm each icon string you used actually maps to a
registered definition. Two traps make this easy to get wrong:

- **Substring false-positives.** Font Awesome has near-identical singular/plural
  and variant names (`calendar-day` vs `calendar-days`, `arrow-up` vs
  `arrow-up-from-bracket`). A naive `grep faCalendarDay icons.ts` *passes* on
  `faCalendarDays` because it's a substring — yet `calendar-day` is **not**
  registered and renders blank. Match on a **word boundary** (`grep -wE` /
  `\bfaCalendarDay\b`), or normalize both sides to kebab and compare exact lines.
- **Dynamic sources.** Icons chosen at runtime — status→icon maps, seed/data
  arrays typed `FluxIconName`, `:name="item.icon"` — never appear as a literal in
  the template, so a template-only scan misses them. Resolve those maps/arrays to
  their concrete values and validate those too.
- **`name=` is not always an icon.** When scanning a template for icon usage,
  `name` is an icon prop **only** on `FluxIcon` / `FluxBoxedIcon`. On
  `FluxFilterOption` (and form controls) `name` is a state/field key — treating
  every `name="…"` as an icon yields false "missing icon" hits. Icons elsewhere
  arrive via `icon` / `icon-leading` / `icon-trailing`.

When in doubt prefer an **already-registered** name over expanding the icon set
(e.g. use `calendar-days` if it's registered rather than adding `calendar-day`).

**Prop-name trap:** the standalone icon components `FluxIcon` and `FluxBoxedIcon`
take the icon name through a **`name`** prop (`<FluxIcon name="circle-check" />`,
`<FluxBoxedIcon name="list-check" />`), *not* `icon`. Everywhere else (buttons,
badges, notices, headers, …) the icon comes via an `icon` / `icon-leading` /
`icon-trailing` prop.

## Design tokens & colors

- **Design tokens are CSS custom properties** defined on `:root` (e.g.
  `--background`, `--gray-25`, `--primary-500`). They flip automatically in dark
  mode. Use them when writing your own styles or new components — they are *not*
  values you pass to props.
- **Spacing / `gap`** props take a **plain number in pixels** (`<FluxFlex
  :gap="9">` renders `gap: 9px`). There is no numeric "token scale" for these.
- **Colors** on components use **token names** via the `FluxColor` type:
  `gray | primary | danger | info | success | warning`
  (`color="success"`, `color="danger"`, …). The palette tokens are
  `--gray-*`, `--primary-*`, `--danger-*`, `--info-*`, `--success-*`,
  `--warning-*`.
- **Typography** and **dark mode** are handled by the library via these CSS
  variables. Dark mode is built in — don't author separate dark styles per
  component.

## Content: prop vs default slot (common trap)

Flux is **not** consistent about how text content goes in, so don't assume a
`message`/`title`/`label` prop exists — it varies per component:

- **`label` prop:** `FluxBadge`, `FluxTag`, `FluxChip` (`<FluxBadge label="New" />`).
- **`content` prop:** `FluxTooltip` (`<FluxTooltip content="Delete">`).
- **`message`/`title` prop *or* default slot:** `FluxNotice`, `FluxPlaceholder`
  (both accept a prop, or you can fill the default slot for rich content).
- **Default slot only — no content prop:** `FluxInfo`, `FluxItemContent`. Write
  `<FluxInfo>Saved.</FluxInfo>`, **not** `<FluxInfo message="Saved." />`. Put a
  row's title/badge/etc. as children of `FluxItemContent`, not via props.

When unsure whether a component takes a prop or a slot for its content, check its
doc page — guessing a `:message`/`:title` prop that doesn't exist renders nothing.

## Two-way binding

Form controls bind with normal Vue 3 `v-model`. The exact model value type
varies per control (string, number, Date, array …) and is documented on each
control's doc page — check there rather than assuming.

## Routing

Components that navigate accept Vue Router targets via `type="route"` + `:to`
(type `FluxTo`). This only works once Vue Router integration is installed (see
the Vue Router install page). For external links use `type="link"` with
`href`/`rel`/`target`.

## TypeScript

Public types live in **`@flux-ui/types`**. Import rule that the compiler enforces:

- **Type-only aliases come from `@flux-ui/types`** — `FluxIconName`, `FluxColor`,
  `FluxTo`, `FluxButtonSize`, and most component-config types. These are **not**
  re-exported by `@flux-ui/components` (importing `FluxColor` from
  `@flux-ui/components` is a type error), so write
  `import type { FluxColor, FluxIconName } from '@flux-ui/types';`.
- **`@flux-ui/components`** re-exports the runtime API (components, functions,
  composables) and a *subset* of types: the injection types
  (`FluxFormFieldInjection`, `FluxFilterInjection`, …), `FluxState`/`FluxStore`,
  `FluxFilterDefinitionFactory`, and the select option types. When a type isn't
  found on `@flux-ui/components`, import it from `@flux-ui/types`.

`@flux-ui/types` pulls in Luxon types for date values; a TS project may need
`@types/luxon` installed. The `guide/api/types` page documents the full surface;
prefer importing these over re-declaring them.

## Every component must be imported (silent failure)

Flux has **no global registration** — every component (and your own) used in a
`<script setup>` template must be imported, or Vue treats the unknown
PascalCase tag as a **native custom element** and renders it literally,
lowercased: `<MemberAvatar/>` → `<memberavatar></memberavatar>` in the DOM, blank
on screen. This is **not** a compile error (vue-tsc allows custom elements), so it
slips past the build — you only see it at runtime.

When a Flux component (or a local one) renders as nothing / shows a literal
lowercased tag in the DOM, the cause is almost always a **missing import**. After
wiring up a template, confirm every `Flux*` tag and every local component used
appears in the script's imports.

## Layout primitive: Pane

`FluxPane` is the standard surface/card. Compose it as
`FluxPane` › `FluxPaneHeader` / `FluxPaneBody` / `FluxPaneFooter`. Most form and
content examples in the docs put their content inside a `FluxPaneBody`. A
`FluxLayerPane` only pads its *pane structures* and the `FluxPaneHeader` /
`FluxLayerPaneSecondary` chrome — a **bare `FluxItem` placed directly in a
`FluxLayerPane`** (e.g. as a custom tinted header) gets **no padding**; give it
its own (`padding: 15px 18px`) or wrap it. See `references/patterns.md` §5.
