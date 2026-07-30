# prefersReducedMotion

> Re-exported from [`@basmilius/utils`](https://github.com/basmilius/packages). Behaviour changes there, not here.

Tells whether the user asked for less motion, by reading the `prefers-reduced-motion: reduce` media query. Use it to skip an animation that CSS cannot turn off on its own, such as a scripted scroll or a canvas effect.

It is safe outside a browser: without a `window` it returns `false`.

## Usage

```ts
import { prefersReducedMotion } from '@flux-ui/internals';

element.scrollIntoView({
    behavior: prefersReducedMotion() ? 'auto' : 'smooth'
});
```

::: info
The value is read on every call rather than cached, so a user who changes the setting mid-session gets the new answer.
:::

## Type declarations

```ts
declare function prefersReducedMotion(): boolean;
```
