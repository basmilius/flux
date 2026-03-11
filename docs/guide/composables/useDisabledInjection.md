# useDisabledInjection

This composable retrieves the disabled state from a parent [Disabled](../components/disabled) component via Vue's dependency injection. Returns `false` when no parent provides a disabled state.

## Usage

```ts
import { useDisabledInjection } from '@flux-ui/components';

const isTreeDisabled = useDisabledInjection();
```

## Type declarations

```ts
import type { Ref } from 'vue';

declare function useDisabledInjection(): Ref<boolean>;
```

## Used by

- [useDisabled](./useDisabled)
