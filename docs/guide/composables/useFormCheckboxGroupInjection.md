# useFormCheckboxGroupInjection

This composable provides access to the [Checkbox group](../../components/form/checkbox-group) context. It lets a checkbox of your own read whether a value is selected, toggle it, and inherit the group's disabled, readonly and error state instead of taking those as props.

## Usage

```ts
import { useFormCheckboxGroupInjection } from '@flux-ui/components';

const { modelValue, disabled, isReadonly, error, has, toggle } = useFormCheckboxGroupInjection();
```

## Type declarations

```ts
declare function useFormCheckboxGroupInjection(): FluxFormCheckboxGroupInjection;

type FluxFormCheckboxGroupInjection = {
    readonly modelValue: Ref<FluxFormCheckboxGroupValue[]>;
    readonly disabled: Ref<boolean>;
    readonly isReadonly: Ref<boolean>;
    readonly error: Ref<string | null | undefined>;

    has(value: FluxFormCheckboxGroupValue): boolean;
    toggle(value: FluxFormCheckboxGroupValue): void;
};
```

## Used by

- [Checkbox group](../../components/form/checkbox-group)
