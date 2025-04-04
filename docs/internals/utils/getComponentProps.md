# getComponentProps

Returns the props of the component, based on its `VNode`.

## Usage

```ts
import { getComponentProps } from '@basmilius/flux-internals';

const props = getComponentProps(vnode);
```

## Type declarations

```ts
export declare function getComponentProps<T extends object>(
    component: VNode
): T;
```
