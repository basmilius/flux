# Types

All public TypeScript types are exported from `@flux-ui/types`. This page lists the types you'll most commonly run into when consuming the components (the ones that show up in component props, slot bindings and store helpers).

```ts
import type { FluxColor, FluxIconName, FluxSize } from '@flux-ui/types';
```

## Common

### `FluxAlignment`

```ts
type FluxAlignment = 'start' | 'center' | 'end';
```

Used by layout components such as [Overflow bar](../../components/overflow-bar) and [Flex](../../components/layout/flex/).

### `FluxAlign`

```ts
type FluxAlign = FluxAlignment | 'stretch' | 'baseline';
```

The cross-axis alignment of a [Flex](../../components/layout/flex/) container.

### `FluxColor`

```ts
type FluxColor = 'gray' | 'primary' | 'danger' | 'info' | 'success' | 'warning';
```

The six semantic colors that drive everything from [Badge](../../components/badge) and [Notice](../../components/attention/notice) to [Avatar](../../components/avatar) status dots.

### `FluxDirection`

```ts
type FluxDirection = 'horizontal' | 'vertical';
```

### `FluxFlexWrap`

```ts
type FluxFlexWrap = 'wrap' | 'nowrap' | 'wrap-reverse';
```

### `FluxIconName`

```ts
type FluxIconName = string; // re-export of FontAwesome's IconName
```

Any Font Awesome icon name. The icon must be registered through [`fluxRegisterIcons`](./helpers) before it can be used.

### `FluxIconStyle`

```ts
type FluxIconStyle = 'solid' | 'regular' | 'light' | 'thin' | 'duotone' | 'brands';
```

The Font Awesome style an [Icon](../../components/icon) is drawn in.

### `FluxInputMask`

```ts
type FluxInputMask = 'bic' | 'iban' | 'vat';
```

The built-in masks for [Form input](../../components/form/input).

### `FluxInputType`

```ts
type FluxInputType =
    | 'color'
    | 'date'
    | 'datetime-local'
    | 'email'
    | 'file'
    | 'month'
    | 'number'
    | 'password'
    | 'search'
    | 'tel'
    | 'text'
    | 'time'
    | 'url'
    | 'week';
```

### `FluxJustify`

```ts
type FluxJustify = FluxAlignment | 'between' | 'around' | 'evenly';
```

The main-axis distribution of a [Flex](../../components/layout/flex/) container.

### `FluxPressableType`

```ts
type FluxPressableType = 'button' | 'link' | 'route' | 'none';
```

Determines how a pressable component renders: as a `<button>`, an `<a>` link, a Vue Router `<RouterLink>`, or as a non-interactive element.

### `FluxSize`

```ts
type FluxSize = 'small' | 'medium' | 'large';
```

### `FluxTo`

```ts
type FluxTo = {
    name?: string;
    path?: string;
    hash?: string;
    query?: Record<string, string | (string | null)[] | null | undefined>;
    params?: Record<string, string | number>;
    state?: Record<string, string | number | boolean>;
    append?: boolean;
    replace?: boolean;
};
```

The Vue Router location object accepted by every `to` prop. Forwarded directly to `<RouterLink>`.

### `FluxAutoCompleteType`

A union of every valid HTML `autocomplete` token (`name`, `email`, `cc-number`, `address-level2`, etc.) plus their grouped variants (`shipping email`, `billing tel`, …). Accepts arbitrary strings as a fallback.

### `FluxMaybePromise`

```ts
type FluxMaybePromise<T> = T | Promise<T>;
```

Used by APIs that accept either a synchronous or an asynchronous value.

## Forms

### `FluxFormInputBaseProps`

```ts
type FluxFormInputBaseProps = {
    readonly autoFocus?: boolean;
    readonly disabled?: boolean;
    readonly error?: string | null;
    readonly isLoading?: boolean;
    readonly isReadonly?: boolean;
    readonly isSecondary?: boolean;
    readonly name?: string;
    readonly placeholder?: string;
};
```

The shared shape of every form input component (`FluxFormInput`, `FluxFormSelect`, `FluxFormDateInput`, …). Reuse it when you build your own input wrappers.

### `FluxFormSelectEntry`

```ts
type FluxFormSelectGroup = {
    readonly icon?: FluxIconName;
    readonly label: string;
    readonly value?: never;
};

type FluxFormSelectOption = {
    readonly badge?: string;
    readonly command?: string;
    readonly commandIcon?: FluxIconName;
    readonly icon?: FluxIconName;
    readonly imageAlt?: string;
    readonly imageSrc?: string;
    readonly label: string;
    readonly selectable?: boolean;
    readonly value: string | number | null;
};

type FluxFormSelectEntry = FluxFormSelectGroup | FluxFormSelectOption;
```

The shape of items inside [Form select](../../components/form/select). Use [`isFluxFormSelectGroup`](./helpers) and [`isFluxFormSelectOption`](./helpers) to narrow at runtime.

