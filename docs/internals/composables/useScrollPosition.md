# useScrollPosition

This composable tracks the scroll position of a given element or the document. It provides reactive `x` and `y` refs that update on scroll events.

## Usage

```ts
import { useScrollPosition } from '@flux-ui/internals';
import { useTemplateRef } from 'vue';

// Track document scroll
const { x, y } = useScrollPosition();

// Track element scroll
const element = useTemplateRef('scrollContainer');
const { x: elX, y: elY } = useScrollPosition(element);
```

## Type declarations

```ts
import type { TemplateRef } from '@flux-ui/internals';
import type { Ref } from 'vue';

export declare function useScrollPosition<TElement extends HTMLElement>(
    elementRef?: TemplateRef<TElement>
): UseScrollPositionReturn;

type UseScrollPositionReturn = {
    readonly x: Ref<number>;
    readonly y: Ref<number>;
};
```

## Used by

- [Dashboard](../../dashboard/components/dashboard)
