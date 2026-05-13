<template>
    <Chart
        :options="mergedOptions"/>
</template>

<script
    lang="ts"
    setup>
    import type { ScatterSeriesOption } from 'echarts/charts';
    import { merge } from 'lodash-es';
    import { computed } from 'vue';
    import { useI18n } from 'vue-i18n';
    import type { EChartsOption } from '~flux/statistics/composable';
    import { buildCartesianBaseOptions, BUBBLE_SERIES_DEFAULTS } from '~flux/statistics/util';
    import Chart from './FluxStatisticsChart.vue';

    const MIN_RADIUS = 6;
    const MAX_RADIUS = 28;

    const {
        options = {},
        series
    } = defineProps<{
        readonly options?: EChartsOption;
        readonly series: readonly ScatterSeriesOption[];
    }>();

    const {t} = useI18n({useScope: 'parent'});

    const maxValue = computed(() => {
        let max = 0;

        for (const item of series) {
            const data = (item.data ?? []) as readonly (readonly number[])[];

            for (const point of data) {
                const value = Array.isArray(point) ? Number(point[2]) : 0;

                if (Number.isFinite(value) && value > max) {
                    max = value;
                }
            }
        }

        return max || 1;
    });

    const translatedSeries = computed<ScatterSeriesOption[]>(() =>
        series.map(item => ({
            ...BUBBLE_SERIES_DEFAULTS,
            symbolSize: (val: number[]) => {
                const ratio = Math.min(Math.max(Number(val?.[2] ?? 0) / maxValue.value, 0), 1);
                return MIN_RADIUS + ratio * (MAX_RADIUS - MIN_RADIUS);
            },
            ...item,
            name: item.name ? t(String(item.name)) : undefined
        }))
    );

    const base = buildCartesianBaseOptions({
        xAxisType: 'value',
        yAxisType: 'value',
        scale: true,
        dashedSplitLines: true
    });

    const mergedOptions = computed<EChartsOption>(() =>
        merge({}, base, options, { series: translatedSeries.value })
    );
</script>
