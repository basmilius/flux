<template>
    <FluxStack
        :direction="direction"
        :gap="gap"
        :is-fill="isFill">
        <slot/>
    </FluxStack>
</template>

<script
    lang="ts"
    setup>
    import type { FluxDirection } from '@flux-ui/types';
    import FluxStack from './FluxStack.vue';

    const {
        direction = 'horizontal',
        gap = 9
    } = defineProps<{
        readonly direction?: FluxDirection;
        readonly gap?: number;
        readonly isFill?: boolean;
    }>();

    defineSlots<{
        default(): any;
    }>();
</script>
