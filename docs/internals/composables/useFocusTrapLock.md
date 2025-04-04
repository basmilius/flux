# useFocusTrapLock

This composable function is used to manage focus locking for a component instance.

## Usage

```ts
import { useFocusTrapLock } from '@basmilius/flux-internals';

useFocusTrapLock(true);
```

## Type declarations

```ts
import type { Ref } from 'vue';

export declare function useFocusTrapLock(
    autoFocus: boolean = false
): Ref<boolean>;
```
