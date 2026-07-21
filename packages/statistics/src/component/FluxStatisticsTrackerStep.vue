<template>
    <div
        :class="STATE_MAP[state]"
        role="listitem">
        <span
            ref="marker"
            :class="$style.trackerStepMarker">
            <FluxIcon
                v-if="state === 'done'"
                name="circle-check"
                :size="16"/>

            <span
                v-else
                :class="$style.trackerStepDot"/>
        </span>

        <span :class="$style.trackerStepLabel">
            <slot>{{ label }}</slot>
        </span>

        <slot name="end"/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { FluxIcon } from '@flux-ui/components';
    import { inject, onUnmounted, useTemplateRef, type VNode } from 'vue';
    import { FluxStatisticsTrackerGroupInjectionKey } from '~flux/statistics/composable';
    import $style from '~flux/statistics/css/Tracker.module.scss';

    const STATE_MAP = {
        active: $style.trackerStepActive,
        done: $style.trackerStepDone,
        pending: $style.trackerStep
    } as const;

    const {
        state = 'pending'
    } = defineProps<{
        readonly label?: string;
        readonly state?: 'active' | 'done' | 'pending';
    }>();

    defineSlots<{
        default?(): VNode[];
        end?(): VNode[];
    }>();

    const group = inject(FluxStatisticsTrackerGroupInjectionKey, null);
    const markerRef = useTemplateRef<HTMLElement>('marker');

    const cleanup = group?.registerStep(markerRef);

    onUnmounted(() => cleanup?.());
</script>
