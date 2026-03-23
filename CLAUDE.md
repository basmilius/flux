# Flux UI — CLAUDE.md

## Project overview

Flux UI is an opinionated Vue 3 component library published as a monorepo on npm under the `@flux-ui` scope.

- **Docs**: https://flux-ui.dev
- **Package manager**: bun (always, never npm/pnpm)
- **Node requirement**: >=23

---

## Monorepo structure

```
packages/
  components/   @flux-ui/components  — main component library
  types/        @flux-ui/types       — all public TypeScript types
  internals/    @flux-ui/internals   — shared internal utilities & composables
  statistics/   @flux-ui/statistics  — statistics / chart components (ApexCharts)
  dashboard/    @flux-ui/dashboard   — dashboard layout components
docs/                                — VitePress documentation site
```

### Path alias inside `packages/components`

`$flux` resolves to `packages/components/src/` (configured in `vite.config.ts` and `tsconfig.app.json`).

---

## Build commands

| Package        | Command                                              |
|----------------|------------------------------------------------------|
| components     | `bun run --cwd packages/components build`            |
| statistics     | `bun run --cwd packages/statistics build`            |
| dashboard      | `bun run --cwd packages/dashboard build`             |
| internals      | `bun run --cwd packages/internals build` (tsdown)    |
| docs (dev)     | `bun run --cwd docs dev`                             |
| docs (build)   | `bun run --cwd docs build`                           |

Build for `components`, `statistics`, `dashboard` runs `vue-tsc` (type-check) first, then `vite build`.
Always run a build as the validation step before declaring an implementation done.

---

## Code style (from `.editorconfig`)

- **Indent**: 4 spaces, no tabs
- **Line endings**: LF
- **Quotes**: single quotes (`'`) in TypeScript/JavaScript
- **Semicolons**: required
- **Trailing commas**: removed (`ij_typescript_enforce_trailing_comma = remove`)
- **Max line length**: 999 (effectively unlimited)
- **Final newline**: required

---

## Vue component conventions

### Script setup

All components use `<script lang="ts" setup>`. The Options API is disabled (`__VUE_OPTIONS_API__: 'false'`).

```vue
<script lang="ts" setup>
    import type { FluxFooEmits, FluxFooProps, FluxFooSlots } from '@flux-ui/types';

    defineEmits<FluxFooEmits>();
    defineProps<FluxFooProps>();
    defineSlots<FluxFooSlots>();
</script>
```

### Naming conventions

- Component files: `FluxComponentName.vue` (PascalCase, `Flux` prefix)
- Primitive / internal components: `packages/components/src/component/primitive/`

### Props pattern

Props and their types always come from `@flux-ui/types`. Never define ad-hoc prop types inside a component file. Internal-only props (e.g. CSS class overrides passed by a wrapper component) may be added inline.

```typescript
// In @flux-ui/types:
export type FluxFooProps = { ... };
export type FluxFooEmits = { click: [MouseEvent] };
export type FluxFooSlots = { default(): any };
```

### Wrapper / variant pattern

Button variants (`FluxPrimaryButton`, `FluxSecondaryButton`, etc.) are thin wrappers around a shared `FluxButton` base component. They pass CSS module classes as props and forward all slots via a dynamic `v-for` over the `SLOTS` constant.

### Class composition

Use `clsx` for conditional class binding in templates. CSS Module classes are imported as `$style`.

```vue
:class="clsx($style.foo, isActive && $style.isActive)"
```

---

## CSS / SCSS conventions

### CSS Modules

Every component's styles live in a corresponding `.module.scss` file under:
- `packages/components/src/css/component/` (main components)
- `packages/components/src/css/component/base/` (shared base styles composed via `composes`)
- `packages/components/src/css/component/primitive/` (primitive component styles)
- `packages/statistics/src/css/`
- `packages/dashboard/src/css/`

CSS module class names are compiled in **kebab-case** for the library build (configured in `@basmilius/vite-preset`).

### SCSS mixins

Available mixins (import via `@use '$flux/css/mixin'`):

- `mixin.hover` — hover state helper
- `mixin.focus-ring` — focus ring
- `mixin.breakpoints` — responsive breakpoints
- `mixin.tree-node-classes()` — shared tree node structure (used by TreeView and TreeViewSelect)

### Design tokens (CSS custom properties)

All colors are CSS custom properties. Palette scales: `--gray-*`, `--primary-*`, `--danger-*`, `--info-*`, `--success-*`, `--warning-*` (25–950).

Semantic tokens: `--surface`, `--surface-hover`, `--surface-active`, `--surface-stroke`, `--foreground`, etc.

### CSS property order

The `.editorconfig` defines a strict CSS property order (font → position → display → flex → box-sizing → dimensions → margin → padding → ... → background → box-shadow). Follow this order in new SCSS blocks.

---

## TypeScript types (`@flux-ui/types`)

All public types are in `packages/types/src/`. Key files:

| File            | Contents                                                |
|-----------------|---------------------------------------------------------|
| `common.ts`     | `FluxColor`, `FluxSize`, `FluxIconName`, `FluxTo`, etc. |
| `components.ts` | Per-component Props/Emits/Slots types                   |
| `form.ts`       | Form-related types                                      |
| `filter.ts`     | Filter component types                                  |
| `notify.ts`     | Snackbar / alert / confirm types                        |
| `statistics.ts` | Statistics component types                              |

