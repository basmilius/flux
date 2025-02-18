<template>
    <FluxStack
        :class="clsx(
            !!floatingMode ? $style.toolbarFloating : $style.toolbarFlat,
            floatingMode === 'free' && $style.isFree,
            floatingMode === 'top-end' && $style.isTopEnd,
            floatingMode === 'top-start' && $style.isTopStart,
            floatingMode === 'bottom-end' && $style.isBottomEnd,
            floatingMode === 'bottom-start' && $style.isBottomStart,
        )"
        direction="horizontal"
        :gap="6"
        tag="nav">
        <slot/>
    </FluxStack>
</template>

<script
    lang="ts"
    setup>
    import { clsx } from 'clsx';
    import FluxStack from './FluxStack.vue';
    import $style from '@/css/component/Toolbar.module.scss';

    defineProps<{
        readonly floatingMode?: 'free' | 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end';
    }>();

    defineSlots<{
        default(): any;
    }>();
</script>
