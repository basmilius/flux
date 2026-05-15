<template>
    <Chart
        ref="chartRef"
        :options="mergedOptions"/>
</template>

<script
    lang="ts"
    setup>
    import type { FluxStatisticsChartBarSeries } from '@flux-ui/types';
    import { merge } from 'lodash-es';
    import { computed } from 'vue';
    import { useChartSeriesSetup, type EChartsOption } from '~flux/statistics/composable';
    import { buildCartesianBaseOptions, buildCartesianTooltipOptions, cartesianFallbackLabels, type ChartTooltipValueFormatter, extractLabels, toBarSeries } from '~flux/statistics/util';
    import Chart from './FluxStatisticsChart.vue';
    import $style from '~flux/statistics/css/Chart.module.scss';

    const {
        advancedOptions = {},
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
        readonly series: readonly FluxStatisticsChartBarSeries[];
        readonly splitLines?: boolean;
        readonly tooltip?: boolean;
        readonly tooltipValueFormatter?: ChartTooltipValueFormatter;
        readonly xAxisLabels?: boolean;
        readonly yAxisLabels?: boolean;
    }>();

    const { t, palette } = useChartSeriesSetup(() => series);

    const xLabels = computed<readonly string[]>(() => labels ?? extractLabels(series) ?? cartesianFallbackLabels(series));

    const echartsSeries = computed(() => series.map((s, i) =>
        toBarSeries({ ...s, name: s.name ? t(String(s.name)) : undefined }, palette.value[i])
    ));

    const mergedOptions = computed<EChartsOption>(() => {
        const base = buildCartesianBaseOptions({ xAxisLabels, yAxisLabels, splitLines });
        const xAxisOverride: EChartsOption = { xAxis: { type: 'category', data: xLabels.value as string[] } };

        const tooltipOptions: EChartsOption = tooltip
            ? buildCartesianTooltipOptions(t, $style as never, () => series.map(s => s.icon), tooltipValueFormatter)
            : { tooltip: { show: false } };

        return merge({}, base, xAxisOverride, tooltipOptions, advancedOptions, { series: echartsSeries.value, color: palette.value });
    });
</script>
