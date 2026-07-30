# Flux UI - CLAUDE.md

## Project overview

Flux UI is an opinionated Vue 3 component library published as a monorepo on npm under the `@flux-ui` scope.

- **Docs**: https://flux-ui.dev
- **Package manager**: bun (always, never npm/pnpm)
- **Node requirement**: >=23

---

## Monorepo structure

```
packages/
  components/   @flux-ui/components  - main component library
  types/        @flux-ui/types       - all public TypeScript types
  internals/    @flux-ui/internals   - shared internal utilities & composables
  ai/           @flux-ui/ai          - conversational and AI building blocks
  statistics/   @flux-ui/statistics  - statistics / chart components (Apache ECharts)
  application/  @flux-ui/application - application layout / navigation components
  flow/         @flux-ui/flow        - display-only node-based flow building blocks
  visuals/      @flux-ui/visuals     - visual effect components
docs/                                - VitePress documentation site
```

### Path aliases

A unified `~flux/*` namespace is used across all packages, with each Flux package mounted under its own sub-path:

- `~flux/components/*` → `packages/components/src/*`
- `~flux/ai/*` → `packages/ai/src/*`
- `~flux/application/*` → `packages/application/src/*`
- `~flux/statistics/*` → `packages/statistics/src/*`
- `~flux/flow/*` → `packages/flow/src/*`
- `~flux/visuals/*` → `packages/visuals/src/*`

The same alias is used for both TypeScript/Vue imports and Sass `@use` statements.

---

## Build commands

| Package        | Command                                              |
|----------------|------------------------------------------------------|
| components     | `bun run --cwd packages/components build`            |
| ai             | `bun run --cwd packages/ai build`                    |
| application    | `bun run --cwd packages/application build`           |
| statistics     | `bun run --cwd packages/statistics build`            |
| flow           | `bun run --cwd packages/flow build`                  |
| visuals        | `bun run --cwd packages/visuals build`               |
| internals      | `bun run --cwd packages/internals build` (tsdown)    |
| docs (dev)     | `bun run --cwd docs dev`                             |
| docs (build)   | `bun run --cwd docs build`                           |

Every package except `internals` (tsdown) and `types` (no build step) runs `vue-tsc` (type-check) first, then `vite build`.
Always run a build as the validation step before declaring an implementation done.
Read the full build output, not just the exit code: the `unplugin:dts` step reports type errors (e.g. `TS2345`) while the build still exits 0.

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

A single unified `~flux/*` namespace is used for both TypeScript/Vue imports and Sass `@use` statements. Each Flux package is mounted under its own sub-path - fully symmetric. Never use `@/*` - it is not configured anywhere.

| Path pattern             | Resolves to                   |
|--------------------------|-------------------------------|
| `~flux/components/*`     | `packages/components/src/*`   |
| `~flux/ai/*`             | `packages/ai/src/*`           |
| `~flux/application/*`    | `packages/application/src/*`  |
| `~flux/statistics/*`     | `packages/statistics/src/*`   |
| `~flux/flow/*`           | `packages/flow/src/*`         |
| `~flux/visuals/*`        | `packages/visuals/src/*`      |

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

Known barrels in `packages/components/src/`: `composable/`, `composable/private/`, `data/`, `transition/`, `util/`, `vite/`, `component/`, `component/primitive/`, `component/calendar/`, plus the top-level `index.ts`. Every other package has the same set minus what it does not have, including a `composable/private/` of its own.

The four clusters under `component/` (`form/`, `filter/`, `table/`, `menu/`) deliberately have **no** barrel: they are a way to keep the directory listing readable, not a module boundary. Reach a component in one of them through `component/`'s barrel, or relatively.

**Critical for injection keys**: an injection key **must** always be reached through the barrel of the directory it lives in, never through a deep path. A deep import creates a separate module instance in Vite/rolldown - provider and consumer end up with different `Symbol()` instances and `inject()` returns nothing. So `FluxKanbanInjectionKey` and friends come from the `~flux/components/data` barrel, never from `~flux/components/data/di`.

Most keys live in a package's `data/di.ts`, but not all: `application` declares its own in `data/index.ts`, `statistics` keeps four next to the composables that own them, `FluxDialogInjectionKey` sits in `util/createDialogRenderer.ts` and `FluxFaderInjectionKey` in `FluxFader.vue`. That is fine - the barrel rule is what prevents the duplicate-`Symbol()` bug, not the file a key happens to live in.

