<template>
    <Base
        :class="$style.statisticsChartPane"
        :icon="icon"
        :title="title"
        :style="{
            '--aspect-ratio': aspectRatio,
            '--max-height': maxHeight && `${maxHeight}px`,
            '--min-height': minHeight && `${minHeight}px`
        }">
        <template
            v-if="slots.info"
            #info>
            <slot name="info"/>
        </template>

        <template #content>
            <div :class="$style.statisticsChartPaneBody">
                <div :class="$style.statisticsChartPaneContainer">
                    <slot/>
                </div>

                <slot name="legend"/>
            </div>

            <FluxToolbar v-if="slots.toolbar">
                <slot name="toolbar"/>
            </FluxToolbar>
        </template>
    </Base>
</template>

<script
    lang="ts"
    setup>
    import { FluxToolbar } from '@flux-ui/components';
    import type { FluxIconName } from '@flux-ui/types';
    import { provide } from 'vue';
    import { createChartLegendContext, FluxStatisticsChartLegendInjectionKey } from '~flux/statistics/composable';
    import Base from './FluxStatisticsBase.vue';
    import $style from '~flux/statistics/css/ChartPane.module.scss';

    defineProps<{
        readonly aspectRatio?: number;
        readonly maxHeight?: number;
        readonly minHeight?: number;
        readonly icon?: FluxIconName;
        readonly title?: string;
    }>();

    const slots = defineSlots<{
        default(): any;
        info?(): any;
        legend?(): any;
        toolbar?(): any;
    }>();

    provide(FluxStatisticsChartLegendInjectionKey, createChartLegendContext());
</script>