### `FluxFormSelectValue`

```ts
type FluxFormSelectValueSingle = string | number | null;
type FluxFormSelectValue = FluxFormSelectValueSingle | FluxFormSelectValueSingle[];
```

### `FluxFormSelectOptions`

```ts
type FluxFormSelectOptions = [FluxFormSelectEntry | null, FluxFormSelectOption[]];
```

One rendered group of a [Form select](../../components/form/select): its heading entry (or `null` for the ungrouped options) paired with the options that sit under it.

### `FluxFormTreeViewSelectOption`

```ts
type FluxFormTreeViewSelectOption = {
    readonly id: string | number;
    readonly label: string;
    readonly icon?: FluxIconName;
    readonly selectable?: boolean;
    readonly children?: FluxFormTreeViewSelectOption[];
};
```

The shape of items inside [Tree view select](../../components/form/tree-view-select).

### `FluxFormTreeViewSelectValue`

```ts
type FluxFormTreeViewSelectValueSingle = string | number | null;
type FluxFormTreeViewSelectValue = FluxFormTreeViewSelectValueSingle | FluxFormTreeViewSelectValueSingle[];
```

The value of a [Tree view select](../../components/form/tree-view-select). The array form is what a multi-select binds to.

## Filters

### `FluxFilterState`

```ts
type FluxFilterValueSingle = DateTime | string | boolean | number | null;
type FluxFilterValue = FluxFilterValueSingle | FluxFilterValueSingle[];
type FluxFilterState<T extends Record<string, unknown> = Record<string, FluxFilterValue>> = T;
```

The current value of a [Filter](../../components/filter) keyed by filter `name`. Pass a generic to type the state shape for custom filter types.

### `FluxFilterDefinition`

```ts
type FluxFilterDefinition<TValue = FluxFilterValue> = {
    readonly type: string;
    readonly name: string;
    readonly label: string;
    readonly icon?: FluxIconName;
    readonly disabled?: boolean;
    readonly defaultValue?: TValue;
    getValueLabel(value: TValue): Promise<string | null>;
    onChange?(value: TValue): void;
    onClear?(): void;
};
```

The runtime metadata returned by a filter component's `__filterDefinitionFactory`. Built via [`defineFilter`](./helpers) inside `defineOptions`. `FluxFilterBase` calls the factory on each slot VNode to build the menu, badge labels and lifecycle hooks.

### `FluxFilterBase` and the entry types

```ts
type FluxFilterBase = {
    readonly icon?: FluxIconName;
    readonly label: string;
    readonly name: string;
    readonly disabled?: boolean;
    getValueLabel(value: FluxFilterValue): Promise<string | null>;
};

type FluxFilterDateEntry = FluxFilterBase & { readonly type: 'date' };
type FluxFilterDateRangeEntry = FluxFilterBase & { readonly type: 'dateRange' };
type FluxFilterOptionEntry = FluxFilterBase & { readonly type: 'option' };
type FluxFilterOptionsEntry = FluxFilterBase & { readonly type: 'options' };
type FluxFilterRangeEntry = FluxFilterBase & { readonly type: 'range' };

type FluxFilterItem =
    | FluxFilterDateEntry
    | FluxFilterDateRangeEntry
    | FluxFilterOptionEntry
    | FluxFilterOptionsEntry
    | FluxFilterRangeEntry;
```

One registered filter as [Filter](../../components/filter) sees it. `type` narrows the union, so a switch over `FluxFilterItem` covers every filter kind.

### `FluxFilterOptionRow`

```ts
type FluxFilterOptionHeader = {
    readonly title: string;
};

type FluxFilterOptionItem = {
    readonly icon?: FluxIconName;
    readonly label: string;
    readonly value: FluxFilterValueSingle;
};

type FluxFilterOptionRow = FluxFilterOptionHeader | FluxFilterOptionItem;
```

The rows of an option list. A header groups the items that follow it; it carries no value and cannot be selected.

### `FluxFilterSpec` and the per-filter specs

```ts
type FluxFilterSpec = {
    readonly icon?: FluxIconName;
    readonly label: string;
    readonly name: string;
    readonly disabled?: boolean;
    readonly defaultValue?: FluxFilterValue;
    onChange?(value: FluxFilterValue): void;
    onClear?(): void;
};

type FluxFilterDateSpec = FluxFilterSpec;
type FluxFilterDateRangeSpec = FluxFilterSpec;

type FluxFilterOptionSpec = FluxFilterSpec & {
    readonly options: FluxFilterOptionRow[];
};

type FluxFilterOptionsSpec = FluxFilterSpec & {
    readonly options: FluxFilterOptionRow[];
};

type FluxFilterOptionAsyncSpec = FluxFilterSpec & {
    fetchOptions(ids: FluxFilterValue[]): Promise<FluxFilterOptionRow[]>;
};

type FluxFilterOptionsAsyncSpec = FluxFilterSpec & {
    fetchOptions(ids: FluxFilterValue[]): Promise<FluxFilterOptionRow[]>;
};

type FluxFilterRangeSpec = FluxFilterSpec & {
    formatter?(value: number): string;
};
```

