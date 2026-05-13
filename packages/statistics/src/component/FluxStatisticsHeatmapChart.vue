<template>
    <Chart
        :options="mergedOptions"/>
</template>

<script
    lang="ts"
    setup>
    import { blue100, blue300, blue500, blue700 } from '@flux-ui/internals';
    import type { HeatmapSeriesOption } from 'echarts/charts';
    import { merge } from 'lodash-es';
    import { computed } from 'vue';
    import { useI18n } from 'vue-i18n';
    import type { EChartsOption } from '~flux/statistics/composable';
    import { buildCartesianBaseOptions, HEATMAP_SERIES_DEFAULTS } from '~flux/statistics/util';
    import Chart from './FluxStatisticsChart.vue';

    const {
        options = {},
        series
    } = defineProps<{
        readonly options?: EChartsOption;
        readonly series: readonly HeatmapSeriesOption[];
    }>();

    const {t} = useI18n({useScope: 'parent'});

    const translatedSeries = computed<HeatmapSeriesOption[]>(() =>
        series.map(item => ({
            ...HEATMAP_SERIES_DEFAULTS,
            ...item,
            name: item.name ? t(String(item.name)) : undefined
        }))
    );

    const base: EChartsOption = {
        ...buildCartesianBaseOptions({ yAxisType: 'category' }),
        color: [blue500],
        grid: { left: 6, right: 6, top: 6, bottom: 24, containLabel: true },
        visualMap: {
            show: false,
            min: 0,
            max: 100,
            inRange: { color: [blue100, blue300, blue500, blue700] }
        }
    };

    const mergedOptions = computed<EChartsOption>(() =>
        merge({}, base, options, { series: translatedSeries.value })
    );
</script>
