# unrefTemplateElement

Returns the HTML element of a template ref.

## Usage

```ts
import { unrefTemplateElement } from '@flux-ui/internals';
import { useTemplateRef } from 'vue';

const element = useTemplateRef('element');
const htmlElement = unrefTemplateElement(element);
```

## Type declarations

```ts
import { TemplateRef } from '@flux-ui/internals';

export declare function unrefTemplateElement<T extends HTMLElement>(
    ref: TemplateRef<T> | T
): T | null;
```
