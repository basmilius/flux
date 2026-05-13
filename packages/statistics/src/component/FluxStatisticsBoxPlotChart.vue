<template>
    <Chart
        :options="mergedOptions"/>
</template>

<script
    lang="ts"
    setup>
    import type { BoxplotSeriesOption } from 'echarts/charts';
    import { merge } from 'lodash-es';
    import { computed } from 'vue';
    import { useI18n } from 'vue-i18n';
    import type { EChartsOption } from '~flux/statistics/composable';
    import { BOXPLOT_SERIES_DEFAULTS, buildCartesianBaseOptions } from '~flux/statistics/util';
    import Chart from './FluxStatisticsChart.vue';

    const {
        options = {},
        series
    } = defineProps<{
        readonly options?: EChartsOption;
        readonly series: readonly BoxplotSeriesOption[];
    }>();

    const {t} = useI18n({useScope: 'parent'});

    const translatedSeries = computed<BoxplotSeriesOption[]>(() =>
        series.map(item => ({
            ...BOXPLOT_SERIES_DEFAULTS,
            ...item,
            name: item.name ? t(String(item.name)) : undefined
        }))
    );

    const base = buildCartesianBaseOptions({ dashedSplitLines: true });

    const mergedOptions = computed<EChartsOption>(() =>
        merge({}, base, options, { series: translatedSeries.value })
    );
</script>
