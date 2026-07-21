<template>
    <div
        ref="root"
        :class="$style.tracker"
        role="list">
        <svg
            v-if="linePath || dashPath"
            :class="$style.trackerLine"
            aria-hidden="true">
            <path :d="linePath"/>

            <path
                :class="$style.trackerLineDashed"
                :d="dashPath"/>
        </svg>

        <slot/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { provide, useTemplateRef, type VNode } from 'vue';
    import { FluxStatisticsTrackerInjectionKey, useTracker } from '~flux/statistics/composable';
    import $style from '~flux/statistics/css/Tracker.module.scss';

    defineSlots<{
        default(): VNode[];
    }>();

    const rootRef = useTemplateRef<HTMLElement>('root');
    const {dashPath, linePath, registerGroup, registerMarker} = useTracker(rootRef);

    provide(FluxStatisticsTrackerInjectionKey, {registerGroup, registerMarker});
</script>
