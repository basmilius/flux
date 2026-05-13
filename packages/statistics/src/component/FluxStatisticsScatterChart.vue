<template>
    <Chart
        :options="mergedOptions"/>
</template>

<script
    lang="ts"
    setup>
    import type { ScatterSeriesOption } from 'echarts/charts';
    import { merge } from 'lodash-es';
    import { computed, inject, watchEffect } from 'vue';
    import { useI18n } from 'vue-i18n';
    import { type ChartLegendItem, FluxStatisticsChartLegendInjectionKey } from '~flux/statistics/composable';
    import type { EChartsOption } from '~flux/statistics/composable';
    import { buildCartesianBaseOptions, CHART_DEFAULT_COLORS, SCATTER_SERIES_DEFAULTS } from '~flux/statistics/util';
    import Chart from './FluxStatisticsChart.vue';

    const {
        options = {},
        series
    } = defineProps<{
        readonly options?: EChartsOption;
        readonly series: readonly ScatterSeriesOption[];
    }>();

    const {t} = useI18n({useScope: 'parent'});

    const legendContext = inject(FluxStatisticsChartLegendInjectionKey, null);

    const translatedSeries = computed<ScatterSeriesOption[]>(() =>
        series.map(item => ({
            ...SCATTER_SERIES_DEFAULTS,
            ...item,
            name: item.name ? t(String(item.name)) : undefined
        }))
    );

    const palette = computed<readonly string[]>(() => {
        const userColors = (options as { color?: unknown }).color;
        return Array.isArray(userColors) ? userColors as readonly string[] : CHART_DEFAULT_COLORS;
    });

    const legendItems = computed<readonly ChartLegendItem[]>(() =>
        translatedSeries.value.map((s, index) => ({
            color: palette.value[index % palette.value.length],
            label: s.name ?? ''
        }))
    );

    watchEffect(() => {
        if (legendContext) {
            legendContext.items.value = legendItems.value;
        }
    });

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
