<template>
    <div
        data-typography-aware
        :class="clsx(
            !color && styles.iconBoxedDefault,
            color === 'gray' && styles.iconBoxedGray,
            color === 'primary' && styles.iconBoxedPrimary,
            color === 'danger' && styles.iconBoxedDanger,
            color === 'info' && styles.iconBoxedInfo,
            color === 'success' && styles.iconBoxedSuccess,
            color === 'warning' && styles.iconBoxedWarning,
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
    import styles from '@/css/component/Icon.module.scss';

    defineEmits<{
        click: [MouseEvent];
    }>();

    defineProps<{
        readonly color?: ColorVariant;
        readonly size?: number;
        readonly variant: IconName;
    }>();
</script>
