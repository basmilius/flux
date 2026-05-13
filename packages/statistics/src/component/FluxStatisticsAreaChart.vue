<template>
    <Chart
        ref="chartRef"
        :options="mergedOptions"/>
</template>

<script
    lang="ts"
    setup>
    import type { FluxStatisticsChartAreaSeries } from '@flux-ui/types';
    import { merge } from 'lodash-es';
    import { computed } from 'vue';
    import { useChartSeriesSetup, type EChartsOption } from '~flux/statistics/composable';
    import { buildCartesianTooltipOptions, cartesianFallbackLabels, extractLabels, toAreaSeries } from '~flux/statistics/util';
    import Chart from './FluxStatisticsChart.vue';
    import $style from '~flux/statistics/css/Chart.module.scss';

    const {
        advancedOptions = {},
        labels,
        series,
        tooltip = false
    } = defineProps<{
        readonly advancedOptions?: EChartsOption;
        readonly labels?: readonly string[];
        readonly series: readonly FluxStatisticsChartAreaSeries[];
        readonly tooltip?: boolean;
    }>();

    const { t, palette } = useChartSeriesSetup(() => series);

    const xAxisLabels = computed<readonly string[]>(() => labels ?? extractLabels(series) ?? cartesianFallbackLabels(series));

    const echartsSeries = computed(() => series.map((s, i) =>
        toAreaSeries({ ...s, name: s.name ? t(String(s.name)) : undefined }, palette.value[i])
    ));

    const mergedOptions = computed<EChartsOption>(() => {
        const base: EChartsOption = {
            grid: { left: 9, right: 9, top: 9, bottom: 24, containLabel: true },
            xAxis: { type: 'category', data: xAxisLabels.value as string[], boundaryGap: false },
            yAxis: { type: 'value', show: false }
        };

        const tooltipOptions: EChartsOption = tooltip
            ? buildCartesianTooltipOptions(t, $style as never, () => series.map(s => s.icon))
            : { tooltip: { show: false } };

        return merge({}, base, tooltipOptions, advancedOptions, { series: echartsSeries.value, color: palette.value });
    });
</script>
