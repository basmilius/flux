# Helper functions

The helpers and type guards `@flux-ui/filter` exports for building and reading filters.

## defineFilter

Macro for building a [Filter](../components/filter) definition factory. Call it on the top level of `<script setup>` so `FluxFilter` and `FluxFilterBar` can build the runtime definition (label, icon, badge text, lifecycle, …) from your component's props.

::: warning Vite plugin required
`defineFilter()` is a compile-time macro implemented by `defineFilterMacro` from `@flux-ui/filter/vite`. Add it to the `plugins` array of your Vite config in any project that defines its own filters. Without the plugin the call is left as a no-op and the filter will not register.
:::

```ts
import { defineFilter, useFilterInjection } from '@flux-ui/filter';
import type { FluxFilterValue, FluxIconName } from '@flux-ui/types';

type Props = {
    readonly icon?: FluxIconName;
    readonly label: string;
    readonly name: string;
    readonly disabled?: boolean;
    readonly defaultValue?: FluxFilterValue;
};

defineFilter<Props>(p => ({
    type: 'toggle',
    name: p.name,
    label: p.label,
    icon: p.icon,
    disabled: p.disabled,
    defaultValue: p.defaultValue,
    async getValueLabel(value) {
        return value === true ? 'On' : value === false ? 'Off' : null;
    }
}));
```

The factory is invoked by `FluxFilterBase` on each filter VNode's props, so it must be a self-contained pure function: no references to local `<script setup>` variables. The `defineFilterMacro()` Vite plugin compiles the call into the appropriate `defineOptions({ __filterDefinitionFactory: ... })`.

Because it may not reach into the component, the factory cannot call `useTranslate()` either. That is what its second argument is for: a context carrying the same `translate` the Flux components render their own strings with, so a value label follows the visitor's language. It reaches every Flux key, not only the filter ones. `FluxFilterOptions` uses it to summarize a multiple selection.

```ts
defineFilter<Props>((p, {translate}) => ({
    ...pickFilterCommon(p),
    type: 'options',
    async getValueLabel(value) {
        if (!Array.isArray(value) || value.length === 0) {
            return null;
        }

        return translate('flux.nSelected', {n: value.length});
    }
}));
```

## isFluxFilterOptionHeader

Checks whether a [Filter option](../components/option) row is a header (sub-section title) instead of a selectable item.

```ts
import { isFluxFilterOptionHeader } from '@flux-ui/filter';

if (isFluxFilterOptionHeader(row)) {
    console.log('Header:', row.title);
}
```

## isFluxFilterOptionItem

Checks whether a [Filter option](../components/option) row is a selectable item with a value.

```ts
import { isFluxFilterOptionItem } from '@flux-ui/filter';

if (isFluxFilterOptionItem(row)) {
    console.log('Selectable:', row.label, '→', row.value);
}
```

## Type declarations

```ts
type FluxFilterDefinitionContext = {
    readonly translate: FluxTranslate;
};

type FluxFilterDefinitionFactory<TProps = any, TValue extends FluxFilterValue = FluxFilterValue> =
    (props: TProps, context: FluxFilterDefinitionContext) => FluxFilterDefinition<TValue>;

declare function defineFilter<TProps, TValue extends FluxFilterValue = FluxFilterValue>(
    factory: FluxFilterDefinitionFactory<TProps, TValue>
): FluxFilterDefinitionFactory<TProps, TValue>;

declare function isFluxFilterOptionHeader(item: object): item is FluxFilterOptionHeader;

declare function isFluxFilterOptionItem(item: object): item is FluxFilterOptionItem;
```
