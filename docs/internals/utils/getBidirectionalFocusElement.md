# getBidirectionalFocusElement

Navigates bidirectionally within a container.

## Usage

```ts
import { getBidirectionalFocusElement } from '@basmilius/flux-internals';

const container = document.querySelector('#container');
const newFocusElement = getBidirectionalFocusElement(container.document.activeElement, 'down');
```

## Type declarations

```ts
export declare function getBidirectionalFocusElement(
    container: HTMLElement,
    currentElement: HTMLElement,
    direction: 'up' | 'down' | 'left' | 'right'
): HTMLElement | null;
```
