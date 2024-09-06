<template>
    <FluxStack
        :axis="axis"
        :gap="gap"
        :is-fill="isFill">
        <slot/>
    </FluxStack>
</template>

<script
    lang="ts"
    setup>
    import type { Axis } from '@/types';
    import FluxStack from './FluxStack.vue';

    const {
        axis = 'horizontal',
        gap = 9
    } = defineProps<{
        readonly axis?: Axis;
        readonly gap?: number;
        readonly isFill?: boolean;
    }>();

    defineSlots<{
        default(): any;
    }>();
</script>
