# useFilterInjection

This composable provides access to the [Filter](../components/filter/) context. It is used by filter sub-components to interact with the parent filter's state and actions.

## Usage

```ts
import { useFilterInjection } from '@flux-ui/components';

const { state, back, reset, getValue, hasValue, setValue } = useFilterInjection();
```

## Type declarations

```ts
import type { Ref } from 'vue';

declare function useFilterInjection(): {
    readonly state: Ref<object>;
    back(): void;
    reset(): void;
    getValue(): unknown;
    hasValue(): boolean;
    setValue(value: unknown): void;
};
```

## Used by

- [Filter](../components/filter/)
    - [Date](../components/filter/date)
    - [Option](../components/filter/option)
    - [Options](../components/filter/options)
    - [Range](../components/filter/range)
