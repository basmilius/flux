# getFocusableElement

Navigates to a next or previous focusable element within the container.

## Usage

```ts
import { getFocusableElement } from '@flux-ui/internals';

const container = document.querySelector('#container');
const focusableElement = getFocusableElement(container, 1);
```

Pass a selector as `ignore` to leave a subtree out of the navigation; every element within it is skipped.

## Type declarations

```ts
export declare function getFocusableElement(
    container: HTMLElement,
    direction: number,
    activeElement: HTMLElement | undefined = undefined,
    ignore?: string
): HTMLElement | undefined;
```
