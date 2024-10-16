<template>
    <Component
        :is="tag ?? 'div'"
        :class="clsx(
            axis === 'horizontal' && $style.stackHorizontal,
            axis === 'vertical' && $style.stackVertical,
            isCentered && $style.isCentered,
            isFill && $style.isFill,
            isWrapping && $style.isWrapping
        )"
        :style="{
            '--gap': gap && `${gap}px`
        }">
        <slot/>
    </Component>
</template>

<script
    lang="ts"
    setup>
    import { clsx } from 'clsx';
    import type { Axis } from '@/types';
    import $style from '@/css/component/Stack.module.scss';

    const {
        axis = 'vertical',
        gap = 30
    } = defineProps<{
        readonly axis?: Axis;
        readonly gap?: number;
        readonly isCentered?: boolean;
        readonly isFill?: boolean;
        readonly isWrapping?: boolean;
        readonly tag?: keyof HTMLElementTagNameMap;
    }>();

    defineSlots<{
        default(): any;
    }>();
</script>
