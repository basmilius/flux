# getExposedRef

Returns the name of the component, based on its `VNode`.

## Usage

```ts
import { getExposedRef } from '@basmilius/flux-internals';

const isOpen = getExposedRef(instance, 'isOpen');
```

## Type declarations

```ts
import type { ComponentInternalInstance } from 'vue';

export declare function getExposedRef<T>(
    instance: ComponentInternalInstance
): Ref<T>;
```
