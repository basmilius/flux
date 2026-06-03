<template>
    <Chart
        ref="chartRef"
        :options="mergedOptions"/>
</template>

<script
    lang="ts"
    setup>
    import type { FluxStatisticsChartBoxPlotSeries } from '@flux-ui/types';
    import { computed } from 'vue';
    import { type EChartsOption, useChartSeriesSetup } from '~flux/statistics/composable';
    import { buildBoxPlotChartOptions } from '~flux/statistics/util';
    import Chart from './FluxStatisticsChart.vue';
    import $style from '~flux/statistics/css/Chart.module.scss';

    const {
        advancedOptions,
        labels,
        series,
        splitLines = false,
        tooltip = false,
        xAxisLabels = false,
        yAxisLabels = false
    } = defineProps<{
        readonly advancedOptions?: EChartsOption;
        readonly labels?: readonly string[];
        readonly series: readonly FluxStatisticsChartBoxPlotSeries[];
        readonly splitLines?: boolean;
        readonly tooltip?: boolean;
        readonly xAxisLabels?: boolean;
        readonly yAxisLabels?: boolean;
    }>();

    const { t, palette } = useChartSeriesSetup(() => series);

    const mergedOptions = computed(() => buildBoxPlotChartOptions({
        series,
        labels,
        palette: palette.value,
        t,
        styles: $style,
        tooltip,
        xAxisLabels,
        yAxisLabels,
        splitLines,
        advancedOptions
    }));
</script>
