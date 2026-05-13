<template>
    <Chart
        ref="chartRef"
        :options="mergedOptions"/>
</template>

<script
    lang="ts"
    setup>
    import type { FluxStatisticsChartBoxPlotSeries } from '@flux-ui/types';
    import { merge } from 'lodash-es';
    import { computed } from 'vue';
    import { useChartSeriesSetup, type EChartsOption } from '~flux/statistics/composable';
    import { buildBoxPlotTooltipOptions, buildCartesianBaseOptions, toBoxPlotSeries } from '~flux/statistics/util';
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
        readonly series: readonly FluxStatisticsChartBoxPlotSeries[];
        readonly tooltip?: boolean;
    }>();

    const { t, palette } = useChartSeriesSetup(() => series);

    const xAxisLabels = computed<readonly string[] | undefined>(() => {
        if (labels) {
            return labels;
        }

        for (const s of series) {
            const fromPoints = s.data.map(p => p.label ?? '').filter(Boolean);
            if (fromPoints.length > 0) {
                return s.data.map(p => p.label ?? '');
            }
        }

        return undefined;
    });

    const echartsSeries = computed(() => series.map((s, i) =>
        toBoxPlotSeries({ ...s, name: s.name ? t(String(s.name)) : undefined }, palette.value[i])
    ));

    const mergedOptions = computed<EChartsOption>(() => {
        const base = buildCartesianBaseOptions({ dashedSplitLines: true });
        const xAxisOverride: EChartsOption | undefined = xAxisLabels.value
            ? { xAxis: { type: 'category', data: xAxisLabels.value as string[] } }
            : undefined;

        const tooltipOptions: EChartsOption = tooltip
            ? buildBoxPlotTooltipOptions(t, $style as never, () => series, () => palette.value)
            : { tooltip: { show: false } };

        return merge({}, base, xAxisOverride ?? {}, tooltipOptions, advancedOptions, { series: echartsSeries.value, color: palette.value });
    });
</script>
