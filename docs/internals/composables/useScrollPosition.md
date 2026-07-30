# useScrollPosition

> Re-exported from [`@basmilius/common`](https://github.com/basmilius/packages). Behaviour changes there, not here.

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
type EligibleTarget = HTMLElement | Window | Document;

export declare function useScrollPosition(
    target?: MaybeRefOrGetter<EligibleTarget | null | undefined>
): ScrollPosition;

type ScrollPosition = {
    readonly x: Ref<number>;
    readonly y: Ref<number>;
};
```

Both refs start at `0` and take their first real value on mount, not during setup: a server render has no scroll position, so reading one while a component is hydrating would render it from a value the server never had.