**Documented exceptions** (deep imports allowed):
- `~flux/data/timeZones` - too large to include in the data barrel
- `~flux/css/...` - CSS modules, no barrel
- `../FluxX.vue` from `component/primitive/*` and `component/calendar/*` - kept relative to avoid import cycles between primitives and parent components

### 4. Import order

Four groups, **no** blank lines between groups, alphabetic within each group:

1. **External (npm)** - `@`-scoped first (alphabetic), then unscoped (alphabetic)
2. **Internal absolute / parent** - alias paths (`~flux/*`, excluding `/css/`) and `../...`
3. **Local siblings** - `./...`
4. **Styles (last)** - `~flux/css/*`, `*.module.scss`

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

Some npm packages export only TypeScript types and have no runtime entry (e.g. `@fortawesome/fontawesome-common-types`). Always import these with `import type {}` - inline `type` keyword leaves an empty runtime import that Vite/rolldown will try to resolve, which fails for type-only packages.

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

`packages/components/src/component/` groups four clusters into subdirectories, on **name prefix** alone: `FluxForm*` in `form/`, `FluxFilter*` in `filter/`, `FluxTable*` in `table/`, `FluxMenu*` in `menu/`. Everything else stays at the top level, which is why `FluxDataTable`, `FluxToggle`, `FluxContextMenu` and `FluxDatePicker` sit next to the folders instead of inside one. The rule is mechanical on purpose: a new component goes in a folder when its name starts with that prefix, and nowhere else. The CSS module does not follow it - `css/component/` stays flat.

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

Never propose migrating existing inline prop types to `@flux-ui/types` as a cleanup - treat inline definitions as intentional unless the component author explicitly asks to extract them.

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
- `packages/application/src/css/`, `packages/statistics/src/css/`, `packages/flow/src/css/`, `packages/visuals/src/css/`

CSS module class names are compiled in **kebab-case** for the library build (configured in `@basmilius/vite-preset`).

### SCSS mixins

Available mixins (import via `@use '~flux/css/mixin'`):

- `mixin.hover` - hover state helper
- `mixin.focus-ring` - focus ring
- `mixin.breakpoints` - responsive breakpoints
- `mixin.tree-node-classes()` - shared tree node structure (used by TreeView and TreeViewSelect)
- `mixin.elevation($level)` - paints one of the three levels (`'sunken'`, `'surface'`, `'raised'`) and publishes `--surface-current`; unknown levels `@error`
- `mixin.intent($color)` - maps one intent onto the six local `--intent-*` roles
- `mixin.text($size)` - font-size and its line-height together

### Design tokens (CSS custom properties)

All colors are CSS custom properties, in three layers. Reach for them in this order:

1. **Semantic** - `--surface`, `--surface-hover`, `--surface-stroke`, `--foreground`, etc.
2. **Intent** - six intents (`gray`, `primary`, `danger`, `info`, `success`, `warning`) times nine roles: `--danger-solid`, `--primary-text`, `--info-soft`, etc. Inside a component that took `mixin.intent()`, read the local `--intent-*` contract instead.
3. **Palette** - `--palette-gray-600` and friends (six scales, stops 25-950). Only to reshade the interface or to build a token out of; a component that reaches here answers for both themes itself.

The palette is absolute: a stop is the same color in both themes. Themes differ in the semantic layer, through `light-dark()`. The unprefixed `--gray-*` / `--primary-*` scales were removed in the color token major; `--primary-500` no longer exists, but `--primary-solid` does.

Two things freeze a token on `:root` and must be avoided: registering a color token through `@property` with `syntax: '<color>'`, and deriving an alpha variant with relative color syntax over a token that holds a `light-dark()`. Over a palette stop that syntax is fine.

Both gates run in CI and must stay green: `bun scripts/check-contrast.ts` (the contrast contract) and `bun scripts/check-palette-refs.ts` (no references to the removed scales).

### CSS property order

The `.editorconfig` defines a strict CSS property order (font → position → display → flex → box-sizing → dimensions → margin → padding → ... → background → box-shadow). Follow this order in new SCSS blocks.

### Spacing & sizing (3px grid)

All spacing and dimension values are based on a **3px grid** - use multiples of 3px for `width`, `height`, `padding`, `margin`, `gap`, and positional offsets (`top` / `right` / `bottom` / `left`). For example, use `321px`, not `320px`.

These follow their own scale and are **not** bound to the 3px grid:
- Hairline borders / outlines (`1px`, `2px`)
- `border-radius`
- `font-size` (type scale, e.g. `13px`, `14px`, `15px`)

### The 24px line box

