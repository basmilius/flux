<template>
    <Chart :options="mergedOptions"/>
</template>

<script
    lang="ts"
    setup>
    import type { GaugeSeriesOption } from 'echarts/charts';
    import { merge } from 'lodash-es';
    import { computed } from 'vue';
    import type { EChartsOption } from '~flux/statistics/composable';
    import { GAUGE_SERIES_DEFAULTS, POLAR_BASE_OPTIONS } from '~flux/statistics/util';
    import Chart from './FluxStatisticsChart.vue';

    const {
        options = {},
        series
    } = defineProps<{
        readonly options?: EChartsOption;
        readonly series: readonly GaugeSeriesOption[];
    }>();

    const decoratedSeries = computed<GaugeSeriesOption[]>(() =>
        series.map(item => ({ ...GAUGE_SERIES_DEFAULTS, ...item }))
    );

    const mergedOptions = computed<EChartsOption>(() =>
        merge({}, POLAR_BASE_OPTIONS, options, { series: decoratedSeries.value })
    );
</script>
