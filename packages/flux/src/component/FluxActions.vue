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
    import { useFocusZone } from '@basmilius/flux-internals';
    import { useTemplateRef } from 'vue';
    import FluxStack from './FluxStack.vue';

    defineSlots<{
        default(): any;
    }>();

    const elementRef = useTemplateRef('element');

    useFocusZone(elementRef, {
        direction: 'horizontal'
    });
</script>
