<template>
    <FluxFlex
        :class="isFilled ? $style.flexFill : undefined"
        :direction="direction"
        :gap="gap"
        wrap="wrap">
        <slot/>
    </FluxFlex>
</template>

<script
    lang="ts"
    setup>
    import type { FluxDirection } from '@flux-ui/types';
    import type { VNode } from 'vue';
    import FluxFlex from './FluxFlex.vue';
    import $style from '~flux/components/css/component/Flex.module.scss';

    const {
        direction = 'horizontal',
        gap = 9
    } = defineProps<{
        readonly direction?: FluxDirection;
        readonly gap?: number;
        readonly isFilled?: boolean;
    }>();

    defineSlots<{
        default(): VNode[];
    }>();
</script>
