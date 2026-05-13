<template>
    <Chart :options="mergedOptions"/>
</template>

<script
    lang="ts"
    setup>
    import type { PieSeriesOption } from 'echarts/charts';
    import { merge } from 'lodash-es';
    import { computed, inject, watchEffect } from 'vue';
    import { useI18n } from 'vue-i18n';
    import { type ChartLegendItem, FluxStatisticsChartLegendInjectionKey } from '~flux/statistics/composable';
    import type { EChartsOption } from '~flux/statistics/composable';
    import { buildSharedPieTooltipOptions, CHART_DEFAULT_COLORS, PIE_SERIES_DEFAULTS, POLAR_BASE_OPTIONS } from '~flux/statistics/util';
    import Chart from './FluxStatisticsChart.vue';
    import $style from '~flux/statistics/css/Chart.module.scss';

    const {
        options = {},
        series
    } = defineProps<{
        readonly options?: EChartsOption;
        readonly series: readonly PieSeriesOption[];
    }>();

    const {t} = useI18n({useScope: 'parent'});

    const legendContext = inject(FluxStatisticsChartLegendInjectionKey, null);

    const decoratedSeries = computed<PieSeriesOption[]>(() =>
        series.map(item => ({ ...PIE_SERIES_DEFAULTS, ...item }))
    );

    const palette = computed<readonly string[]>(() => {
        const seriesColor = (series[0] as { color?: unknown })?.color;
        if (Array.isArray(seriesColor)) {
            return seriesColor as readonly string[];
        }

        const userColors = (options as { color?: unknown }).color;
        if (Array.isArray(userColors)) {
            return userColors as readonly string[];
        }

        return CHART_DEFAULT_COLORS;
    });

    const tooltipOptions = computed<EChartsOption>(() =>
        buildSharedPieTooltipOptions(t, $style as never, () => series, () => palette.value)
    );

    const legendItems = computed<readonly ChartLegendItem[]>(() => {
        const data = series[0]?.data as readonly { value?: number | string; name?: string; itemStyle?: { color?: string } }[] | undefined;
        if (!data) {
            return [];
        }

        return data.map((item, index) => ({
            color: item.itemStyle?.color ?? palette.value[index % palette.value.length],
            label: item.name ? t(String(item.name)) : '',
            value: item.value
        }));
    });

    watchEffect(() => {
        if (legendContext) {
            legendContext.items.value = legendItems.value;
        }
    });

    const mergedOptions = computed<EChartsOption>(() =>
        merge({}, POLAR_BASE_OPTIONS, tooltipOptions.value, options, { series: decoratedSeries.value })
    );
</script>
