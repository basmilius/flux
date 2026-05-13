<template>
    <Chart
        ref="chartRef"
        :options="mergedOptions"/>
</template>

<script
    lang="ts"
    setup>
    import type { FluxStatisticsChartScatterSeries } from '@flux-ui/types';
    import { merge } from 'lodash-es';
    import { computed } from 'vue';
    import { useChartSeriesSetup, type EChartsOption } from '~flux/statistics/composable';
    import { buildCartesianBaseOptions, buildCartesianTooltipOptions, toScatterSeries } from '~flux/statistics/util';
    import Chart from './FluxStatisticsChart.vue';
    import $style from '~flux/statistics/css/Chart.module.scss';

    const {
        advancedOptions = {},
        series,
        tooltip = false
    } = defineProps<{
        readonly advancedOptions?: EChartsOption;
        readonly series: readonly FluxStatisticsChartScatterSeries[];
        readonly tooltip?: boolean;
    }>();

    const { t, palette } = useChartSeriesSetup(() => series);

    const echartsSeries = computed(() => series.map((s, i) =>
        toScatterSeries({ ...s, name: s.name ? t(String(s.name)) : undefined }, palette.value[i])
    ));

    const base = buildCartesianBaseOptions({
        xAxisType: 'value',
        yAxisType: 'value',
        scale: true,
        dashedSplitLines: true
    });

    const mergedOptions = computed<EChartsOption>(() => {
        const tooltipOptions: EChartsOption = tooltip
            ? buildCartesianTooltipOptions(t, $style as never, () => series.map(s => s.icon))
            : { tooltip: { show: false } };

        return merge({}, base, tooltipOptions, advancedOptions, { series: echartsSeries.value, color: palette.value });
    });
</script>