The base line height is **24px**: `line-height: 1.6` on `body` (`css/reset.scss`) x `--font-size: 15px` (`css/variables.scss`). Fixed-height components that must fit inside a line of text lean on this with a negative `margin-block` that pulls their margin box back to exactly 24px, e.g. `FluxBadge` (`height: 28px` + `margin-block: -2px`) and `FluxSkeleton.isText` (`margin-block: calc((1lh - 1em) / 2)`, self-adjusting).

Change the body line height and every one of those components silently stretches its line and falls off the 3px grid. Note that `reset.scss` sets it on `body` (so it inherits everywhere, including flex contexts like tab bar items and table cells) while `typography.scss` only sets it on `h1`-`h6` and `p`; editing typography therefore does not affect badges.

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
| `visuals.ts`    | Visual effect component types                           |

`@flux-ui/types` has **no build step** - it exports TypeScript source directly.

Common types to know:
- `FluxColor`: `'gray' | 'primary' | 'danger' | 'info' | 'success' | 'warning'`
- `FluxSize`: `'small' | 'medium' | 'large'`
- `FluxIconName`: FontAwesome icon name (from `@fortawesome/fontawesome-common-types`)
- `FluxPressableType`: `'button' | 'link' | 'route' | 'none'`
- `FluxTo`: Vue Router location object

---

## Internals package (`@flux-ui/internals`)

Shared utilities and composables used across packages. Built with `tsdown`.

What lives here is what a component library needs and a general-purpose package
should not carry: focus management, vnode work and i18n. Generic behaviour
(gestures, springs, observers, storage, clamping, colour conversion) lives in
`@basmilius/common` and `@basmilius/utils`, and a component imports it **straight
from there**. `internals` does not re-export it: one function, one import path.

Utilities (`packages/internals/src/util/`):
- Focus helpers - `wrapFocus`, `focusTrap`, `getFocusableElement`, `getFocusableElements`, `getKeyboardFocusableElements`, `getBidirectionalFocusElement`
- VNode helpers - `flattenVNodeTree`, `getComponentName`, `getComponentProps`
- Types - `TemplateElement`, `TemplateRef` (the shape a Flux template ref has; resolve one with `unwrapElement` from `@basmilius/common`)
- Misc - `isActiveElement`, `isSSR`, `warn`

