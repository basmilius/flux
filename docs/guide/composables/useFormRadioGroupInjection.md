# useFormRadioGroupInjection

This composable provides access to the [Radio group](../../components/form/radio-group) context. It lets a radio of your own select a value and inherit the group's name, disabled, readonly and error state instead of taking those as props.

The shared `name` is what makes the radios one group to the browser, so a component that renders its own input has to bind it.

## Usage

```ts
import { useFormRadioGroupInjection } from '@flux-ui/components';

const { name, modelValue, disabled, isReadonly, error, select } = useFormRadioGroupInjection();
```

## Type declarations

```ts
declare function useFormRadioGroupInjection(): FluxFormRadioGroupInjection;

type FluxFormRadioGroupInjection = {
    readonly name: string;
    readonly modelValue: Ref<FluxFormRadioGroupValue | undefined>;
    readonly disabled: Ref<boolean>;
    readonly isReadonly: Ref<boolean>;
    readonly error: Ref<string | null | undefined>;

    select(value: FluxFormRadioGroupValue): void;
};
```

## Used by

- [Radio group](../../components/form/radio-group)
