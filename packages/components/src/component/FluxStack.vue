<template>
    <Component
        :is="tag ?? 'div'"
        :class="clsx(
            direction === 'horizontal' && $style.stackHorizontal,
            direction === 'vertical' && $style.stackVertical,
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
    import type { FluxDirection } from '@flux-ui/types';
    import { clsx } from 'clsx';
    import $style from '$flux/css/component/Layout.module.scss';

    const {
        direction = 'vertical',
        gap = 21
    } = defineProps<{
        readonly direction?: FluxDirection;
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
