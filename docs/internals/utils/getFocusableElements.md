# getFocusableElements

Returns all the focusable elements within a container.

## Usage

```ts
import { getFocusableElements } from '@flux-ui/internals';

const container = document.querySelector('#container');
const focusableElements = getFocusableElements(container);
```

Pass a selector as `ignore` to leave a subtree out of the result; every element within it is skipped.

## Type declarations

```ts
export declare function getFocusableElements(
    container: HTMLElement,
    ignore?: string
): HTMLElement[];
```
