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
  statistics/   @flux-ui/statistics  — statistics / chart components (Apache ECharts)
  application/  @flux-ui/application — application layout / navigation components
docs/                                — VitePress documentation site
```

### Path aliases

A unified `~flux/*` namespace is used across all packages, with each Flux package mounted under its own sub-path:

- `~flux/components/*` → `packages/components/src/*`
- `~flux/application/*` → `packages/application/src/*`
- `~flux/statistics/*` → `packages/statistics/src/*`

The same alias is used for both TypeScript/Vue imports and Sass `@use` statements.

---

## Build commands

| Package        | Command                                              |
|----------------|------------------------------------------------------|
| components     | `bun run --cwd packages/components build`            |
| statistics     | `bun run --cwd packages/statistics build`            |
| internals      | `bun run --cwd packages/internals build` (tsdown)    |
| docs (dev)     | `bun run --cwd docs dev`                             |
| docs (build)   | `bun run --cwd docs build`                           |

Build for `components`, `statistics`, `application` runs `vue-tsc` (type-check) first, then `vite build`.
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

## Import conventions

Strict rules apply to all `.ts` and `.vue` files in `packages/*/src/`.

### 1. Type imports

- **Mixed value + type from the same module** → use **inline `type`** keyword:
  ```ts
  import { computed, ref, type Ref } from 'vue';
  ```
- **Pure type-only imports** (every named import is a type) → use **`import type {}`**:
  ```ts
  import type { FluxButtonEmits, FluxButtonProps } from '@flux-ui/types';
  import type { VNode } from 'vue';
  ```
- **Default + named** imports stay as-is, never split:
  ```ts
  import FluxButton, { SLOTS } from './FluxButton.vue';
  ```
- **Side-effect imports** stay as-is: `import './foo.scss'`, `import 'imask/masked/pattern'`.

### 2. Path aliases

A single unified `~flux/*` namespace is used for both TypeScript/Vue imports and Sass `@use` statements. Each Flux package is mounted under its own sub-path — fully symmetric. Never use `@/*` — it is not configured anywhere.

| Path pattern             | Resolves to                   |
|--------------------------|-------------------------------|
| `~flux/components/*`     | `packages/components/src/*`   |
| `~flux/application/*`    | `packages/application/src/*`  |
| `~flux/statistics/*`     | `packages/statistics/src/*`   |

`packages/internals` and `packages/types` have no alias; they only use relative paths internally.

Examples:

```ts
// inside packages/components/src/component/FluxButton.vue
import { useDisabled } from '~flux/components/composable';

// inside packages/application/src/component/FluxApplication.vue
import { FluxSecondaryButton } from '@flux-ui/components';   // npm dep
import { useApplicationMenu } from '~flux/application/composable';  // own package
```

```scss
@use '~flux/components/css/mixin';
```

Cross-package consumption is allowed via the unified `~flux/*` namespace. For instance, `application` legitimately uses `~flux/components/css/...` to consume shared CSS from `components`.

### 3. Barrel imports

Always import from a directory's barrel (`index.ts`) **unless** the importing file is in that same directory.

- ❌ From `component/FluxButton.vue`: `import { useDisabled } from '~flux/composable/useDisabled';`
- ✅ From `component/FluxButton.vue`: `import { useDisabled } from '~flux/composable';`
- ✅ From `composable/useFoo.ts`: `import { useDisabled } from './useDisabled';`

Known barrels in `packages/components/src/`: `composable/`, `composable/private/`, `data/`, `transition/`, `util/`, `component/primitive/`, `component/calendar/`, plus the top-level `index.ts`.

**Critical for injection keys**: keys like `FluxKanbanInjectionKey`, `FluxCalendarInjectionKey`, `FluxDisabledInjectionKey` (defined in `data/di.ts`) **must** always be imported via the `~flux/data` barrel. Importing them via the deep path (`~flux/data/di`) creates a separate module instance in Vite/rolldown — provider and consumer end up with different `Symbol()` instances and `inject()` returns nothing.

**Documented exceptions** (deep imports allowed):
- `~flux/data/timeZones` — too large to include in the data barrel
- `~flux/css/...` — CSS modules, no barrel
- `../FluxX.vue` from `component/primitive/*` and `component/calendar/*` — kept relative to avoid import cycles between primitives and parent components

### 4. Import order

Four groups, **no** blank lines between groups, alphabetic within each group:

1. **External (npm)** — `@`-scoped first (alphabetic), then unscoped (alphabetic)
2. **Internal absolute / parent** — alias paths (`~flux/*`, excluding `/css/`) and `../...`
3. **Local siblings** — `./...`
4. **Styles (last)** — `~flux/css/*`, `*.module.scss`

Example:
```ts
import { type FluxButtonEmits, type FluxButtonProps, type FluxButtonSlots } from '@flux-ui/types';
import { clsx } from 'clsx';
import { toRef, unref } from 'vue';
import { useDisabled } from '~flux/composable';
import FluxIcon from './FluxIcon.vue';
import FluxPressable from './FluxPressable.vue';
import $style from '~flux/css/component/base/Button.module.scss';
```

### 5. Type-only npm packages

Some npm packages export only TypeScript types and have no runtime entry (e.g. `@fortawesome/fontawesome-common-types`). Always import these with `import type {}` — inline `type` keyword leaves an empty runtime import that Vite/rolldown will try to resolve, which fails for type-only packages.

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

**Inline prop, emit and slot definitions are the default.** Keep types next to the component that owns them:

```vue
<script lang="ts" setup>
    defineEmits<{ click: [MouseEvent] }>();
    defineProps<{
        readonly label: string;
        readonly disabled?: boolean;
    }>();
    defineSlots<{ default(): any }>();
</script>
```

Moving a type to `@flux-ui/types` is the **exception** and only appropriate when there is a clear cross-package or cross-component reuse need (e.g. a shared `FluxColor`, `FluxSize`, or a type consumed by multiple components in `@flux-ui/statistics`).

Never propose migrating existing inline prop types to `@flux-ui/types` as a cleanup — treat inline definitions as intentional unless the component author explicitly asks to extract them.

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

CSS module class names are compiled in **kebab-case** for the library build (configured in `@basmilius/vite-preset`).

### SCSS mixins

Available mixins (import via `@use '~flux/css/mixin'`):

- `mixin.hover` — hover state helper
- `mixin.focus-ring` — focus ring
- `mixin.breakpoints` — responsive breakpoints
- `mixin.tree-node-classes()` — shared tree node structure (used by TreeView and TreeViewSelect)

### Design tokens (CSS custom properties)

All colors are CSS custom properties. Palette scales: `--gray-*`, `--primary-*`, `--danger-*`, `--info-*`, `--success-*`, `--warning-*` (25–950).

Semantic tokens: `--surface`, `--surface-hover`, `--surface-active`, `--surface-stroke`, `--foreground`, etc.

### CSS property order

The `.editorconfig` defines a strict CSS property order (font → position → display → flex → box-sizing → dimensions → margin → padding → ... → background → box-shadow). Follow this order in new SCSS blocks.

### Spacing & sizing (3px grid)

All spacing and dimension values are based on a **3px grid** — use multiples of 3px for `width`, `height`, `padding`, `margin`, `gap`, and positional offsets (`top` / `right` / `bottom` / `left`). For example, use `321px`, not `320px`.

These follow their own scale and are **not** bound to the 3px grid:
- Hairline borders / outlines (`1px`, `2px`)
- `border-radius`
- `font-size` (type scale, e.g. `13px`, `14px`, `15px`)

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

Utilities (`packages/internals/src/util/`):
- Focus helpers — `wrapFocus`, `focusTrap`, `getFocusableElement`, `getFocusableElements`, `getKeyboardFocusableElements`, `getBidirectionalFocusElement`
- VNode helpers — `flattenVNodeTree`, `getComponentName`, `getComponentProps`, `getExposedRef`, `unrefTemplateElement`
- Misc — `animationFrameDebounce`, `warn`

Composables (`packages/internals/src/composable/`):
- Focus traps — `useFocusTrap`, `useFocusTrapLock`, `useFocusTrapReturn`, `useFocusTrapSubscription`, `useFocusZone`
- Calendar — `useCalendar`, `useCalendarMonthSwitcher`, `useCalendarTimeGrid`, `useCalendarYearSwitcher`
- Misc — `useEventListener`, `useInView`, `useKeyboardGrab`, `useRemembered`, `useScrollEdges`, `useScrollPosition`

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
- `useAdaptiveGroupInjection`, `useCalendarInjection`, `useDisabledInjection`, `useExpandableGroupInjection`
- `useFilterInjection`, `useFlyoutInjection`, `useFormFieldInjection`, `useKanbanInjection`
- `useTabBarInjection`, `useTableInjection`, `useTooltipInjection`

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

Wraps **Apache ECharts** (`echarts/core` modular imports + custom `useECharts` composable) with themed Flux components. Uses `vue-i18n` for locale-aware labels. Chart components follow the same CSS Modules and naming conventions.

---

## Environment / tooling notes

- `@basmilius/vite-preset` — shared Vite configuration preset (CSS modules, library mode, etc.)
- `@basmilius/common` / `@basmilius/utils` — shared utilities by the author
- CSS module class names: `kebab` in library build, `mangled` in docs build
- Vue 3 only; Options API intentionally disabled
- `luxon` and `vue` are externalized (not bundled) in library builds
- `imask` used for input masking (BIC, IBAN, VAT)
- `lodash-es` used for various utilities
