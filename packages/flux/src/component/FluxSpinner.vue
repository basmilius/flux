<template>
    <svg
        :class="$style.spinner"
        viewBox="0 0 24 24"
        :style="{
            fontSize: `${size}px`
        }">
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
    import $style from '@/css/component/Spinner.module.scss';

    const {
        size = 30
    } = defineProps<{
        readonly size?: number;
    }>();
</script>
