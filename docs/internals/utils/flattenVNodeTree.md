# flattenVNodeTree

Flattens a VNode tree to remove non-dom elements.

## Usage

```ts
import { flattenVNodeTree } from '@basmilius/flux-internals';
import { useSlots } from 'vue';

const slots = useSlots();
const flattened = flattenVNodeTree(slots.default?.() ?? []);
```

## Type declarations

```ts
import type { VNode } from 'vue';

export declare function flattenVNodeTree(
    vnodes: VNode[]
): VNode[];
```
