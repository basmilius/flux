<template>
    <Chart
        ref="chartRef"
        :options="mergedOptions"/>
</template>

<script
    lang="ts"
    setup>
    import type { FluxStatisticsChartScatterSeries } from '@flux-ui/types';
    import { ScatterChart } from 'echarts/charts';
    import { use } from 'echarts/core';
    import { computed } from 'vue';
    import { type EChartsOption, useChartSeriesSetup } from '~flux/statistics/composable';
    import { buildScatterChartOptions, type ChartTooltipValueFormatter } from '~flux/statistics/util';
    import { Chart } from './primitive';
    import $style from '~flux/statistics/css/Chart.module.scss';

    const {
        advancedOptions,
        series,
        splitLines = false,
        tooltip = false,
        tooltipValueFormatter,
        xAxisLabels = false,
        yAxisLabels = false
    } = defineProps<{
        readonly advancedOptions?: EChartsOption;
        readonly series: readonly FluxStatisticsChartScatterSeries[];
        readonly splitLines?: boolean;
        readonly tooltip?: boolean;
        readonly tooltipValueFormatter?: ChartTooltipValueFormatter;
        readonly xAxisLabels?: boolean;
        readonly yAxisLabels?: boolean;
    }>();

    use([ScatterChart]);

    const {t, palette} = useChartSeriesSetup(() => series);

    const mergedOptions = computed(() => buildScatterChartOptions({
        series,
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
