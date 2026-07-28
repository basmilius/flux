# useFocusTrapReturn

This composable function returns focus to the element that had it before a focus trap opened. It remembers the active element while the container is mounted, and restores focus to it once the container goes away.

## Usage

```ts
import { useFocusTrapReturn } from '@flux-ui/internals';
import { ref, useTemplateRef } from 'vue';

const container = useTemplateRef('container');
const disabled = ref(false);

useFocusTrapReturn(container, disabled);
```

## Type declarations

```ts
import type { TemplateRef } from '@flux-ui/internals';
import type { Ref } from 'vue';

export declare function useFocusTrapReturn(
    containerRef: TemplateRef<HTMLElement>,
    disabled: Ref<boolean>
): void;
```
