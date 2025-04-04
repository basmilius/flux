# useInView

This composable function is used to check if an element is currently visible in the viewport.

## Usage

```ts
import { useInView } from '@basmilius/flux-internals';
import { useTemplateRef } from 'vue';

const element = useTemplateRef('element');

useInView(element, {
    threshold: 1
});
```

## Type declarations

```ts
import type { TemplateRef } from '@basmilius/flux-internals';
import type { Ref } from 'vue';

export declare function useInView<TElement extends HTMLElement>(
    containerRef: TemplateRef<TElement>,
    options: UseInViewOptions = {}
): Ref<boolean>;

type UseInViewOptions = IntersectionObserverInit & {
    readonly initial?: boolean;
};
```

## Used by

- [Visual](../../guide/components/visual)
    - [Flickering grid](../../guide/components/visual/flickering-grid)
