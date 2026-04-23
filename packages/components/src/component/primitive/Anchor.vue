<template>
    <component :is="tagName">
        <slot/>
    </component>
</template>

<script
    lang="ts"
    setup>
    import type { VNode } from 'vue';

    defineProps<{
        readonly tagName: keyof HTMLElementTagNameMap;
    }>();

    defineSlots<{
        default(): VNode[];
    }>();
</script>
