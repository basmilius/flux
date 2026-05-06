<template>
    <Component
        :is="tag ?? 'div'"
        ref="element"
        :class="clsx(
            $style.scroller,
            direction === 'vertical' && $style.scrollerDirectionVertical,
            direction === 'horizontal' && $style.scrollerDirectionHorizontal,
            direction === 'both' && $style.scrollerDirectionBoth,
            snap && direction === 'vertical' && (snap === 'mandatory' ? $style.scrollerSnapMandatoryVertical : $style.scrollerSnapProximityVertical),
            snap && direction === 'horizontal' && (snap === 'mandatory' ? $style.scrollerSnapMandatoryHorizontal : $style.scrollerSnapProximityHorizontal),
            snap && direction === 'both' && (snap === 'mandatory' ? $style.scrollerSnapMandatoryBoth : $style.scrollerSnapProximityBoth),
            snapAlign === 'start' && $style.scrollerSnapAlignStart,
            snapAlign === 'center' && $style.scrollerSnapAlignCenter,
            snapAlign === 'end' && $style.scrollerSnapAlignEnd,
            hasFade && direction === 'horizontal' && $style.scrollerFadeHorizontal,
            hasFade && direction !== 'horizontal' && $style.scrollerFadeVertical
        )"
        :style="hasFade ? fadeStyle : undefined">
        <slot/>
    </Component>
</template>

<script
    lang="ts"
    setup>
    import { useScrollEdges } from '@flux-ui/internals';
    import type { FluxAlignment, FluxDirection } from '@flux-ui/types';
    import { clsx } from 'clsx';
    import { computed, useTemplateRef, type VNode } from 'vue';
    import $style from '~flux/components/css/component/Scroller.module.scss';

    const FADE_DISTANCE = 24;

    const {
        direction = 'vertical',
        hasFade = false
    } = defineProps<{
        readonly direction?: FluxDirection | 'both';
        readonly hasFade?: boolean;
        readonly snap?: 'mandatory' | 'proximity';
        readonly snapAlign?: FluxAlignment;
        readonly tag?: keyof HTMLElementTagNameMap;
    }>();

    defineSlots<{
        default(): VNode[];
    }>();

    const elementRef = useTemplateRef<HTMLElement>('element');
    const {isAtStart, isAtEnd, isAtLeft, isAtRight} = useScrollEdges(elementRef);

    const fadeStyle = computed(() => {
        const isHorizontal = direction === 'horizontal';
        const startEdge = isHorizontal ? isAtLeft.value : isAtStart.value;
        const endEdge = isHorizontal ? isAtRight.value : isAtEnd.value;

        return {
            '--fade-start': startEdge ? '0px' : `${FADE_DISTANCE}px`,
            '--fade-end': endEdge ? '0px' : `${FADE_DISTANCE}px`
        };
    });
</script>
