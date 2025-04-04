# useEventListener

This composable function is used to attach events to an element, with automatic disposal.

## Usage

```ts
import { useEventListener } from '@basmilius/flux-internals';
import { useTemplateRef } from 'vue';

const element = useTemplateRef('element');

useEventListener(element, 'click', () => {
    console.log('Element clicked!');
});
```

## Type declarations

```ts
import type { TemplateRef } from '@basmilius/flux-internals';
import type { Ref } from 'vue';

export declare function useEventListener<K extends keyof HTMLElementEventMap>(
    elementRef: TemplateRef<HTMLElement>,
    eventName: K,
    listener: (evt: HTMLElementEventMap[K]) => any,
    options: AddEventListenerOptions = {passive: true}
): void;
```

## Used by

- [Tab bar](../../guide/components/tab-bar)
