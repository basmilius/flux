<template>
    <Chart
        :options="mergedOptions"/>
</template>

<script
    lang="ts"
    setup>
    import type { TreemapSeriesOption } from 'echarts/charts';
    import { merge } from 'lodash-es';
    import { computed } from 'vue';
    import type { EChartsOption } from '~flux/statistics/composable';
    import { POLAR_BASE_OPTIONS, TREEMAP_SERIES_DEFAULTS } from '~flux/statistics/util';
    import Chart from './FluxStatisticsChart.vue';

    const {
        options = {},
        series
    } = defineProps<{
        readonly options?: EChartsOption;
        readonly series: readonly TreemapSeriesOption[];
    }>();

    const decoratedSeries = computed<TreemapSeriesOption[]>(() =>
        series.map(item => ({ ...TREEMAP_SERIES_DEFAULTS, ...item }))
    );

    const mergedOptions = computed<EChartsOption>(() =>
        merge({}, POLAR_BASE_OPTIONS, options, { series: decoratedSeries.value })
    );
</script>
