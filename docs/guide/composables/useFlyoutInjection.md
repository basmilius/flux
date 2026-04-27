# useFlyoutInjection

This composable provides access to the [Flyout](../../components/flyout) state. It allows child components to react to the flyout's open, opening and closing states.

## Usage

```ts
import { useFlyoutInjection } from '@flux-ui/components';

const { isClosing, isOpen, isOpening } = useFlyoutInjection();
```

## Type declarations

```ts
import type { Ref } from 'vue';

declare function useFlyoutInjection(): {
    readonly isClosing: Ref<boolean>;
    readonly isOpen: Ref<boolean>;
    readonly isOpening: Ref<boolean>;
};
```

## Used by

- [Flyout](../../components/flyout)
- [Menu](../../components/menu/)
