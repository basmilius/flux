# useClickOutside

This composable function is used to detect when a user is clicking outside the tracked element.

## Usage

```ts
import { useClickOutside } from '@flux-ui/internals';
import { ref, useTemplateRef } from 'vue';

const element = useTemplateRef('element');
const enabled = ref(true);

useClickOutside(element, enabled, () => {
    console.log('Clicked outside!');
});
```

## Type declarations

```ts
import type { TemplateRef } from '@flux-ui/internals';
import type { Ref } from 'vue';

export declare function useClickOutside<TElement extends HTMLElement>(
    elementRefs: TemplateRef<TElement> | TemplateRef<TElement>[],
    enabled: boolean | Ref<boolean>,
    onOutsideClick: Handler
): void;

type Handler = ((evt: PointerEvent) => void) | ((evt: PointerEvent) => Promise<void>); 
```

## Used by

- [Form](../../guide/components/form)
    - [Select](../../guide/components/form/select)
