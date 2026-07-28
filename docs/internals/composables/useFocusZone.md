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

Pass a selector as `ignore` to leave a subtree out of the zone, so an interactive component inside it keeps its own keyboard behavior. `FluxMenu` uses it with `[data-flux-menu-pane]`, which is what lets a color picker, a slider or a search field inside a menu pane handle its own arrow keys.

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
    readonly ignore?: string;
};
```

## Used by

- [Menu](../../components/menu)
