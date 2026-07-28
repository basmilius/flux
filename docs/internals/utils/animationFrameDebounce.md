# animationFrameDebounce

Debounce a function to be called only once per animation frame.

## Usage

```ts
import { animationFrameDebounce } from '@flux-ui/internals';

function reposition(): void {
    // reposition logic.
}

const debounced = animationFrameDebounce(reposition);
```

## Type declarations

```ts
import type { FluxMaybePromise } from '@flux-ui/types';

export declare function animationFrameDebounce<T extends () => FluxMaybePromise<void>>(fn: T): T;
```
