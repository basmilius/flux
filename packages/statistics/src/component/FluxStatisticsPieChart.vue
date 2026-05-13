<template>
    <Chart
        :options="mergedOptions"/>
</template>

<script
    lang="ts"
    setup>
    import type { PieSeriesOption } from 'echarts/charts';
    import { merge } from 'lodash-es';
    import { computed } from 'vue';
    import type { EChartsOption } from '~flux/statistics/composable';
    import { PIE_SERIES_DEFAULTS, POLAR_BASE_OPTIONS } from '~flux/statistics/util';
    import Chart from './FluxStatisticsChart.vue';

    const {
        options = {},
        series
    } = defineProps<{
        readonly options?: EChartsOption;
        readonly series: readonly PieSeriesOption[];
    }>();

    const decoratedSeries = computed<PieSeriesOption[]>(() =>
        series.map(item => ({ ...PIE_SERIES_DEFAULTS, ...item }))
    );

    const mergedOptions = computed<EChartsOption>(() =>
        merge({}, POLAR_BASE_OPTIONS, options, { series: decoratedSeries.value })
    );
</script>
