<template>
    <Base
        :class="$style.statisticsChartPane"
        :icon="icon"
        :title="title"
        :style="{
            '--aspect-ratio': aspectRatio,
            '--max-height': maxHeight && `${maxHeight}px`,
            '--min-height': minHeight && `${minHeight}px`
        }"
        #content>
        <div :class="$style.statisticsChartPaneBody">
            <div :class="$style.statisticsChartPaneContainer">
                <slot/>
            </div>

            <slot name="legend"/>
        </div>

        <FluxToolbar v-if="slots.toolbar">
            <slot name="toolbar"/>
        </FluxToolbar>
    </Base>
</template>

<script
    lang="ts"
    setup>
    import { FluxToolbar } from '@flux-ui/components';
    import type { FluxIconName } from '@flux-ui/types';
    import Base from './FluxStatisticsBase.vue';
    import $style from '$fluxStatistics/css/ChartPane.module.scss';

    defineProps<{
        readonly aspectRatio?: number;
        readonly maxHeight?: number;
        readonly minHeight?: number;
        readonly icon?: FluxIconName;
        readonly title?: string;
    }>();

    const slots = defineSlots<{
        default(): any;
        legend?(): any;
        toolbar?(): any;
    }>();
</script>