`@flux-ui/types` has **no build step** — it exports TypeScript source directly.

Common types to know:
- `FluxColor`: `'gray' | 'primary' | 'danger' | 'info' | 'success' | 'warning'`
- `FluxSize`: `'small' | 'medium' | 'large'`
- `FluxIconName`: FontAwesome icon name (from `@fortawesome/fontawesome-common-types`)
- `FluxPressableType`: `'button' | 'link' | 'route' | 'none'`
- `FluxTo`: Vue Router location object

---

## Internals package (`@flux-ui/internals`)

Shared utilities and composables used across packages. Built with `tsdown`.

Key utilities (`packages/internals/src/util/`):
- `wrapFocus` — wrap keyboard focus within a container
- `getFocusableElements` / `getFocusableElement` — find focusable descendants
- `getBidirectionalFocusElement` — bidirectional focus helper
- `flattenVNodeTree` — flatten VNode tree
- `getKeyboardFocusableElements`

Composables (`packages/internals/src/composable/`):
- `useRemembered` — persist values

---

## Shared tree view logic

Composable: `packages/components/src/composable/private/useTreeView.ts`

Exports:
- `TreeBaseOption`, `TreeFlatNode<T>` — option types
- `flattenVisible(nodes, depth, expanded)` — flatten only expanded nodes
- `flattenAll(nodes, depth)` — flatten all nodes
- `getLevelColor(depth, levelColors?)` — resolve color for a depth level
- `INITIAL_HIGHLIGHTED_INDEX` — constant (-1)
- `useTreeView({ expandedIds, nodeElementRefs, visibleNodes })` — returns `{ highlightedIndex, toggleExpand, onExpandClick, onKeyNavigate }`

CSS mixin: `packages/components/src/css/mixin/tree-node.scss`
Use via `@include mixin.tree-node-classes()` in a CSS module file.

---

## Public composables (`packages/components/src/composable/`)

Exported publicly:
- `useBreakpoints()` — reactive breakpoint detection
- `useDisabled(disabledRef)` — resolves disabled state (considers parent `FluxDisabled` injection)

Injection composables (not public, used internally):
- `useDisabledInjection`, `useExpandableGroupInjection`, `useFilterInjection`
- `useFlyoutInjection`, `useFormFieldInjection`, `useTableInjection`, `useTooltipInjection`

---

## Data layer (`packages/components/src/data/`)

Functions exported from the package root:
- `fluxRegisterIcons(icons)` — register FontAwesome icons
- `showAlert(options)`, `showConfirm(options)`, `showPrompt(options)` — programmatic overlays
- `showSnackbar(options)` — programmatic snackbar
- `useFluxStore()` — Pinia store for global state
- `isFluxFormSelectGroup(item)`, `isFluxFormSelectOption(item)` — type guards

---

## Documentation structure

Documentation site uses **VitePress** with custom plugins.

| Path                                        | Purpose                                  |
|---------------------------------------------|------------------------------------------|
| `docs/guide/components/*.md`                | Component documentation pages           |
| `docs/code/guide/components/**/*.vue`       | Runnable code examples                  |
| `docs/.vitepress/config.ts`                 | VitePress + Vite configuration           |
| `docs/.vitepress/component-navigation.ts`  | Sidebar navigation                       |
| `docs/.vitepress/theme/`                    | Custom theme                             |

### Docs page format

Each component `.md` file uses YAML frontmatter for the props/emits API table (rendered by `<FrontmatterDocs/>`), followed by:
1. Description paragraph
2. `::: render` block (preview)
3. Tips / notes
4. `<FrontmatterDocs/>` tag
5. `## Examples` section with `::: example` blocks
6. `## Used components` section

Code examples reference `.vue` files:
```markdown
::: example Title || Description
example=../../code/guide/components/component-name/example.vue
:::
```

---

## FontAwesome Pro

Icons use FontAwesome Pro. The npm registry token must be set:
```
FONTAWESOME_NPM_AUTH_TOKEN=<token>
```
Configured in `.npmrc` with `@fortawesome:registry=https://npm.fontawesome.com/`.

---

## Statistics package (`@flux-ui/statistics`)

Wraps **ApexCharts** (`apexcharts` + `vue3-apexcharts`) with themed Flux components. Uses `vue-i18n` for locale-aware labels. Chart components follow the same CSS Modules and naming conventions.

---

## Dashboard package (`@flux-ui/dashboard`)

Layout components for building dashboards:
- `FluxDashboard`, `FluxDashboardContent`, `FluxDashboardSide`
- `FluxDashboardNavigation`, `FluxDashboardTopBar`, `FluxDashboardHeader`, `FluxDashboardMenu`

---

## Environment / tooling notes

- `@basmilius/vite-preset` — shared Vite configuration preset (CSS modules, library mode, etc.)
- `@basmilius/common` / `@basmilius/utils` — shared utilities by the author
- CSS module class names: `kebab` in library build, `mangled` in docs build
- Vue 3 only; Options API intentionally disabled
- `luxon` and `vue` are externalized (not bundled) in library builds
- `imask` used for input masking (BIC, IBAN, VAT)
- `lodash-es` used for various utilities
