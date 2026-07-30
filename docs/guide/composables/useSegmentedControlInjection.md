# useSegmentedControlInjection

This composable provides access to the [Segmented control](../../components/segmented-control) context. It lets an item of your own select a value, read the control's size, and register its element so the control can move the indicator to it.

Outside a `FluxSegmentedControl` it returns a no-op context, so a component that uses it stays safe to render on its own.

## Usage

```ts
import { useSegmentedControlInjection } from '@flux-ui/components';

const { modelValue, size, select, registerItem, unregisterItem } = useSegmentedControlInjection();
```

## Type declarations

```ts
declare function useSegmentedControlInjection(): FluxSegmentedControlInjection;

type FluxSegmentedControlInjection = {
    readonly modelValue: Ref<FluxSegmentedControlValue | undefined>;
    readonly size: Ref<FluxSize>;

    select(value: FluxSegmentedControlValue): void;
    registerItem(element: HTMLElement, value: FluxSegmentedControlValue): void;
    unregisterItem(element: HTMLElement): void;
};
```

## Used by

- [Segmented control](../../components/segmented-control)
