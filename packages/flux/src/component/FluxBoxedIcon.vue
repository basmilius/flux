<template>
    <div
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
    import type { FluxColorVariant, FluxIconName } from '@/types';
    import FluxIcon from './FluxIcon.vue';
    import $style from '@/css/component/Icon.module.scss';

    defineEmits<{
        click: [MouseEvent];
    }>();

    defineProps<{
        readonly color?: FluxColorVariant;
        readonly size?: number;
        readonly variant: FluxIconName;
    }>();
</script>
