<template>
    <Chart
        ref="chartRef"
        :options="mergedOptions"/>
</template>

<script
    lang="ts"
    setup>
    import type { FluxStatisticsChartMixedSeries } from '@flux-ui/types';
    import { merge } from 'lodash-es';
    import { computed } from 'vue';
    import { useChartSeriesSetup, type EChartsOption } from '~flux/statistics/composable';
    import { buildCartesianBaseOptions, buildCartesianTooltipOptions, cartesianFallbackLabels, extractLabels, toMixedSeries } from '~flux/statistics/util';
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
        readonly series: readonly FluxStatisticsChartMixedSeries[];
        readonly tooltip?: boolean;
    }>();

    const { t, palette } = useChartSeriesSetup(() => series);

    const xAxisLabels = computed<readonly string[]>(() => labels ?? extractLabels(series) ?? cartesianFallbackLabels(series));

    const echartsSeries = computed(() => series.map((s, i) =>
        toMixedSeries({ ...s, name: s.name ? t(String(s.name)) : undefined }, palette.value[i])
    ));

    const mergedOptions = computed<EChartsOption>(() => {
        const base = buildCartesianBaseOptions({ tooltipTrigger: 'axis', dashedSplitLines: true });
        const xAxisOverride: EChartsOption = { xAxis: { type: 'category', data: xAxisLabels.value as string[] } };
        const tooltipOptions: EChartsOption = tooltip
            ? buildCartesianTooltipOptions(t, $style as never, () => series.map(s => s.icon))
            : { tooltip: { show: false } };

        return merge({}, base, xAxisOverride, tooltipOptions, advancedOptions, { series: echartsSeries.value, color: palette.value });
    });
</script>
