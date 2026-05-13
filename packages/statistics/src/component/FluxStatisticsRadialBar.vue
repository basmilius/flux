<template>
    <Chart :options="mergedOptions"/>
</template>

<script
    lang="ts"
    setup>
    import type { GaugeSeriesOption } from 'echarts/charts';
    import { merge } from 'lodash-es';
    import { computed, inject, watchEffect } from 'vue';
    import { useI18n } from 'vue-i18n';
    import { type ChartLegendItem, FluxStatisticsChartLegendInjectionKey } from '~flux/statistics/composable';
    import type { EChartsOption } from '~flux/statistics/composable';
    import { CHART_DEFAULT_COLORS, GAUGE_SERIES_DEFAULTS, POLAR_BASE_OPTIONS } from '~flux/statistics/util';
    import Chart from './FluxStatisticsChart.vue';

    const {
        options = {},
        series
    } = defineProps<{
        readonly options?: EChartsOption;
        readonly series: readonly GaugeSeriesOption[];
    }>();

    const {t} = useI18n({useScope: 'parent'});

    const legendContext = inject(FluxStatisticsChartLegendInjectionKey, null);

    const decoratedSeries = computed<GaugeSeriesOption[]>(() =>
        series.map(item => ({ ...GAUGE_SERIES_DEFAULTS, ...item }))
    );

    const palette = computed<readonly string[]>(() => {
        const userColors = (options as { color?: unknown }).color;
        return Array.isArray(userColors) ? userColors as readonly string[] : CHART_DEFAULT_COLORS;
    });

    const legendItems = computed<readonly ChartLegendItem[]>(() =>
        series.map((s, index) => {
            const firstData = Array.isArray(s.data) ? s.data[0] as { value?: number | string; name?: string } | undefined : undefined;
            return {
                color: palette.value[index % palette.value.length],
                label: firstData?.name ? t(String(firstData.name)) : '',
                value: firstData?.value
            };
        })
    );

    watchEffect(() => {
        if (legendContext) {
            legendContext.items.value = legendItems.value;
        }
    });

    const mergedOptions = computed<EChartsOption>(() =>
        merge({}, POLAR_BASE_OPTIONS, options, { series: decoratedSeries.value })
    );
</script>