The props each filter component takes. The `Async` variants fetch their rows on demand instead of taking a fixed `options` array.

## Notify objects

The objects passed to the programmatic [Alert](../../components/attention/alert), [Confirm](../../components/attention/confirm), [Prompt](../../components/attention/prompt), [Snackbar](../../components/attention/snackbar) and tooltip APIs.

### `FluxAlertObject`

```ts
type FluxAlertObject = {
    readonly id: number;
    readonly icon?: FluxIconName;
    readonly title: string;
    readonly message: string;

    onClose(): void;
};
```

### `FluxConfirmObject`

```ts
type FluxConfirmObject = FluxAlertObject & {
    onCancel(): void;
    onConfirm(): void;
};
```

### `FluxPromptObject`

```ts
type FluxPromptObject = FluxAlertObject & {
    readonly fieldLabel: string;
    readonly fieldPlaceholder?: string;
    readonly fieldType?: FluxInputType;

    onCancel(): void;
    onConfirm(text: string): void;
};
```

### `FluxSnackbarObject`

```ts
type FluxSnackbarObject = {
    readonly id: number;
    readonly actions?: Record<string, string>;
    readonly color?: FluxColor;
    readonly icon?: FluxIconName;
    readonly isCloseable?: boolean;
    readonly isLoading?: boolean;
    readonly isRendered?: boolean;
    readonly message?: string;
    readonly progressIndeterminate?: boolean;
    readonly progressMax?: number;
    readonly progressMin?: number;
    readonly progressStatus?: string;
    readonly progressValue?: number;
    readonly subMessage?: string;
    readonly title?: string;

    onAction?(actionKey: string): void;
    onClose?(): void;
};
```

### `FluxTooltipObject`

```ts
type FluxTooltipObject = {
    readonly id: number;
    readonly content?: string;
    readonly contentSlot?: Function;
    readonly direction: FluxDirection;
    readonly origin?: HTMLElement;
};
```

One tooltip in the store. `origin` is the element the tooltip anchors to, and `contentSlot` holds a render function when the tooltip was given markup instead of a plain `content` string. Only one tooltip is visible at a time; the store exposes it as `tooltip`.

## Component-specific types

These types are exported from `@flux-ui/types` but are typically only referenced when you wrap or extend the corresponding component:

| Type                                                                   | Used by                                             |
|------------------------------------------------------------------------|-----------------------------------------------------|
| `FluxButtonProps` / `FluxButtonEmits` / `FluxButtonSlots`              | [Button](../../components/button) variants          |
| `FluxButtonSize`                                                       | [Button](../../components/button)                   |
| `FluxCommandSource` / `FluxCommandSourceItem` / `FluxCommandSubAction` | [Command palette](../../components/command-palette) |
| `FluxFocalPointObject`                                                 | [Focal point](../../components/focal-point)         |
| `FluxKanbanMoveEvent` / `FluxKanbanMoveColumnEvent` / `FluxKanbanSwimlaneMoveEvent` | [Kanban](../../components/kanban/)     |
| `FluxTreeViewOption`                                                   | [Tree view](../../components/tree-view)             |

## Statistics

### `FluxStatisticsChange`

```ts
type FluxStatisticsChange = {
    readonly color?: FluxColor;
    readonly icon?: FluxIconName;
    readonly value: string;
};
```

The trend indicator passed to [`FluxStatisticsKpi`](../../statistics/components/kpi) and [`FluxStatisticsChange`](../../statistics/components/change).

## Visuals

The types exported by [`@flux-ui/visuals`](../../visuals/introduction/installation).

### `FluxVisualBorderBeamVariant`

```ts
type FluxVisualBorderBeamVariant = 'sm' | 'md' | 'line' | 'pulse-inner' | 'pulse-outside';
```

### `FluxVisualHighlighterVariant`

```ts
type FluxVisualHighlighterVariant =
    | 'highlight'
    | 'box'
    | 'circle'
    | 'underline'
    | 'strike-through'
    | 'crossed-off'
    | 'bracket';
```

### `FluxVisualHighlighterGroupProps`

```ts
type FluxVisualHighlighterGroupProps = {
    readonly variant?: FluxVisualHighlighterVariant;
    readonly color?: string;
    readonly strokeWidth?: number;
    readonly animationDuration?: number;
    readonly iterations?: number;
    readonly padding?: number;
    readonly multiline?: boolean;
    readonly whenInView?: boolean;
};
```

The annotation defaults a [Highlighter group](../../visuals/components/highlighter-group) hands to the highlighters inside it. A highlighter's own props always win.
