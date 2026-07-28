# getBidirectionalFocusElement

Navigates bidirectionally within a container.

## Usage

```ts
import { getBidirectionalFocusElement } from '@flux-ui/internals';

const container = document.querySelector('#container');
const newFocusElement = getBidirectionalFocusElement(container, document.activeElement, 'down');
```

Pass a selector as `ignore` to leave a subtree out of the navigation; every element within it is skipped.

## Type declarations

```ts
export declare function getBidirectionalFocusElement(
    container: HTMLElement,
    currentElement: HTMLElement,
    direction: 'up' | 'down' | 'left' | 'right',
    ignore?: string
): HTMLElement | null;
```
