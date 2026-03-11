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

- [Filter date](../components/filter/date)
- [Filter option](../components/filter/option)
- [Filter options](../components/filter/options)
- [Filter range](../components/filter/range)
