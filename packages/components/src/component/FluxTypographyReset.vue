<template>
    <Component
        :is="tag ?? 'div'"
        data-flux-prose-reset
        data-typography-aware>
        <slot/>
    </Component>
</template>

<script
    lang="ts"
    setup>
    import type { VNode } from 'vue';

    defineProps<{
        readonly tag?: keyof HTMLElementTagNameMap;
    }>();

    defineSlots<{
        default(): VNode[];
    }>();
</script>
