# getFocusableElements

Returns all the focusable elements within a container.

## Usage

```ts
import { getFocusableElements } from '@flux-ui/internals';

const container = document.querySelector('#container');
const focusableElements = getFocusableElements(container);
```

## Type declarations

```ts
export declare function getFocusableElements(
    container: HTMLElement
): HTMLElement[];
```
