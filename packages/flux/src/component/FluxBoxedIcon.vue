<template>
    <div
        data-typography-aware
        :class="clsx(
            !color && $style.iconBoxedDefault,
            color === 'gray' && $style.iconBoxedGray,
            color === 'primary' && $style.iconBoxedPrimary,
            color === 'danger' && $style.iconBoxedDanger,
            color === 'info' && $style.iconBoxedInfo,
            color === 'success' && $style.iconBoxedSuccess,
            color === 'warning' && $style.iconBoxedWarning,
        )"
        :style="{
            fontSize: size && `${size}px`
        }">
        <FluxIcon :variant="variant"/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { clsx } from 'clsx';
    import type { ColorVariant, IconName } from '@/types';
    import FluxIcon from './FluxIcon.vue';
    import $style from '@/css/component/Icon.module.scss';

    defineEmits<{
        click: [MouseEvent];
    }>();

    defineProps<{
        readonly color?: ColorVariant;
        readonly size?: number;
        readonly variant: IconName;
    }>();
</script>
