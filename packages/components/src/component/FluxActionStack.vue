<template>
    <FluxFlex
        ref="element"
        direction="horizontal"
        :gap="1"
        role="toolbar">
        <slot/>
    </FluxFlex>
</template>

<script
    lang="ts"
    setup>
    import { useFocusZone } from '@flux-ui/internals';
    import { useTemplateRef, type VNode } from 'vue';
    import FluxFlex from './FluxFlex.vue';

    defineSlots<{
        default(): VNode[];
    }>();

    const elementRef = useTemplateRef('element');

    useFocusZone(elementRef, {
        direction: 'horizontal'
    });
</script>
