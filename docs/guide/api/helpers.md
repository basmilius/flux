# Helper functions

Utility helpers and type guards for working with Flux components.

## defineFilter

Macro for building a [Filter](../../components/filter) definition factory. Call it on the top level of `<script setup>` so `FluxFilter` and `FluxFilterBar` can build the runtime definition (label, icon, badge text, lifecycle, …) from your component's props.

::: warning Vite plugin required
`defineFilter()` is a compile-time macro implemented by `defineFilterMacro` from `@flux-ui/components/vite`. Add it to the `plugins` array of your Vite config in any project that defines its own filters. Without the plugin the call is left as a no-op and the filter will not register.
:::

```ts
import { defineFilter, useFilterInjection } from '@flux-ui/components';
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

The factory is invoked by `FluxFilterBase` on each filter VNode's props, so it must be a self-contained pure function: no references to local `<script setup>` variables. The `defineFilterMacro()` Vite plugin (from `@basmilius/vite-preset`) compiles the call into the appropriate `defineOptions({ __filterDefinitionFactory: ... })`.

## isFluxFilterOptionHeader

Checks whether a [Filter option](../../components/filter/option) row is a header (sub-section title) instead of a selectable item.

```ts
import { isFluxFilterOptionHeader } from '@flux-ui/components';

if (isFluxFilterOptionHeader(row)) {
    console.log('Header:', row.title);
}
```

## isFluxFilterOptionItem

Checks whether a [Filter option](../../components/filter/option) row is a selectable item with a value.

```ts
import { isFluxFilterOptionItem } from '@flux-ui/components';

if (isFluxFilterOptionItem(row)) {
    console.log('Selectable:', row.label, '→', row.value);
}
```

## isFluxFormSelectGroup

Checks if a given item is a [Form select](../../components/form/select/) group.

```ts
import { isFluxFormSelectGroup } from '@flux-ui/components';

if (isFluxFormSelectGroup(item)) {
    console.log('This is a group with children:', item.label);
}
```

## isFluxFormSelectOption

Checks if a given item is a [Form select](../../components/form/select/) option.

```ts
import { isFluxFormSelectOption } from '@flux-ui/components';

if (isFluxFormSelectOption(item)) {
    console.log('This is a selectable option with value:', item.value);
}
```

## Type declarations

```ts
declare function defineFilter<TProps, TValue extends FluxFilterValue = FluxFilterValue>(
    factory: (props: TProps) => FluxFilterDefinition<TValue>
): (props: TProps) => FluxFilterDefinition<TValue>;

declare function isFluxFilterOptionHeader(item: object): item is FluxFilterOptionHeader;

declare function isFluxFilterOptionItem(item: object): item is FluxFilterOptionItem;

declare function isFluxFormSelectGroup(item: unknown): item is FluxFormSelectGroup;

declare function isFluxFormSelectOption(item: unknown): item is FluxFormSelectOption;
```
