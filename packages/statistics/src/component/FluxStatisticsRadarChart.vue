<template>
    <Chart
        :options="mergedOptions"/>
</template>

<script
    lang="ts"
    setup>
    import type { RadarSeriesOption } from 'echarts/charts';
    import { merge } from 'lodash-es';
    import { computed, inject, watchEffect } from 'vue';
    import { useI18n } from 'vue-i18n';
    import { type ChartLegendItem, FluxStatisticsChartLegendInjectionKey } from '~flux/statistics/composable';
    import type { EChartsOption } from '~flux/statistics/composable';
    import { buildSharedRadarTooltipOptions, CHART_DEFAULT_COLORS, POLAR_BASE_OPTIONS, type RadarIndicator, RADAR_SERIES_DEFAULTS } from '~flux/statistics/util';
    import Chart from './FluxStatisticsChart.vue';
    import $style from '~flux/statistics/css/Chart.module.scss';

    const {
        options = {},
        series
    } = defineProps<{
        readonly options?: EChartsOption;
        readonly series: readonly RadarSeriesOption[];
    }>();

    const {t} = useI18n({useScope: 'parent'});

    const legendContext = inject(FluxStatisticsChartLegendInjectionKey, null);

    const translatedSeries = computed<RadarSeriesOption[]>(() =>
        series.map(item => ({
            ...RADAR_SERIES_DEFAULTS,
            ...item,
            name: item.name ? t(String(item.name)) : undefined
        }))
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

    const indicators = computed<readonly RadarIndicator[]>(() => {
        const indicatorList = (options as { radar?: { indicator?: unknown } }).radar?.indicator;
        return Array.isArray(indicatorList) ? indicatorList as readonly RadarIndicator[] : [];
    });

    const tooltipOptions = computed<EChartsOption>(() =>
        buildSharedRadarTooltipOptions(
            t,
            $style as never,
            () => indicators.value,
            () => series,
            () => palette.value
        )
    );

    const legendItems = computed<readonly ChartLegendItem[]>(() => {
        const data = series[0]?.data as readonly { value?: unknown; name?: string }[] | undefined;
        if (!data) {
            return [];
        }

        return data.map((ring, index) => ({
            color: palette.value[index % palette.value.length],
            label: ring.name ? t(String(ring.name)) : ''
        }));
    });

    watchEffect(() => {
        if (legendContext) {
            legendContext.items.value = legendItems.value;
        }
    });

    const base: EChartsOption = {
        ...POLAR_BASE_OPTIONS,
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
        merge({}, base, tooltipOptions.value, options, { series: translatedSeries.value })
    );
</script>
