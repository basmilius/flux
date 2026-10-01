<template>
    <Chart
        ref="chartRef"
        :options="mergedOptions"/>
</template>

<script
    lang="ts"
    setup>
    import type { FluxStatisticsChartRadarIndicator, FluxStatisticsChartRadarSeries } from '@flux-ui/types';
    import { RadarChart } from 'echarts/charts';
    import { RadarComponent } from 'echarts/components';
    import { use } from 'echarts/core';
    import { computed } from 'vue';
    import { type EChartsOption, useChartSeriesSetup } from '~flux/statistics/composable';
    import { buildRadarChartOptions } from '~flux/statistics/util';
    import { Chart } from './primitive';
    import $style from '~flux/statistics/css/Chart.module.scss';

    const {
        advancedOptions,
        indicators,
        series,
        tooltip = false
    } = defineProps<{
        readonly advancedOptions?: EChartsOption;
        readonly indicators: readonly FluxStatisticsChartRadarIndicator[];
        readonly series: readonly FluxStatisticsChartRadarSeries[];
        readonly tooltip?: boolean;
    }>();

    use([RadarChart, RadarComponent]);

    const {t, palette} = useChartSeriesSetup(() => series, {mode: 'data'});

    const mergedOptions = computed(() => buildRadarChartOptions({
        series,
        indicators,
        palette: palette.value,
        t,
        styles: $style,
        tooltip,
        advancedOptions
    }));
</script>
