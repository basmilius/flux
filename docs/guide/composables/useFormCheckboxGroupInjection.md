# useFormCheckboxGroupInjection

This composable provides access to the [Checkbox group](../../components/form/checkbox/group) context. It lets a checkbox of your own read whether a value is selected, toggle it, and inherit the group's disabled, readonly and error state instead of taking those as props.

## Usage

```ts
import { useFormCheckboxGroupInjection } from '@flux-ui/components';

const group = useFormCheckboxGroupInjection();

const isChecked = computed(() => group?.has(value) ?? false);
```

It returns `null` outside a `FluxFormCheckboxGroup`, so a checkbox that also works standalone reaches for it optionally.

## Type declarations

```ts
declare function useFormCheckboxGroupInjection(): FluxFormCheckboxGroupInjection | null;

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

- [Checkbox group](../../components/form/checkbox/group)
