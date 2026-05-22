<template>
    <Chart
        ref="chartRef"
        :options="mergedOptions"/>
</template>

<script
    lang="ts"
    setup>
    import type { FluxStatisticsChartGaugeSeries } from '@flux-ui/types';
    import { computed } from 'vue';
    import { useChartSeriesSetup, type EChartsOption } from '~flux/statistics/composable';
    import { buildGaugeChartOptions, gaugeLegendItemBuilder } from '~flux/statistics/util';
    import Chart from './FluxStatisticsChart.vue';
    import $style from '~flux/statistics/css/Chart.module.scss';

    const {
        advancedOptions,
        series,
        tooltip = false
    } = defineProps<{
        readonly advancedOptions?: EChartsOption;
        readonly series: readonly FluxStatisticsChartGaugeSeries[];
        readonly tooltip?: boolean;
    }>();

    const { t, palette } = useChartSeriesSetup(() => series, {
        getLegendItem: gaugeLegendItemBuilder
    });

    const mergedOptions = computed(() => buildGaugeChartOptions({
        series,
        palette: palette.value,
        t,
        styles: $style,
        tooltip,
        advancedOptions
    }));
</script>
