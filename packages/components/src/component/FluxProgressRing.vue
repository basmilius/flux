<template>
    <div
        :class="clsx(
            $style.progressRing,
            color === 'gray' && $style.progressRingGray,
            color === 'primary' && $style.progressRingPrimary,
            color === 'danger' && $style.progressRingDanger,
            color === 'info' && $style.progressRingInfo,
            color === 'success' && $style.progressRingSuccess,
            color === 'warning' && $style.progressRingWarning
        )"
        :style="{
            height: `${size}px`,
            width: `${size}px`
        }"
        :role="label ? 'progressbar' : undefined"
        :aria-label="label"
        :aria-valuenow="label && !isIndeterminate ? ariaValueNow : undefined"
        :aria-valuemin="label && !isIndeterminate ? min : undefined"
        :aria-valuemax="label && !isIndeterminate ? max : undefined">
        <svg
            :class="$style.progressRingSvg"
            :viewBox="`0 0 ${size} ${size}`"
            aria-hidden="true">
            <circle
                :class="$style.progressRingTrack"
                :cx="center"
                :cy="center"
                :r="radius"
                fill="transparent"
                :stroke-width="thickness"/>

            <circle
                :class="isIndeterminate ? $style.progressRingValueIndeterminate : $style.progressRingValue"
                :cx="center"
                :cy="center"
                :r="radius"
                fill="transparent"
                :stroke-width="thickness"
                stroke-linecap="round"
                pathLength="100"
                :stroke-dasharray="isIndeterminate ? '25 75' : 100"
                :stroke-dashoffset="isIndeterminate ? 0 : dashOffset"/>
        </svg>

        <div
            v-if="$slots.default"
            :class="$style.progressRingContent">
            <slot v-bind="{progress}"/>
        </div>
    </div>
</template>

<script
    lang="ts"
    setup>
    import type { FluxColor } from '@flux-ui/types';
    import { clsx } from 'clsx';
    import { computed, unref, type VNode } from 'vue';
    import $style from '~flux/components/css/component/ProgressRing.module.scss';

    const {
        color = 'primary',
        isIndeterminate,
        max = 1,
        min = 0,
        size = 60,
        thickness = 6,
        value
    } = defineProps<{
        readonly color?: FluxColor;
        readonly isIndeterminate?: boolean;
        readonly label?: string;
        readonly max?: number;
        readonly min?: number;
        readonly size?: number;
        readonly thickness?: number;
        readonly value?: number;
    }>();

    defineSlots<{
        default(props: {
            progress: string;
        }): VNode[];
    }>();

    const center = computed(() => size / 2);
    const radius = computed(() => Math.max(0, (size - thickness) / 2));

    const ariaValueNow = computed(() => {
        const current = value ?? min;

        return Math.min(max, Math.max(min, current));
    });

    const position = computed(() => {
        if (isIndeterminate) {
            return 0;
        }

        const current = value ?? min;

        if (max <= min) {
            return current >= max ? 1 : 0;
        }

        return Math.min(1, Math.max(0, (current - min) / (max - min)));
    });

    const dashOffset = computed(() => 100 - unref(position) * 100);

    const progress = computed(() => new Intl
        .NumberFormat(navigator.language, {
            style: 'percent',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        })
        .format(unref(position)));
</script>
