<template>
    <Chart
        :options="mergedOptions"/>
</template>

<script
    lang="ts"
    setup>
    import type { FluxStatisticsChartTreemapNode } from '@flux-ui/types';
    import { merge } from 'lodash-es';
    import { computed } from 'vue';
    import type { EChartsOption } from '~flux/statistics/composable';
    import { CHART_DEFAULT_COLORS, POLAR_BASE_OPTIONS, toTreemapSeries } from '~flux/statistics/util';
    import Chart from './FluxStatisticsChart.vue';

    const {
        advancedOptions = {},
        nodes
    } = defineProps<{
        readonly advancedOptions?: EChartsOption;
        readonly nodes: readonly FluxStatisticsChartTreemapNode[];
    }>();

    const echartsSeries = computed(() => [toTreemapSeries(nodes, CHART_DEFAULT_COLORS)]);

    const mergedOptions = computed<EChartsOption>(() =>
        merge({}, POLAR_BASE_OPTIONS, advancedOptions, { series: echartsSeries.value })
    );
</script>
