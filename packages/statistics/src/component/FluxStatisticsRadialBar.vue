<template>
    <Chart
        ref="chartRef"
        :options="mergedOptions"/>
</template>

<script
    lang="ts"
    setup>
    import type { FluxStatisticsChartGaugeSeries } from '@flux-ui/types';
    import { GaugeChart } from 'echarts/charts';
    import { use } from 'echarts/core';
    import { computed } from 'vue';
    import { type EChartsOption, useChartSeriesSetup } from '~flux/statistics/composable';
    import { buildGaugeChartOptions, gaugeLegendItemBuilder } from '~flux/statistics/util';
    import { Chart } from './primitive';
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

    use([GaugeChart]);

    const {t, palette} = useChartSeriesSetup(() => series, {
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
