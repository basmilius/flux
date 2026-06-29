<template>
    <FluxFlex
        ref="element"
        :class="clsx(
            !!floatingMode ? $style.toolbarFloating : $style.toolbarFlat,
            floatingMode === 'free' && $style.isFree,
            floatingMode === 'top-end' && $style.isTopEnd,
            floatingMode === 'top-start' && $style.isTopStart,
            floatingMode === 'bottom-end' && $style.isBottomEnd,
            floatingMode === 'bottom-start' && $style.isBottomStart
        )"
        :gap="6"
        role="toolbar"
        :aria-label="ariaLabel ?? 'Toolbar'">
        <slot/>
    </FluxFlex>
</template>

<script
    lang="ts"
    setup>
    import { useFocusZone } from '@flux-ui/internals';
    import { clsx } from 'clsx';
    import { useTemplateRef, type VNode } from 'vue';
    import FluxFlex from './FluxFlex.vue';
    import $style from '~flux/components/css/component/Toolbar.module.scss';

    defineProps<{
        readonly ariaLabel?: string;
        readonly floatingMode?: 'free' | 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end';
    }>();

    defineSlots<{
        default(): VNode[];
    }>();

    const elementRef = useTemplateRef('element');

    useFocusZone(elementRef, {
        direction: 'horizontal'
    });
</script>
