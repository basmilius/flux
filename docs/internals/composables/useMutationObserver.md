# useMutationObserver

This composable function is used to add a mutation observer to an element.

## Usage

```ts
import { useMutationObserver } from '@basmilius/flux-internals';
import { useTemplateRef } from 'vue';

const element = useTemplateRef('element');

useMutationObserver(element, mutations => {
    console.log('Mutations detected!', mutations);
});
```

## Type declarations

```ts
import type { TemplateRef } from '@basmilius/flux-internals';

export declare function useMutationObserver<TElement extends HTMLElement>(
    elementRef: TemplateRef<TElement>,
    callback: MutationCallback,
    options?: MutationObserverInit
): void;
```

## Used by

- [Tab bar](../../guide/components/tab-bar)
