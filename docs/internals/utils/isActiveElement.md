# isActiveElement

Tells whether an element presents itself as the active one of a set, by matching it against `[aria-selected="true"]`, `[aria-checked="true"]` and `[aria-current]`. A focus trap uses it to move focus onto the option that is already selected rather than onto the first one.

## Usage

```ts
import { isActiveElement } from '@flux-ui/internals';

const active = options.find(option => isActiveElement(option)) ?? options[0];

active?.focus();
```

## Type declarations

```ts
declare function isActiveElement(element: HTMLElement): boolean;
```
