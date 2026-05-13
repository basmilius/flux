<template>
    <Chart
        :options="mergedOptions"/>
</template>

<script
    lang="ts"
    setup>
    import type { RadarSeriesOption } from 'echarts/charts';
    import { merge } from 'lodash-es';
    import { computed } from 'vue';
    import { useI18n } from 'vue-i18n';
    import type { EChartsOption } from '~flux/statistics/composable';
    import { POLAR_BASE_OPTIONS, RADAR_SERIES_DEFAULTS } from '~flux/statistics/util';
    import Chart from './FluxStatisticsChart.vue';

    const {
        options = {},
        series
    } = defineProps<{
        readonly options?: EChartsOption;
        readonly series: readonly RadarSeriesOption[];
    }>();

    const {t} = useI18n({useScope: 'parent'});

    const translatedSeries = computed<RadarSeriesOption[]>(() =>
        series.map(item => ({
            ...RADAR_SERIES_DEFAULTS,
            ...item,
            name: item.name ? t(String(item.name)) : undefined
        }))
    );

    const base: EChartsOption = {
        ...POLAR_BASE_OPTIONS,
        tooltip: { trigger: 'item' },
        radar: {
            splitLine: { lineStyle: { color: 'var(--gray-200)' } },
            splitArea: { show: false },
            axisLine: { lineStyle: { color: 'var(--gray-200)' } },
            axisName: {
                color: 'var(--foreground-secondary)',
                fontSize: 12,
                fontWeight: 500
            }
        }
    };

    const mergedOptions = computed<EChartsOption>(() =>
        merge({}, base, options, { series: translatedSeries.value })
    );
</script>
