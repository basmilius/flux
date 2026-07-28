# getExposedRef

Returns a ref that a component exposed under the given key, based on its component instance. Throws when the component did not expose that key.

## Usage

```ts
import { getExposedRef } from '@flux-ui/internals';

const isOpen = getExposedRef<boolean>(instance, 'isOpen');
```

## Type declarations

```ts
import type { ComponentInternalInstance, Ref } from 'vue';

export declare function getExposedRef<T>(
    instance: ComponentInternalInstance,
    key: string
): Ref<T>;
```
