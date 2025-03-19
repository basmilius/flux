# getFocusableElement

Navigates to a next or previous focusable element within the container.

## Usage

```ts
import { getFocusableElement } from '@basmilius/flux-internals';

const container = document.querySelector('#container');
const focusableElements = getFocusableElement(container, 1);
```

## Type declarations

```ts
export declare function getFocusableElement(
    container: HTMLElement,
    direction: number,
    activeElement: HTMLElement | undefined = undefined
): HTMLElement | undefined;
```
