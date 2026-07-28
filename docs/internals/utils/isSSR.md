# isSSR

A constant that is `true` when the code runs without a document, which is what server side rendering looks like. Guard anything that touches the DOM directly with it, so a component renders on the server instead of throwing.

It is a plain boolean, evaluated once when the module loads, not a function.

## Usage

```ts
import { isSSR } from '@flux-ui/internals';

if (isSSR) {
    return;
}

document.body.appendChild(element);
```

## Type declarations

```ts
declare const isSSR: boolean;
```