Composables (`packages/internals/src/composable/`):
- Focus traps - `useFocusTrap`, `useFocusTrapLock`, `useFocusTrapReturn`, `useFocusTrapSubscription`, `useFocusZone`
- Calendar - `useCalendar`, `useCalendarMonthSwitcher`, `useCalendarTimeGrid`, `useCalendarYearSwitcher`
- Misc - `useKeyboardGrab`, `useRemembered` (wraps common's with the `flux/` prefix and Luxon serialization)
- Translations - `createTranslate`

`useFocusZone` takes an optional `ignore?: string` selector (threaded through `getFocusableElements` / `getFocusableElement` / `getBidirectionalFocusElement`) to exclude a subtree from roving focus. `FluxMenu` uses it with `ignore: '[data-flux-menu-pane]'` so an interactive component inside a `FluxMenuPane` (color picker, slider, search field) keeps its own keyboard behavior. The shared `getFocusableElements` default is deliberately unchanged so focus traps still reach those controls via Tab.

---

## Shared tree view logic

Composable: `packages/components/src/composable/private/useTreeView.ts`

Exports:
- `TreeBaseOption`, `TreeFlatNode<T>` - option types
- `flattenVisible(nodes, depth, expanded)` - flatten only expanded nodes
- `flattenAll(nodes, depth)` - flatten all nodes
- `getLevelColor(depth, levelColors?)` - resolve color for a depth level
- `INITIAL_HIGHLIGHTED_INDEX` - constant (-1)
- `useTreeView({ expandedIds, nodeElementRefs, visibleNodes })` - returns `{ highlightedIndex, toggleExpand, onExpandClick, onKeyNavigate }`

CSS mixin: `packages/components/src/css/mixin/tree-node.scss`
Use via `@include mixin.tree-node-classes()` in a CSS module file.

---

## Public composables (`packages/components/src/composable/`)

Exported publicly:
- `useBreakpoints()` - reactive breakpoint detection
- `useDisabled(disabledRef)` - resolves disabled state (considers parent `FluxDisabled` injection)

Injection composables (not public, used internally):
- `useAdaptiveGroupInjection`, `useCalendarInjection`, `useDisabledInjection`, `useExpandableGroupInjection`
- `useFilterInjection`, `useFlyoutInjection`, `useFormCheckboxGroupInjection`, `useFormFieldInjection`, `useFormRadioGroupInjection`
- `useKanbanInjection`, `useSegmentedControlInjection`, `useTabBarInjection`, `useTableInjection`, `useTooltipInjection`

---

## Data layer (`packages/components/src/data/`)

Functions exported from the package root:
- `fluxRegisterIcons(icons)` - register FontAwesome icons
- `showAlert(options)`, `showConfirm(options)`, `showPrompt(options)` - programmatic overlays
- `showSnackbar(options)` - programmatic snackbar
- `useFluxStore()` - global state; a plain `reactive()` module store, not Pinia (the workspace has no Pinia dependency)
- `isFluxFormSelectGroup(item)`, `isFluxFormSelectOption(item)` - type guards

---

## Translations

`vue-i18n` is a peer dependency of every package that renders text. Each one keeps a
flat English dictionary in `src/data/i18n.ts` and turns it into a composable with
`createTranslate(english)` from `@flux-ui/internals`, next to it:

| Package     | Keys                  |
|-------------|-----------------------|
| components  | `flux.*`              |
| ai          | `flux.ai.*`           |
| application | `flux.application.*`  |
| flow        | `flux.flow.*`         |
| statistics  | none                  |

Every package calls it `useTranslate`, in `composable/private/`, and none of them
export it: the dictionary is an implementation detail of the components that render
those strings. There is no `useAiTranslate` or `useFlowTranslate` - the package a
component lives in already says which dictionary it reaches.

`createTranslate` reads `useI18n({useScope: 'global'})`, so the app's i18n instance
must be created with `legacy: false`. A key the app did not translate falls back to
the dictionary, which is why a component never renders a raw key path. Statistics
has no strings of its own; it uses the dictionary-less variant to put the series,
slice and axis names it is given through the same translations, handing back a name
without a message unchanged.

A new string means a new key in the package's `i18n.ts` **and** in
`docs/.vitepress/data/translations/<package>.ts` (nl, fr, de, sv). Then run
`bun scripts/generate-translations.ts` to rewrite the blocks on the translations
pages; CI runs the same script with `--check`.

---

## Documentation structure

Documentation site uses **VitePress** with custom plugins.

| Path                                        | Purpose                                  |
|---------------------------------------------|------------------------------------------|
| `docs/components/<name>.md`                 | Component documentation pages           |
| `docs/components/<name>/*.md`               | Multi-part pages (e.g. `attention/alert.md`) |
| `docs/code/components/<name>/*.vue`         | Runnable code examples, with `preview.vue` for the `::: render` block |
| `docs/{application,statistics,flow,visuals}/` | Per-package doc sections, same layout  |
| `docs/guide/`                               | Introduction, composables and API pages  |
| `docs/.vitepress/config.ts`                 | VitePress + Vite configuration           |
| `docs/.vitepress/component-navigation.ts`  | Sidebar navigation                       |
| `docs/.vitepress/theme/icons.ts`            | Globally registered icons for examples   |
| `docs/.vitepress/theme/`                    | Custom theme                             |

### Docs page format

Each component `.md` file uses YAML frontmatter for the props/emits API table (rendered by `<FrontmatterDocs/>`), followed by:
1. Description paragraph
2. `::: render` block (preview)
3. Tips / notes
4. `<FrontmatterDocs/>` tag
5. `## Examples` section with `::: example` blocks
6. `## Used components` section

Code examples reference `.vue` files. Paths are relative to the `.md` file, so a
single-part page uses `../code/...` and a multi-part page `../../code/...`:
```markdown
::: example Title || Description
example=../code/components/component-name/example.vue
:::
```

The `requiredIcons` frontmatter lists **only** icons the component renders itself
(e.g. `xmark` for the delete button on `FluxBadge`); it tells consumers what to
register via `fluxRegisterIcons`. Icons that merely appear in an example do not
belong there, but they do have to be registered in `docs/.vitepress/theme/icons.ts`,
otherwise they render blank on the docs site.

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

- `@basmilius/vite-preset` - shared Vite configuration preset (CSS modules, library mode, etc.)
- `@basmilius/common` / `@basmilius/utils` - shared utilities by the author
- CSS module class names: `kebab` in library build, `mangled` in docs build
- Vue 3 only; Options API intentionally disabled
- `luxon` and `vue` are externalized (not bundled) in library builds
- `imask` used for input masking (BIC, IBAN, VAT)
- `lodash-es` used in `internals` and `statistics`; it was deliberately removed from `components`, do not reintroduce it there
