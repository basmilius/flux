# getKeyboardFocusableElements

Returns all the focusable elements within a container that are focusable with the keyboard.

## Usage

```ts
import { getKeyboardFocusableElements } from '@flux-ui/internals';

const container = document.querySelector('#container');
const focusableElements = getKeyboardFocusableElements(container);
```

## Type declarations

```ts
export declare function getKeyboardFocusableElements(
    container: HTMLElement
): HTMLElement[];
```
