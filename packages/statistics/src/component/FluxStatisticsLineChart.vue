<template>
    <Chart :options="mergedOptions"/>
</template>

<script
    lang="ts"
    setup>
    import type { LineSeriesOption } from 'echarts/charts';
    import { merge } from 'lodash-es';
    import { computed, inject, watchEffect } from 'vue';
    import { useI18n } from 'vue-i18n';
    import { FluxStatisticsChartLegendInjectionKey, type ChartLegendItem } from '~flux/statistics/composable';
    import type { EChartsOption } from '~flux/statistics/composable';
    import { CHART_DEFAULT_COLORS, LINE_SERIES_DEFAULTS } from '~flux/statistics/util';
    import Chart from './FluxStatisticsChart.vue';

    const {
        options = {},
        series
    } = defineProps<{
        readonly options?: EChartsOption;
        readonly series: readonly LineSeriesOption[];
    }>();

    const {t} = useI18n({useScope: 'parent'});

    const legendContext = inject(FluxStatisticsChartLegendInjectionKey, null);

    const translatedSeries = computed<LineSeriesOption[]>(() =>
        series.map(item => ({
            ...LINE_SERIES_DEFAULTS,
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

    const mergedOptions = computed<EChartsOption>(() => {
        const userXAxisData = (options as { xAxis?: { data?: unknown } }).xAxis?.data;
        const longest = translatedSeries.value.reduce((max, s) => Math.max(max, Array.isArray(s.data) ? s.data.length : 0), 0);
        const inferredXAxisData = Array.isArray(userXAxisData)
            ? undefined
            : Array.from({ length: longest }, (_, i) => String(i + 1));

        const base: EChartsOption = {
            grid: { left: 9, right: 9, top: 9, bottom: 24, containLabel: true },
            tooltip: { trigger: 'axis' },
            xAxis: { type: 'category', data: inferredXAxisData, boundaryGap: false },
            yAxis: { type: 'value', show: false }
        };

        return merge({}, base, options, { series: translatedSeries.value });
    });
</script>
