<template>
    <svg
        :class="clsx(
            $style.spinner,
            color === 'gray' && $style.spinnerGray,
            color === 'primary' && $style.spinnerPrimary,
            color === 'danger' && $style.spinnerDanger,
            color === 'info' && $style.spinnerInfo,
            color === 'success' && $style.spinnerSuccess,
            color === 'warning' && $style.spinnerWarning
        )"
        viewBox="0 0 24 24"
        :style="{
            fontSize: size && `${size}px`
        }"
        :role="label ? 'status' : undefined"
        :aria-label="label"
        :aria-hidden="label ? undefined : true">
        <circle
            :class="$style.spinnerTrack"
            cx="12"
            cy="12"
            r="10"
            fill="transparent"
            stroke-width="4"/>

        <circle
            :class="$style.spinnerEffect"
            cx="12"
            cy="12"
            r="10"
            fill="transparent"
            stroke-width="4"
            stroke-dasharray="21 45"
            stroke-dashoffset="30"
            stroke-linecap="round"/>

        <circle
            :class="$style.spinnerValue"
            cx="12"
            cy="12"
            r="10"
            fill="transparent"
            stroke-width="4"
            stroke-dasharray="21 45"
            stroke-dashoffset="30"
            stroke-linecap="round"/>
    </svg>
</template>

<script
    lang="ts"
    setup>
    import type { FluxColor } from '@flux-ui/types';
    import { clsx } from 'clsx';
    import $style from '~flux/components/css/component/Spinner.module.scss';

    defineProps<{
        readonly color?: FluxColor;
        readonly label?: string;
        readonly size?: number;
    }>();
</script>
