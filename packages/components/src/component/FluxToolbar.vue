<template>
    <FluxFlex
        :class="clsx(
            !!floatingMode ? $style.toolbarFloating : $style.toolbarFlat,
            floatingMode === 'free' && $style.isFree,
            floatingMode === 'top-end' && $style.isTopEnd,
            floatingMode === 'top-start' && $style.isTopStart,
            floatingMode === 'bottom-end' && $style.isBottomEnd,
            floatingMode === 'bottom-start' && $style.isBottomStart,
        )"
        :gap="6"
        tag="nav">
        <slot/>
    </FluxFlex>
</template>

<script
    lang="ts"
    setup>
    import { clsx } from 'clsx';
    import type { VNode } from 'vue';
    import FluxFlex from './FluxFlex.vue';
    import $style from '~flux/components/css/component/Toolbar.module.scss';

    defineProps<{
        readonly floatingMode?: 'free' | 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end';
    }>();

    defineSlots<{
        default(): VNode[];
    }>();
</script>
