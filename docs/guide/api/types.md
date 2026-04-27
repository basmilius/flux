<script setup>
    import { FluxPane, FluxTable, FluxTableRow, FluxTableCell, FluxTableHeader } from '@flux-ui/components';
</script>

# Types

All public TypeScript types are exported from `@flux-ui/types`. This page lists the types you'll most commonly run into when consuming the components — the ones that show up in component props, slot bindings and store helpers.

```ts
import type { FluxColor, FluxIconName, FluxSize } from '@flux-ui/types';
```

## Common

### `FluxAlignment`

```ts
type FluxAlignment = 'start' | 'center' | 'end';
```

Used by layout components such as [Overflow bar](../../components/overflow-bar) and [Stack](../../components/layout/stack).

### `FluxColor`

```ts
type FluxColor = 'gray' | 'primary' | 'danger' | 'info' | 'success' | 'warning';
```

The six semantic colours that drive everything from [Badge](../../components/badge) and [Notice](../../components/attention/notice) to [Avatar](../../components/avatar) status dots.

### `FluxDirection`

```ts
type FluxDirection = 'horizontal' | 'vertical';
```

### `FluxIconName`

```ts
type FluxIconName = string; // re-export of FontAwesome's IconName
```

Any Font Awesome icon name. The icon must be registered through [`fluxRegisterIcons`](./helpers) before it can be used.

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

### `FluxPressableType`

```ts
type FluxPressableType = 'button' | 'link' | 'route' | 'none';
```

Determines how a pressable component renders — as a `<button>`, an `<a>` link, a Vue Router `<RouterLink>`, or as a non-interactive element.

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
    readonly isCondensed?: boolean;
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

## Filters

### `FluxFilterState`

```ts
type FluxFilterValueSingle = DateTime | string | boolean | number | null;
type FluxFilterValue = FluxFilterValueSingle | FluxFilterValueSingle[];
type FluxFilterState = Record<string, FluxFilterValue>;
```

The current value of a [Filter](../../components/filter) keyed by filter `name`.

### `FluxFilterSpecMap` / `FluxFilterEntryMap`

These two record types map filter type names (`'date'`, `'option'`, `'optionAsync'`, …) to their corresponding spec and entry types — useful when you build a generic filter wrapper.

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

## Component-specific types

These types are exported from `@flux-ui/types` but are typically only referenced when you wrap or extend the corresponding component:

<FluxPane>
    <FluxTable>
        <template #header>
            <FluxTableRow>
                <FluxTableHeader>Type</FluxTableHeader>
                <FluxTableHeader>Used by</FluxTableHeader>
            </FluxTableRow>
        </template>
        <FluxTableRow>
            <FluxTableCell><code>FluxButtonProps</code> / <code>FluxButtonEmits</code> / <code>FluxButtonSlots</code></FluxTableCell>
            <FluxTableCell><a href="../../components/button">Button</a> variants</FluxTableCell>
        </FluxTableRow>
        <FluxTableRow>
            <FluxTableCell><code>FluxButtonSize</code></FluxTableCell>
            <FluxTableCell><a href="../../components/button">Button</a></FluxTableCell>
        </FluxTableRow>
        <FluxTableRow>
            <FluxTableCell><code>FluxCommandSource</code> / <code>FluxCommandSourceItem</code> / <code>FluxCommandSubAction</code></FluxTableCell>
            <FluxTableCell><a href="../../components/command-palette">Command palette</a></FluxTableCell>
        </FluxTableRow>
        <FluxTableRow>
            <FluxTableCell><code>FluxFocalPointObject</code></FluxTableCell>
            <FluxTableCell><a href="../../components/focal-point">Focal point</a></FluxTableCell>
        </FluxTableRow>
        <FluxTableRow>
            <FluxTableCell><code>FluxLegendObject</code></FluxTableCell>
            <FluxTableCell><a href="../../components/legend">Legend</a></FluxTableCell>
        </FluxTableRow>
        <FluxTableRow>
            <FluxTableCell><code>FluxPercentageBarItemObject</code></FluxTableCell>
            <FluxTableCell><a href="../../components/percentage-bar">Percentage bar</a></FluxTableCell>
        </FluxTableRow>
        <FluxTableRow>
            <FluxTableCell><code>FluxSegmentedControlItemObject</code></FluxTableCell>
            <FluxTableCell><a href="../../components/segmented-control">Segmented control</a></FluxTableCell>
        </FluxTableRow>
        <FluxTableRow>
            <FluxTableCell><code>FluxTreeViewOption</code></FluxTableCell>
            <FluxTableCell><a href="../../components/tree-view">Tree view</a></FluxTableCell>
        </FluxTableRow>
    </FluxTable>
</FluxPane>

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
