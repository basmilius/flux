<template>
    <FluxStack
        ref="element"
        direction="horizontal"
        :gap="1"
        tag="nav">
        <slot/>
    </FluxStack>
</template>

<script
    lang="ts"
    setup>
    import { useFocusZone } from '@flux-ui/internals';
    import { useTemplateRef, type VNode } from 'vue';
    import FluxStack from './FluxStack.vue';

    defineSlots<{
        default(): VNode[];
    }>();

    const elementRef = useTemplateRef('element');

    useFocusZone(elementRef, {
        direction: 'horizontal'
    });
</script>
