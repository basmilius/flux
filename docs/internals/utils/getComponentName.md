# getComponentName

Returns the name of the component, based on its `VNode`.

## Usage

```ts
import { getComponentName } from '@basmilius/flux-internals';

const name = getComponentName(vnode);
```

## Type declarations

```ts
export declare function getComponentName(
    component: VNode
): string;
```
