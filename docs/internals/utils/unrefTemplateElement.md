# unrefTemplateElement

Returns the HTML element of a template ref.

## Usage

```ts
import { unrefTemplateElement } from '@basmilius/flux-internals';
import { useTemplateRef } from 'vue';

const element = useTemplateRef('element');
const htmlElement = unrefTemplateElement(element);
```

## Type declarations

```ts
import { TemplateRef } from '@basmilius/flux-internals';

export declare function unrefTemplateElement<T extends HTMLElement>(
    ref: TemplateRef<T> | T
): T | null;
```
