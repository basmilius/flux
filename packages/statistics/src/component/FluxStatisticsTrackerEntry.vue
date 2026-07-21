<template>
    <div
        :class="COLOR_MAP[color]"
        role="listitem">
        <div
            v-if="icon"
            ref="marker"
            :class="$style.trackerEntryMarker">
            <FluxIcon
                :name="icon"
                :size="20"/>
        </div>

        <span
            v-else
            ref="marker"
            :class="$style.trackerEntryDot"/>

        <div :class="$style.trackerEntryBody">
            <div
                v-if="title || description || when || slots.start || slots.end"
                :class="$style.trackerEntryHeader">
                <div :class="$style.trackerEntryHeading">
                    <slot name="start"/>

                    <strong
                        v-if="title"
                        :class="$style.trackerEntryTitle">
                        {{ title }}
                    </strong>

                    <span
                        v-if="description"
                        :class="$style.trackerEntryDescription">
                        {{ description }}
                    </span>

                    <slot name="end"/>
                </div>

                <span
                    v-if="when"
                    :class="$style.trackerEntryWhen">
                    {{ when }}
                </span>
            </div>

            <slot/>
        </div>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { FluxIcon } from '@flux-ui/components';
    import type { FluxColor, FluxIconName } from '@flux-ui/types';
    import { inject, onUnmounted, useTemplateRef, type VNode } from 'vue';
    import { FluxStatisticsTrackerInjectionKey } from '~flux/statistics/composable';
    import $style from '~flux/statistics/css/Tracker.module.scss';

    const COLOR_MAP: Record<FluxColor, string> = {
        gray: $style.trackerEntryGray,
        primary: $style.trackerEntryPrimary,
        danger: $style.trackerEntryDanger,
        info: $style.trackerEntryInfo,
        success: $style.trackerEntrySuccess,
        warning: $style.trackerEntryWarning
    };

    const {
        color = 'gray'
    } = defineProps<{
        readonly color?: FluxColor;
        readonly description?: string;
        readonly icon?: FluxIconName;
        readonly title?: string;
        readonly when?: string;
    }>();

    const slots = defineSlots<{
        default?(): VNode[];
        end?(): VNode[];
        start?(): VNode[];
    }>();

    const tracker = inject(FluxStatisticsTrackerInjectionKey, null);
    const markerRef = useTemplateRef<HTMLElement>('marker');

    const cleanup = tracker?.registerMarker(markerRef);

    onUnmounted(() => cleanup?.());
</script>
