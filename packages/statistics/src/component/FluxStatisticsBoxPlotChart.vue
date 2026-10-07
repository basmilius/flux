<template>
    <Chart
        ref="chartRef"
        :options="mergedOptions"/>
</template>

<script
    lang="ts"
    setup>
    import type { FluxStatisticsChartBoxPlotSeries } from '@flux-ui/types';
    import { BoxplotChart } from 'echarts/charts';
    import { use } from 'echarts/core';
    import { computed } from 'vue';
    import { type EChartsOption, useChartSeriesSetup } from '~flux/statistics/composable';
    import { buildBoxPlotChartOptions } from '~flux/statistics/util';
    import { Chart } from './primitive';
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

    use([BoxplotChart]);

    const {t, palette} = useChartSeriesSetup(() => series);

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
