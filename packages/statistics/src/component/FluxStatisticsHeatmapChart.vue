<template>
    <Chart
        :options="mergedOptions"/>
</template>

<script
    lang="ts"
    setup>
    import type { FluxStatisticsChartHeatmapSeries } from '@flux-ui/types';
    import { computed } from 'vue';
    import { type EChartsOption, useChartBaseSetup } from '~flux/statistics/composable';
    import { buildHeatmapChartOptions } from '~flux/statistics/util';
    import Chart from './FluxStatisticsChart.vue';
    import $style from '~flux/statistics/css/Chart.module.scss';

    const {
        advancedOptions,
        series,
        tooltip = false,
        xAxisLabels = false,
        xLabels = [],
        yAxisLabels = false,
        yLabels = []
    } = defineProps<{
        readonly advancedOptions?: EChartsOption;
        readonly series: readonly FluxStatisticsChartHeatmapSeries[];
        readonly tooltip?: boolean;
        readonly xAxisLabels?: boolean;
        readonly xLabels?: readonly string[];
        readonly yAxisLabels?: boolean;
        readonly yLabels?: readonly string[];
    }>();

    const {t} = useChartBaseSetup();

    const mergedOptions = computed(() => buildHeatmapChartOptions({
        series,
        xLabels,
        yLabels,
        t,
        styles: $style,
        tooltip,
        xAxisLabels,
        yAxisLabels,
        advancedOptions
    }));
</script>
