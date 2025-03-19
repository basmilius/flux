# useFocusTrap

This composable function is used to trap focus within a container.

## Usage

```ts
import { useFocusTrap } from '@basmilius/flux-internals';
import { useTemplateRef } from 'vue';

const element = useTemplateRef('element');

useFocusTrap(element);
```

## Type declarations

```ts
import type { TemplateRef } from '@basmilius/flux-internals';
import type { Ref } from 'vue';

export declare function useFocusTrap(
    containerRef: TemplateRef<HTMLElement>,
    options: UseFocusTrapOptions = {}
): void;

type UseFocusTrapOptions = {
    attachTo?: HTMLElement | Document;
    disable?: Ref<boolean>;
    disableReturn?: Ref<boolean>;
};
```

## Used by

- [Flyout](../../guide/components/flyout)
