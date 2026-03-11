# wrapFocus

Wraps focus within a container element, enabling circular focus navigation. When focus leaves the container, it wraps to the first or last focusable child based on the direction of navigation.

## Usage

```ts
import { wrapFocus } from '@flux-ui/internals';

// Wrap focus within a container
wrapFocus(containerElement, targetElement);

// Force focus to the first focusable element
wrapFocus(containerElement, targetElement, true);
```

## Type declarations

```ts
declare function wrapFocus(
    elm: HTMLElement,
    targetElm: Element,
    forceFirst?: boolean
): void;
```

## Used by

- [useFocusTrap](../composables/useFocusTrap)
