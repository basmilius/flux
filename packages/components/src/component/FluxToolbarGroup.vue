<template>
    <FluxFlex
        :gap="3"
        role="group"
        :aria-label="ariaLabel">
        <slot/>
    </FluxFlex>
</template>

<script
    lang="ts"
    setup>
    import type { VNode } from 'vue';
    import FluxFlex from './FluxFlex.vue';

    defineProps<{
        readonly ariaLabel?: string;
    }>();

    defineSlots<{
        default(): VNode[];
    }>();
</script>
