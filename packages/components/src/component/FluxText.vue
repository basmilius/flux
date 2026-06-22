<template>
    <Component
        :is="tag ?? 'span'"
        :class="clsx(
            $style.text,
            size === 'small' && $style.textSizeSmall,
            size === 'medium' && $style.textSizeMedium,
            size === 'large' && $style.textSizeLarge,
            size === 'display' && $style.textSizeDisplay,
            color === 'muted' && $style.textColorMuted,
            color === 'prominent' && $style.textColorProminent,
            color === 'gray' && $style.textColorGray,
            color === 'primary' && $style.textColorPrimary,
            color === 'danger' && $style.textColorDanger,
            color === 'info' && $style.textColorInfo,
            color === 'success' && $style.textColorSuccess,
            color === 'warning' && $style.textColorWarning,
            align === 'start' && $style.textAlignStart,
            align === 'center' && $style.textAlignCenter,
            align === 'end' && $style.textAlignEnd,
            tabular && $style.textTabular,
            truncate && $style.textTruncate
        )"
        :style="{
            fontWeight: weight
        }">
        <slot/>
    </Component>
</template>

<script
    lang="ts"
    setup>
    import type { FluxColor } from '@flux-ui/types';
    import { clsx } from 'clsx';
    import type { VNode } from 'vue';
    import $style from '~flux/components/css/component/Text.module.scss';

    defineProps<{
        readonly align?: 'start' | 'center' | 'end';
        readonly color?: FluxColor | 'muted' | 'prominent';
        readonly size?: 'small' | 'medium' | 'large' | 'display';
        readonly tabular?: boolean;
        readonly tag?: keyof HTMLElementTagNameMap;
        readonly truncate?: boolean;
        readonly weight?: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
    }>();

    defineSlots<{
        default(): VNode[];
    }>();
</script>
