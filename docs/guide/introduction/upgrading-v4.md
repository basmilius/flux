---
outline: deep
---

# Upgrading to v4

This major rebuilds the color layer, puts every package behind the same `vue-i18n` translations, and turns the application side panel into something you drive with a model. An application that renders Flux components and never reached into a custom property has little to do. The rest is worth a read in the order below, which runs from what fails quietly to what fails at the type checker.

| Area                                                      | What changed                                                                        | Concerns you if                                            |
|-----------------------------------------------------------|-------------------------------------------------------------------------------------|------------------------------------------------------------|
| [Colors](#colors)                                         | The palette moved behind `--palette-*` and both themes resolve via `light-dark()`.  | You read or declared one of the color custom properties.   |
| [Translations](#every-package-speaks-the-same-way)        | `vue-i18n` is a peer dependency of every package that renders text.                 | You render any Flux component.                             |
| [Application side](#the-side-panel-carries-its-own-state) | `FluxApplicationSide` takes `v-model:is-visible` and covers the content below `lg`. | You render a side panel.                                   |
| [Kanban](#kanban-move-events-carry-a-swimlane)            | `move` and `canMove` carry the swimlane an item came from.                          | You annotate the move event with its type.                 |
| [Package exports](#a-package-hands-out-less)              | The injection keys and English dictionaries of `application` and `flow` are internal. | You import one of them by name.                            |
| [New keys](#eighteen-new-translation-keys)                | 18 keys were added, none were removed or renamed.                                   | You keep a translation map of your own.                    |

## Colors

The color layer was rebuilt. Components look after themselves, so what changed is the part you were allowed to reach into: the palette custom properties, and how dark mode arrives at its values.

::: danger This breaks quietly
A removed custom property is not an error. Reading `--gray-200` now resolves to nothing and paints as though the declaration were never written, so a border disappears instead of turning the wrong color. Nothing warns you, in the browser or at build time. Find them before you upgrade:

```sh
# Every read of a removed stop.
grep -rnE 'var\([[:space:]]*--(gray|primary|danger|info|success|warning)-(25|50|100|200|300|400|500|600|700|800|900|950)\b' src

# Every declaration of one, which is how an application reshades the scale.
grep -rnE '(^|[^-[:alnum:]])--(gray|primary|danger|info|success|warning)-(25|50|100|200|300|400|500|600|700|800|900|950)[[:space:]]*:' src
```

Run both. The second one is the easier miss: an application that reshaded Flux by declaring the scale keeps compiling, keeps validating, and silently stops reshading anything.

A Sass loop over your color names and a template literal in JavaScript both hide the same reference behind interpolation, where neither pattern will find it. Those are worth a pass by hand.
:::

### The palette moved behind a prefix

Every stop is now `--palette-<scale>-<stop>`. The six scales and their twelve stops are otherwise unchanged in name and in count, so this rename is mechanical:

```scss
/* Before */  --gray-700
/* After  */  --palette-gray-700
```

It is also the option to reach for last. The stop you were reading almost certainly has a role above it, and that role is what dark mode is calibrated on.

### From a stop to a role

The table below is the substitution that was applied across the library itself. It reads the way light mode used to, which is where these mappings came from.

| Was                                               | Now                                                               | Where                                                                                       |
|---------------------------------------------------|-------------------------------------------------------------------|---------------------------------------------------------------------------------------------|
| <kbd>--gray-25</kbd>                              | <kbd>--surface</kbd>                                              | A card, a pane, a menu.                                                                     |
| <kbd>--gray-50</kbd>                              | <kbd>--surface-sunken</kbd>, <kbd>--surface-hover</kbd>           | A strip inside a card, or a row under the pointer.                                          |
| <kbd>--gray-100</kbd>                             | <kbd>--surface-canvas</kbd>, <kbd>--surface-active</kbd>          | The ground a board is drawn on, or a row being pressed.                                     |
| <kbd>--gray-200</kbd>, <kbd>--gray-300</kbd>      | <kbd>--surface-stroke</kbd>, <kbd>--surface-stroke-hover</kbd>    | Separators, table rules, input borders.                                                     |
| <kbd>--gray-500</kbd>, <kbd>--gray-600</kbd>      | <kbd>--foreground-subtle</kbd>, <kbd>--foreground-secondary</kbd> | Decoration and supporting copy. Subtle is the one rung not held to AA, so keep copy off it. |
| <kbd>--gray-700</kbd>, <kbd>--gray-900</kbd>      | <kbd>--foreground</kbd>, <kbd>--foreground-prominent</kbd>        | Body text and headings.                                                                     |
| <kbd>--primary-600</kbd>                          | <kbd>--primary-solid</kbd>                                        | A filled button or a checked box. Pair it with <kbd>--primary-on-solid</kbd> for the label. |
| <kbd>--primary-700</kbd>                          | <kbd>--primary-text</kbd>                                         | Colored text, on the surface or on its own soft fill.                                       |
| <kbd>--primary-50</kbd>, <kbd>--primary-100</kbd> | <kbd>--primary-soft</kbd>, <kbd>--primary-soft-hover</kbd>        | A tinted chip, notice or table row.                                                         |
| <kbd>--primary-200</kbd>                          | <kbd>--primary-border</kbd>                                       | The edge of that tint.                                                                      |

All six intents carry the same nine roles, gray included, so `--danger-solid` and `--success-soft` are spelled exactly like their primary counterparts. See [Design tokens](./design-tokens) for the full list.

### Dark mode no longer mirrors the palette

The old palette flipped: `--gray-950` was near-black in light and near-white in dark, and a component picked one stop for both. That is gone. A stop is now absolute, the same color in either theme, and the semantic and intent layers pick per theme through [`light-dark()`](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/light-dark).

Two consequences worth knowing before you port anything.

A token that was mirrored has no single replacement. `--gray-950` as text meant near-black in light and near-white in dark, which is `--foreground-prominent`, not `--palette-gray-950`. Translating the stop rather than the intent gets you near-black text on a near-black surface.

And dark mode now follows `color-scheme` rather than an attribute Flux reads itself, so the `dark` attribute works on any element and nests. A dark section on a light page needs no extra styling, and native UI (scrollbars, `<select>` popups, autofill) follows along. See [Dark mode](./dark-mode).

### Palette overrides belong on `:root`

If you reshade Flux by overriding the scale, the declarations have to sit on the root element. A semantic token is declared on `:root` and substitutes its `var(--palette-*)` right there, so an override further down the tree arrives too late and changes nothing at all.

```scss
:root {
    --palette-gray-500: oklch(.6411 .0342 60);
    --palette-gray-600: oklch(.5199 .0408 60);
    /* ...and so on for the rest of the scale. */
}
```

Overriding a *semantic* token on a subtree does still work, because those are read at the point of use. That is the tool for giving one section its own surface.

One shape the absolute palette cannot express: a `[dark]` block that swaps a warm light scale for a cool dark one. Dark inherits the hue light picked. When a theme really needs two hues, override the semantic tokens with `light-dark()` instead of the scale.

### Also removed

| Token                                                                                           | Replacement                                                                                                           |
|-------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------|
| <kbd>--overlay-strong</kbd>                                                                     | <kbd>--surface-inverse</kbd>, which is what the tooltip moved to.                                                     |
| <kbd>--intent-solid-hover</kbd>, <kbd>--intent-solid-active</kbd>, <kbd>--intent-on-solid</kbd> | Only relevant if you build against the Sass mixins. Read <kbd>--&lt;color&gt;-solid-hover</kbd> and friends directly. |
| <kbd>--chart-primary</kbd>, <kbd>--chart-secondary-1</kbd>, <kbd>--chart-secondary-2</kbd>      | <kbd>--chart-1</kbd> and the seven after it. See below.                                                               |

The focus ring is worth its own line, because it used to be reachable by accident. It read `--primary-600` directly, so an application that reshaded primary moved the ring along with it. It now reads <kbd>--focus-ring</kbd>, with <kbd>--focus-ring-transparent</kbd> for its resting state, both held to a contrast of at least 3 against every elevation level. Recoloring the ring is a matter of overriding those two on `:root`.

### Chart colors are their own layer now

`@flux-ui/statistics` used to derive its series colors from the primary and gray scales: `--chart-1` was `--chart-primary` was `--primary-700`, and the two `--chart-secondary-*` tokens were gray stops. A chart therefore inherited whatever the palette did, including the mirroring, and four series was as far as it went.

Charts now have a token layer of their own, solved per theme against the surface a series is actually drawn on:

- `--chart-1` through `--chart-8`, ordered by prominence. Spend them in order.
- `--chart-ramp-1` through `--chart-ramp-4` for a sequential ramp.
- `--chart-colorful-1` through `--chart-colorful-17` when eight categories are not enough.
- `--chart-positive`, `--chart-negative`, `--chart-grid`, `--chart-label` and `--chart-on-fill`.

`--chart-1` through `--chart-4` kept their names but not their values: they were a monochrome primary ramp and are now a four-hue categorical set. `--chart-primary` and the two `--chart-secondary-*` tokens are gone, so an override on one of them does nothing.

The two exported constants kept their names and nothing else. `CHART_COLORS` holds eight entries instead of four, and `CHART_COLORFUL_COLORS` holds `var(--chart-colorful-*)` references where it used to hold seventeen fixed hex values, none of which survives unchanged. Expect every chart to look different after upgrading, including one that names its colors explicitly. The reference form resolves anywhere CSS does, which is everywhere a Flux chart draws; it does not resolve if you were passing those values to a canvas fill or an export path of your own.

See [Chart colors](../../statistics/introduction/colors) for the full layer.

### Checking your own colors

The contrast contract only covers the tokens Flux ships. If you reshade the palette, the numbers move with it, and a brand color owes you nothing: a mid green or a bright amber at stop 600 does not carry white text.

Two checks catch most of it. Measure `--primary-on-solid` against `--primary-solid` (the label on a filled button), and `--primary-text` against `--surface` (colored text on a card). Both should clear 4.5:1 in both themes. If the fill fails, give `--primary-on-solid` a color that survives on it, or point `--primary-solid` and its two states at darker stops of the same scale. Darkening the stops themselves is the worst of the three, since every other role reads them too.

## Every package speaks the same way

`vue-i18n` is now a peer dependency of every Flux package that renders text, and each one asks for its keys under the shared `flux` root: `flux.*` for the components, and `flux.ai.*`, `flux.application.*` and `flux.flow.*` for the siblings. A key you did not translate falls back to the English the package ships with, so the strings you never touch keep reading the way they did.

Two things to check.

Your i18n instance has to be created with `legacy: false`, since Flux reads the global scope through `useI18n`. And where a component used to take a label as a prop for lack of anything better, such as the six on `FluxFlowControls` and `close-label` on `FluxApplicationSide`, that prop is now an override on top of the translation rather than the only way in. Setting it still wins.

`@flux-ui/statistics` renders no text of its own, but it does put the series names, slice labels and axis names you hand it through the same translations, which is what it did before v4. A name without a message behind it is rendered exactly as it was given.

[Translations](./translations) covers the setup and lists every string, with the sibling packages on their own pages.

## A package hands out less

`@flux-ui/application` and `@flux-ui/flow` used to re-export their whole data folder, which put a few things in your reach that were never meant for it. Both now name what they hand out, so five exports are gone:

| Package                | No longer exported                                                                      |
|------------------------|-----------------------------------------------------------------------------------------|
| `@flux-ui/application` | `FluxApplicationInjectionKey`, `english`                                                |
| `@flux-ui/flow`        | `FluxFlowInjectionKey`, `FluxFlowNodeInjectionKey`, `FluxFlowPlacementInjectionKey`, `english` |

Only these five names fail there, and they fail at the type checker rather than at runtime.

`FluxFlowEdgeLayerInjectionKey` stays, because it is the one a consumer is meant to provide: give it `'under'` or `'over'` and the edges paint below or above the nodes.

If you reached for an injection key to read a controller, there is no replacement: that state is internal, and a component that depended on it was depending on something that could move under it.

### The translate composable is internal

`useTranslate` is gone from every package, and so are the dictionary types behind
the per-package variants: `FluxAiTranslate`, `FluxAiTranslation`,
`FluxApplicationTranslate`, `FluxApplicationTranslation`, `FluxFlowTranslate` and
`FluxFlowTranslation`. The dictionary is how the components resolve their own
strings, and exposing it made an implementation detail part of the contract.

What you lose is the fallback: reaching for `flux.cancel` through your own
`useI18n()` returns the raw key unless you translated it yourself. So put the
strings you want in your own translation files. `FluxTranslate` and
`FluxTranslation` do stay exported, because `defineFilter` hands your factory a
context carrying one.

### Two composables changed name

- `useFluxFlowInjection` is `useFlowInjection`. An injection composable does not
  repeat the `Flux` prefix.
- In `@flux-ui/visuals`, `BorderBeamVariant`, `HighlighterVariant` and
  `HighlighterGroupProps` are `FluxVisualBorderBeamVariant`,
  `FluxVisualHighlighterVariant` and `FluxVisualHighlighterGroupProps`. They were
  the only three types in the public barrel without the prefix.

### Generic composables come from `@basmilius/common` now

`@flux-ui/internals` no longer carries `useEventListener`, `useInView`,
`usePointerDrag`, `useScrollPosition`, `useSpring`, `useWheelDrag`,
`animationFrameDebounce`, `prefersReducedMotion` or `unrefTemplateElement`.
Nothing about them is specific to a component library, so they live in
[`@basmilius/common`](https://github.com/basmilius/packages) and
`@basmilius/utils`, and Flux imports them from there like anyone else. Change the
import and you are done, with three things to know:

- `unrefTemplateElement` is called `unwrapElement`. The `TemplateRef` and
  `TemplateElement` types stay in `@flux-ui/internals`.
- `useEventListener` has no `{passive: true}` default any more. A scroll or wheel
  listener that wants to be passive has to say so.
- `useInView` takes an explicit option list (`initial`, `root`, `rootMargin`,
  `threshold`, `once`) instead of extending `IntersectionObserverInit`.

`useScrollPosition` also reads the position on mount rather than during setup,
which is what fixes the hydration mismatch it used to cause. It reports `0` for
one tick longer than before.

### The injection types are exported now

If you build your own item inside a `FluxKanban`, a calendar view or a table, the
context you receive is finally nameable: `FluxTableInjection`,
`FluxCalendarInjection`, `FluxKanbanInjection`,
`FluxFormCheckboxGroupInjection`, `FluxFormRadioGroupInjection`,
`FluxSegmentedControlInjection` and `FluxTabBarInjection`, along with the helper
types they use.

## The side panel carries its own state

`FluxApplicationSide` used to be a column you either rendered or did not. It now takes `v-model:is-visible` and a `close-label`, and below `lg` it stops pushing the content aside and starts covering it, behind a scrim that closes it.

```vue
<FluxApplication>
    <template #side>
        <FluxApplicationSide v-model:is-visible="isSideVisible"><!-- [!code focus] -->
            <!-- ... -->
        </FluxApplicationSide>
    </template>
</FluxApplication>
```

The model defaults to `true`, so a panel that was always on screen stays that way and a wide viewport needs no change at all. What does change is a narrow one: the panel is reachable there now, where it used to be hidden outright.

Drive it with the model rather than with `v-if`. The panel stays mounted and slides away, so it travels over the same duration as the padding the shell gives back, and a hidden panel is `inert` and out of the tab order. See [Side](../../application/components/side).

## Kanban move events carry a swimlane

`FluxKanban` learned swimlanes, and the payload grew with them. `move` and `canMove` now carry `FluxKanbanSwimlaneMoveEvent`, which is `FluxKanbanMoveEvent` plus an optional `fromSwimlaneId` and `toSwimlaneId`.

```ts
import type { FluxKanbanSwimlaneMoveEvent } from '@flux-ui/types';

function onMove(event: FluxKanbanSwimlaneMoveEvent): void { // [!code focus]
    // ...
}
```

A handler that never annotated the event needs no change, and a board without swimlanes emits exactly what it emitted before, down to the absent keys. Only an explicit `FluxKanbanMoveEvent` annotation, on a handler or on a `canMove` callback, has to be widened.

One combination is refused rather than guessed: `reorderable-columns` is ignored on a board with swimlanes, because a move-column event cannot tell a single lane apart from the whole board. Flux warns when it sees both.

## Eighteen new translation keys

The built-in strings of `@flux-ui/components` grew from 85 to 103. Nothing was removed and nothing was renamed, so an existing translation map keeps working; the eighteen new keys belong to components that are new themselves, among them the repeater, swipe actions and the resizable table header.

A key your map does not carry is not a hole: it falls back to the English the package ships with rather than rendering the raw key. [Translations](./translations) lists the full set, read straight from the source.

## New dependencies

| Package                                                          | Added                            |
|------------------------------------------------------------------|----------------------------------|
| `@flux-ui/components`, `ai`, `application`, `flow`, `statistics` | `vue-i18n`, as a peer dependency |
| `@flux-ui/application`                                           | `@basmilius/common`, bundled     |

## What's new

The breaking part above is the smaller half of this release. The rest is additions, and all of them are opt-in.

- **[Flux AI](../../ai/)**, a new package. Streaming markdown that stays valid mid-token, a composer that survives an IME, tool calls, reasoning and citations. It is separate on purpose: streaming markdown pulls in a parser, and a consumer who will never build a chat should not pay for it.
- **Around twenty components**, among them [Activity feed](../../components/activity-feed/), [Masonry](../../components/layout/masonry), [Repeater](../../components/form/repeater), [Speed dial](../../components/speed-dial), [Swipe actions](../../components/swipe-actions), and the mobile pair [Sheet](../../components/sheet) and [Back to top](../../components/back-to-top).
- **Kanban swimlanes**, through [`FluxKanbanSwimlane`](../../components/kanban/swimlane).
- **Resizable table columns**, through `is-resizable` and the `resize` event on [Table header](../../components/table/header). The handle is a focusable separator, so a column resizes without a mouse too.
- **A loading state on the statistics panes**, through `is-loading`. The chart keeps its place and the data it already has while it reloads. See [Chart pane](../../statistics/components/chart-pane).
- **Three transitions**: [Sheet](../../components/transitions/sheet), [Scale](../../components/transitions/scale) and [Stagger](../../components/transitions/stagger).
- **Gesture and motion composables**: `usePointerDrag`, `useWheelDrag` and `useSpring`, which are what the sheet and the swipe actions run on. They live in [`@basmilius/common`](https://github.com/basmilius/packages) rather than in `@flux-ui/internals`, because nothing about them is specific to a component library. Behind the translations sits [`createTranslate`](../../internals/composables/createTranslate), which does stay here.
