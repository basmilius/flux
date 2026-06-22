# Composables & global API

All composables are named exports from `@flux-ui/components`. Two kinds:
**utility** composables you call directly, and **injection** composables that
expose a parent Flux component's context to a custom child you're building.
For exact return shapes, the `guide/composables/*` and `guide/api/*` pages are
authoritative.

## Utility composables

### useBreakpoints (verified)

Reactive viewport tracking. Returns `currentBreakpoint` plus a boolean ref per
breakpoint:

```ts
import { useBreakpoints } from '@flux-ui/components';
const { currentBreakpoint, xs, sm, md, lg, xl } = useBreakpoints();
// if (md.value) { … }
```

```ts
type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
declare function useBreakpoints(): {
  readonly currentBreakpoint: Ref<Breakpoint | null>;
  readonly xs: Ref<boolean>; readonly sm: Ref<boolean>;
  readonly md: Ref<boolean>; readonly lg: Ref<boolean>;
  readonly xl: Ref<boolean>;
};
```

Breakpoint floors: `xs` 0px, `sm` 640px, `md` 768px, `lg` 1024px, `xl` 1280px
(each ref is true when the viewport is **at least** that wide). Prefer this over
CSS media queries for **structural** changes (e.g. flipping `FluxFlex` direction).

### useDisabled

Reads/propagates disabled state so a control respects an ancestor's disabled
context. Pair with `useDisabledInjection` when authoring a custom control.

## Injection composables (for custom components)

Use these only when building a custom component that must integrate with a Flux
parent's context. Each returns the injected context (several have an exported
`Flux*Injection` type).

- `useAdaptiveGroupInjection` — child inside a `FluxAdaptiveGroup`.
- `useCalendarInjection` — custom cell/entry inside a `FluxCalendar`.
- `useDisabledInjection` — inherit disabled state from an ancestor.
- `useExpandableGroupInjection` — participate in a `FluxExpandable`/accordion.
- `useFilterInjection` — author a custom control inside a `FluxFilterBar`.
- `useFlyoutInjection` — content/anchor coordination inside a `FluxFlyout`.
- `useFormCheckboxGroupInjection` — custom checkbox in a `FluxFormCheckboxGroup`.
- `useFormFieldInjection` — a custom control reporting into a `FluxFormField`
  (id, error state, …) so label/hint/error wiring works.
- `useFormRadioGroupInjection` — custom radio in a `FluxFormRadioGroup`.
- `useKanbanInjection` — custom pieces inside a `FluxKanban`.
- `useSegmentedControlInjection` — custom item in a `FluxSegmentedControl`.
- `useTabBarInjection` — custom item in a `FluxTabBar`.
- `useTableInjection` — custom cells/rows reading `FluxTable`/`FluxDataTable`.
- `useTooltipInjection` — custom tooltip anchors.

If you're only *using* the built-in controls, you don't need these — the parent
components wire it up for you.

## Global API & helpers

- **`useFluxStore`** — Flux's reactive global store (`FluxStore`). It underpins
  app-wide state and the dialog/snackbar machinery; it also exposes
  `addSnackbar(spec) → id`, `updateSnackbar(id, partial)` and
  `removeSnackbar(id)` for live-updating snackbars (see
  `references/dialogs-and-feedback.md`). For dialogs prefer the `show*` functions.
- **Icons** — `fluxRegisterIcons(icons)` registers Font Awesome icons; the
  `iconRegistry` is the underlying registry.
- **Filter helpers** — `defineFilter`, `pickFilterCommon`, and the type guards
  `isFluxFilterOptionHeader` / `isFluxFilterOptionItem`. The `defineFilterMacro`
  compile macro lives at the `@flux-ui/components/vite` subpath.
- **Select type guards** — `isFluxFormSelectOption` / `isFluxFormSelectGroup`
  narrow option vs group entries.
- ⚠ **Not on the package root.** Several source utilities are **not** re-exported
  from `@flux-ui/components` (the root export of `./data` and `./util` is
  selective) — `generateMultiOptionsLabel`, `isResettable`, `sanitizeUrl`,
  `createLabelForDateRange`, `createDialogRenderer`, the `inputMask` namespace, and
  the internal `english` strings. They exist in source but you can't
  `import { … } from '@flux-ui/components'`.
- **Types** (`guide/api/types`) — type-only aliases (`FluxIconName`, `FluxColor`,
  `FluxTo`, …) come from **`@flux-ui/types`**; `@flux-ui/components` only
  re-exports a subset (injection types, `FluxState`/`FluxStore`,
  `FluxFilterDefinitionFactory`). Import a type from `@flux-ui/types` when it's
  not found on `@flux-ui/components`. See `references/conventions.md`.

## Documented patterns (read before building the real thing)

The guide's Patterns section shows idiomatic end-to-end wiring:

- CRUD form — `https://flux-ui.dev/guide/patterns/crud-form`
- Filterable data table — `https://flux-ui.dev/guide/patterns/filterable-data-table`
- Stepper wizard — `https://flux-ui.dev/guide/patterns/stepper-wizard`
- Programmatic dialogs — `https://flux-ui.dev/guide/patterns/programmatic-dialogs`
  (also summarised in `references/dialogs-and-feedback.md`)
