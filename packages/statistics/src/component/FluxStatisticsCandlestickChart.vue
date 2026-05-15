<template>
    <Chart
        ref="chartRef"
        :options="mergedOptions"/>
</template>

<script
    lang="ts"
    setup>
    import type { FluxStatisticsChartCandlestickSeries } from '@flux-ui/types';
    import { merge } from 'lodash-es';
    import { computed } from 'vue';
    import { useChartSeriesSetup, type EChartsOption } from '~flux/statistics/composable';
    import { buildCartesianBaseOptions, buildCartesianTooltipOptions, resolveChartColor, toCandlestickSeries } from '~flux/statistics/util';
    import Chart from './FluxStatisticsChart.vue';
    import $style from '~flux/statistics/css/Chart.module.scss';

    const {
        advancedOptions = {},
        labels,
        series,
        splitLines = false,
        tooltip = false,
        xAxisLabels = false,
        yAxisLabels = false
    } = defineProps<{
        readonly advancedOptions?: EChartsOption;
        readonly labels?: readonly string[];
        readonly series: readonly FluxStatisticsChartCandlestickSeries[];
        readonly splitLines?: boolean;
        readonly tooltip?: boolean;
        readonly xAxisLabels?: boolean;
        readonly yAxisLabels?: boolean;
    }>();

    const { t } = useChartSeriesSetup(() => series, {
        getLegendItem: s => [
            {
                color: resolveChartColor(s.positiveColor) ?? 'var(--success-500)',
                icon: s.icon,
                label: 'Up'
            },
            {
                color: resolveChartColor(s.negativeColor) ?? 'var(--danger-500)',
                label: 'Down'
            }
        ]
    });

    const xLabels = computed<readonly string[] | undefined>(() => {
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

    const echartsSeries = computed(() => series.map(s =>
        toCandlestickSeries({ ...s, name: s.name ? t(String(s.name)) : undefined })
    ));

    const mergedOptions = computed<EChartsOption>(() => {
        const base = buildCartesianBaseOptions({ scale: true, xAxisLabels, yAxisLabels, splitLines });
        const xAxisOverride: EChartsOption | undefined = xLabels.value
            ? { xAxis: { type: 'category', data: xLabels.value as string[] } }
            : undefined;

        const tooltipOptions: EChartsOption = tooltip
            ? buildCartesianTooltipOptions(t, $style as never, () => series.map(s => s.icon))
            : { tooltip: { show: false } };

        return merge({}, base, xAxisOverride ?? {}, tooltipOptions, advancedOptions, { series: echartsSeries.value });
    });
</script>
