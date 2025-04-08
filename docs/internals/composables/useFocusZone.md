# useFocusZone

This composable function is used to create a focus zone within an element.

## Usage

```ts
import { useFocusZone } from '@flux-ui/internals';
import { useTemplateRef } from 'vue';

const element = useTemplateRef('element');

useFocusZone(element, {
    cycle: true,
    direction: 'vertical'
});
```

## Type declarations

```ts
import type { TemplateRef } from '@flux-ui/internals';

export declare function useFocusZone<TElement extends HTMLElement>(
    containerRef: TemplateRef<TElement>,
    options: UseFocusZoneOptions = {}
): void;

type UseFocusZoneOptions = {
    readonly cycle?: boolean;
    readonly direction?: 'bidirectional' | 'horizontal' | 'vertical';
};
```

## Used by

- [Menu](../../guide/components/menu)
