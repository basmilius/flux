# useFocusTrapReturn

This composable function is used to manage focus returning for a component instance.

## Usage

```ts
import { useFocusTrapReturn } from '@basmilius/flux-internals';

useFocusTrapReturn(false);
```

## Type declarations

```ts
import type { Ref } from 'vue';

export declare function useFocusTrapReturn(
    disable: Ref<boolean> = false
): void;
```
