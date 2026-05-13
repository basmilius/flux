<template>
    <Chart
        :options="mergedOptions"/>
</template>

<script
    lang="ts"
    setup>
    import type { BarSeriesOption } from 'echarts/charts';
    import { merge } from 'lodash-es';
    import { computed, inject, watchEffect } from 'vue';
    import { useI18n } from 'vue-i18n';
    import { type ChartLegendItem, FluxStatisticsChartLegendInjectionKey } from '~flux/statistics/composable';
    import type { EChartsOption } from '~flux/statistics/composable';
    import { BAR_SERIES_DEFAULTS, CHART_DEFAULT_COLORS } from '~flux/statistics/util';
    import Chart from './FluxStatisticsChart.vue';

    const {
        options = {},
        series
    } = defineProps<{
        readonly options?: EChartsOption;
        readonly series: readonly BarSeriesOption[];
    }>();

    const {t} = useI18n({useScope: 'parent'});

    const legendContext = inject(FluxStatisticsChartLegendInjectionKey, null);

    const translatedSeries = computed<BarSeriesOption[]>(() =>
        series.map(item => ({
            ...BAR_SERIES_DEFAULTS,
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
        const base: EChartsOption = {
            grid: { left: 9, right: 9, top: 18, bottom: 24 },
            tooltip: { trigger: 'axis' },
            xAxis: {
                show: true,
                axisLabel: { show: true, color: 'var(--foreground-secondary)' }
            },
            yAxis: { show: false }
        };

        return merge({}, base, options, { series: translatedSeries.value });
    });
</script>
