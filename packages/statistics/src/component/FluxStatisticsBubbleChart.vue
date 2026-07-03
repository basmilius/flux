<template>
    <Chart
        ref="chartRef"
        :options="mergedOptions"/>
</template>

<script
    lang="ts"
    setup>
    import type { FluxStatisticsChartBubbleSeries } from '@flux-ui/types';
    import { computed } from 'vue';
    import { type EChartsOption, useChartSeriesSetup } from '~flux/statistics/composable';
    import { buildBubbleChartOptions, type ChartTooltipValueFormatter } from '~flux/statistics/util';
    import Chart from './FluxStatisticsChart.vue';
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
        readonly series: readonly FluxStatisticsChartBubbleSeries[];
        readonly splitLines?: boolean;
        readonly tooltip?: boolean;
        readonly tooltipValueFormatter?: ChartTooltipValueFormatter;
        readonly xAxisLabels?: boolean;
        readonly yAxisLabels?: boolean;
    }>();

    const { t, palette } = useChartSeriesSetup(() => series);

    const mergedOptions = computed(() => buildBubbleChartOptions({
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
