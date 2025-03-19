# useDebouncedRef

This composable function is used to debounce changes to the ref.

## Usage

```ts
import { useDebouncedRef } from '@basmilius/flux-internals';
import { ref } from 'vue';

const searchQuery = ref('');
const searchQueryDebounced = useDebouncedRef(searchQuery, 1000, false);
```

## Type declarations

```ts
import type { Ref } from 'vue';

export declare function useDebouncedRef<T>(
    initialValue: Ref<T> | T,
    delay: number,
    immediate: boolean = false
): Ref<T>;
```

## Used by

- [Filter](../../guide/components/filter)
    - [Option](../../guide/components/filter/option)
    - [Options](../../guide/components/filter/options)
- [Form](../../guide/components/form)
    - [Select](../../guide/components/form/select)
