# VNodeRenderer

A functional component that renders the `VNode` it receives. Use it to put a `VNode` held in a variable into a template.

## Usage

```vue
<template>
    <VNodeRenderer :vnode="content"/>
</template>

<script
    lang="ts"
    setup>
    import { VNodeRenderer } from '@flux-ui/internals';
    import type { VNode } from 'vue';

    defineProps<{
        readonly content?: VNode;
    }>();
</script>
```

## Type declarations

```ts
export declare const VNodeRenderer: FunctionalComponent<{
    readonly vnode?: VNode;
}>;
```
