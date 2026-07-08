<template>
    <div
        ref="root"
        :class="$style.timeline"
        role="feed">
        <svg
            v-if="linePath"
            :class="$style.timelineLine"
            aria-hidden="true">
            <path :d="linePath"/>
        </svg>

        <slot/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { provide, useTemplateRef, type VNode } from 'vue';
    import { useTimeline } from '~flux/components/composable/private';
    import { FluxTimelineInjectionKey } from '~flux/components/data';
    import $style from '~flux/components/css/component/Timeline.module.scss';

    defineSlots<{
        default(): VNode[];
    }>();

    const rootRef = useTemplateRef('root');
    const {registerMarker, linePath} = useTimeline(rootRef);

    provide(FluxTimelineInjectionKey, {registerMarker});
</script>
