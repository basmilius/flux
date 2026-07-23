<template>
    <component
        :is="tag ?? 'div'"
        data-flux-prose-aware
        data-flux-prose-reset>
        <slot/>
    </component>
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
