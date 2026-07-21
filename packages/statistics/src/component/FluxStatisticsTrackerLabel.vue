<template>
    <div
        :class="COLOR_MAP[color]"
        role="listitem">
        <span
            ref="marker"
            :class="$style.trackerLabelDot"/>

        <span :class="$style.trackerLabelText">
            {{ label }}
        </span>

        <slot name="end"/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import type { FluxColor } from '@flux-ui/types';
    import { inject, onUnmounted, useTemplateRef, type VNode } from 'vue';
    import { FluxStatisticsTrackerInjectionKey } from '~flux/statistics/composable';
    import $style from '~flux/statistics/css/Tracker.module.scss';

    const COLOR_MAP: Record<FluxColor, string> = {
        gray: $style.trackerLabelGray,
        primary: $style.trackerLabelPrimary,
        danger: $style.trackerLabelDanger,
        info: $style.trackerLabelInfo,
        success: $style.trackerLabelSuccess,
        warning: $style.trackerLabelWarning
    };

    const {
        color = 'gray'
    } = defineProps<{
        readonly color?: FluxColor;
        readonly label: string;
    }>();

    defineSlots<{
        end?(): VNode[];
    }>();

    const tracker = inject(FluxStatisticsTrackerInjectionKey, null);
    const markerRef = useTemplateRef<HTMLElement>('marker');

    const cleanup = tracker?.registerMarker(markerRef);

    onUnmounted(() => cleanup?.());
</script>
