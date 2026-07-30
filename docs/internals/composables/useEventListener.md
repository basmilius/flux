# useEventListener

> Re-exported from [`@basmilius/common`](https://github.com/basmilius/packages). Behaviour changes there, not here.

This composable function is used to attach events to an element, with automatic disposal.

## Usage

```ts
import { useEventListener } from '@flux-ui/internals';
import { useTemplateRef } from 'vue';

const element = useTemplateRef('element');

useEventListener(element, 'click', () => {
    console.log('Element clicked!');
});
```

## Type declarations

```ts
type EventMap = HTMLElementEventMap & WindowEventMap & DocumentEventMap;
type EligibleTarget = HTMLElement | Window | Document;

export declare function useEventListener<TType extends keyof EventMap>(
    target: MaybeRefOrGetter<EligibleTarget | null | undefined>,
    type: TType | TType[],
    listener: (evt: EventMap[TType]) => void,
    options?: boolean | AddEventListenerOptions
): () => void;
```

::: warning
There is no `{passive: true}` default. A scroll or wheel listener that wants to be passive has to say so, and one that calls `preventDefault` has to pass `{passive: false}` where the browser defaults to passive.
:::

## Used by

- [Tab bar](../../components/tab-bar)
