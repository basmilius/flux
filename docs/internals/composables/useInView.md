# useInView

> Re-exported from [`@basmilius/common`](https://github.com/basmilius/packages). Behaviour changes there, not here.

This composable function is used to check if an element is currently visible in the viewport.

## Usage

```ts
import { useInView } from '@flux-ui/internals';
import { useTemplateRef } from 'vue';

const element = useTemplateRef('element');

useInView(element, {
    threshold: 1
});
```

## Type declarations

```ts
export declare function useInView<TElement extends HTMLElement | ComponentPublicInstance>(
    target: MaybeRefOrGetter<TElement | null | undefined>,
    options?: UseInViewOptions
): Ref<boolean>;

type UseInViewOptions = {
    readonly initial?: boolean;
    readonly root?: Element | Document | null;
    readonly rootMargin?: string;
    readonly threshold?: number | number[];
    readonly once?: boolean;
};
```

The options are named explicitly rather than extending `IntersectionObserverInit`, so a field outside this list is not passed through.

## Used by

- [Visuals](../../visuals/)
    - [Flickering grid](../../visuals/components/flickering-grid)
