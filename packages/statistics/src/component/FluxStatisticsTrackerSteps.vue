<template>
    <div
        :class="$style.trackerSteps"
        role="list">
        <slot/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { inject, onUnmounted, provide, type VNode } from 'vue';
    import { FluxStatisticsTrackerGroupInjectionKey, FluxStatisticsTrackerInjectionKey } from '~flux/statistics/composable';
    import $style from '~flux/statistics/css/Tracker.module.scss';

    defineSlots<{
        default(): VNode[];
    }>();

    const tracker = inject(FluxStatisticsTrackerInjectionKey, null);
    const group = tracker?.registerGroup();

    if (group) {
        provide(FluxStatisticsTrackerGroupInjectionKey, group);
    }

    onUnmounted(() => group?.dispose());
</script>
