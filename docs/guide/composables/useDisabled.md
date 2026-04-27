# useDisabled

This composable merges a component's local disabled state with any inherited disabled state from a parent [Disabled](../../components/disabled) component. Returns `true` if either the component itself or any parent in the tree is disabled.

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

## Example

Toggle a parent [Disabled](../../components/disabled) component to disable an entire group of inputs and actions at once. Each Flux component reads the inherited disabled state through `useDisabled` internally, so you don't need to forward the prop manually.

::: example Inherited disabled || A toggle that disables a group of inputs and buttons via a wrapping `FluxDisabled`.
example=../../code/guide/composables/useDisabled/inherited.vue
:::

## Used by

- [Button](../../components/button/)
- [Form](../../components/form/)
    - [Input](../../components/form/input/)
    - [Select](../../components/form/select/)
