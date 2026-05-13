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
    import { buildCartesianTooltipOptions, cartesianFallbackLabels, extractLabels, toBarSeries } from '~flux/statistics/util';
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
        readonly series: readonly FluxStatisticsChartBarSeries[];
        readonly tooltip?: boolean;
    }>();

    const { t, palette } = useChartSeriesSetup(() => series);

    const xAxisLabels = computed<readonly string[]>(() => labels ?? extractLabels(series) ?? cartesianFallbackLabels(series));

    const echartsSeries = computed(() => series.map((s, i) =>
        toBarSeries({ ...s, name: s.name ? t(String(s.name)) : undefined }, palette.value[i])
    ));

    const mergedOptions = computed<EChartsOption>(() => {
        const base: EChartsOption = {
            grid: { left: 9, right: 9, top: 18, bottom: 24 },
            xAxis: {
                type: 'category',
                show: true,
                data: xAxisLabels.value as string[],
                axisLabel: { show: true, color: 'var(--foreground-secondary)' }
            },
            yAxis: { show: false }
        };

        const tooltipOptions: EChartsOption = tooltip
            ? buildCartesianTooltipOptions(t, $style as never, () => series.map(s => s.icon))
            : { tooltip: { show: false } };

        return merge({}, base, tooltipOptions, advancedOptions, { series: echartsSeries.value, color: palette.value });
    });
</script>
