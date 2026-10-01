<template>
    <Chart
        ref="chartRef"
        :options="mergedOptions"/>
</template>

<script
    lang="ts"
    setup>
    import type { FluxStatisticsChartMixedSeries } from '@flux-ui/types';
    import { BarChart, LineChart } from 'echarts/charts';
    import { use } from 'echarts/core';
    import { computed } from 'vue';
    import { type EChartsOption, useChartSeriesSetup } from '~flux/statistics/composable';
    import { buildMixedChartOptions, type ChartTooltipValueFormatter } from '~flux/statistics/util';
    import { Chart } from './primitive';
    import $style from '~flux/statistics/css/Chart.module.scss';

    const {
        advancedOptions,
        labels,
        series,
        splitLines = false,
        tooltip = false,
        tooltipValueFormatter,
        xAxisLabels = false,
        yAxisLabels = false
    } = defineProps<{
        readonly advancedOptions?: EChartsOption;
        readonly labels?: readonly string[];
        readonly series: readonly FluxStatisticsChartMixedSeries[];
        readonly splitLines?: boolean;
        readonly tooltip?: boolean;
        readonly tooltipValueFormatter?: ChartTooltipValueFormatter;
        readonly xAxisLabels?: boolean;
        readonly yAxisLabels?: boolean;
    }>();

    use([BarChart, LineChart]);

    const {t, palette} = useChartSeriesSetup(() => series);

    const mergedOptions = computed(() => buildMixedChartOptions({
        series,
        labels,
        palette: palette.value,
        t,
        styles: $style,
        tooltip,
        tooltipValueFormatter,
        xAxisLabels,
        yAxisLabels,
        splitLines,
        advancedOptions
    }));
</script>
