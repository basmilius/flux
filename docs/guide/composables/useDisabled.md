# useDisabled

This composable merges a component's local disabled state with any inherited disabled state from a parent [Disabled](../components/disabled) component. Returns `true` if either the component itself or any parent in the tree is disabled.

## Usage

```ts
import { useDisabled } from '@flux-ui/components';
import { toRef } from 'vue';

const { disabled: componentDisabled } = defineProps<{
    disabled?: boolean;
}>();

const disabled = useDisabled(toRef(() => componentDisabled));
```

## Type declarations

```ts
import type { ComputedRef, Ref } from 'vue';

declare function useDisabled(
    componentDisabled: Ref<boolean>
): ComputedRef<boolean>;
```

## Used by

- [Button](../components/button/)
- [Form input](../components/form/input/)
- [Form select](../components/form/select/)
