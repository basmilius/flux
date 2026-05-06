<template>
    <Component
        :is="tag ?? 'div'"
        :class="clsx(
            isInline ? $style.flexInline : $style.flex,
            direction === 'horizontal' && $style.flexDirectionHorizontal,
            direction === 'vertical' && $style.flexDirectionVertical,
            align === 'start' && $style.flexAlignStart,
            align === 'center' && $style.flexAlignCenter,
            align === 'end' && $style.flexAlignEnd,
            align === 'stretch' && $style.flexAlignStretch,
            align === 'baseline' && $style.flexAlignBaseline,
            justify === 'start' && $style.flexJustifyStart,
            justify === 'center' && $style.flexJustifyCenter,
            justify === 'end' && $style.flexJustifyEnd,
            justify === 'between' && $style.flexJustifyBetween,
            justify === 'around' && $style.flexJustifyAround,
            justify === 'evenly' && $style.flexJustifyEvenly,
            wrap === 'wrap' && $style.flexWrapWrap,
            wrap === 'nowrap' && $style.flexWrapNowrap,
            wrap === 'wrap-reverse' && $style.flexWrapWrapReverse
        )"
        :style="{
            '--gap': gap != null ? `${gap}px` : undefined
        }">
        <slot/>
    </Component>
</template>

<script
    lang="ts"
    setup>
    import type { FluxAlign, FluxDirection, FluxFlexWrap, FluxJustify } from '@flux-ui/types';
    import { clsx } from 'clsx';
    import type { VNode } from 'vue';
    import $style from '~flux/components/css/component/Flex.module.scss';

    const {
        direction = 'horizontal'
    } = defineProps<{
        readonly align?: FluxAlign;
        readonly direction?: FluxDirection;
        readonly gap?: number;
        readonly isInline?: boolean;
        readonly justify?: FluxJustify;
        readonly tag?: keyof HTMLElementTagNameMap;
        readonly wrap?: FluxFlexWrap;
    }>();

    defineSlots<{
        default(): VNode[];
    }>();
</script>
