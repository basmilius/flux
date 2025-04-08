# useRemembered

This composable function is used remember a simple value in the browser.

## Usage

```ts
import { useRemembered } from '@flux-ui/internals';

const darkMode = useRemembered('dark-mode', false);
```

## Type declarations

```ts
import type { Ref } from 'vue';

export declare function useRemembered<T>(
    key: string,
    initialValue: T
): Ref<T>;
```
