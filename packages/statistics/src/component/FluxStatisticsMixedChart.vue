<template>
    <Chart
        :options="mergedOptions"/>
</template>

<script
    lang="ts"
    setup>
    import type { BarSeriesOption, LineSeriesOption } from 'echarts/charts';
    import { merge } from 'lodash-es';
    import { computed, inject, watchEffect } from 'vue';
    import { useI18n } from 'vue-i18n';
    import { type ChartLegendItem, FluxStatisticsChartLegendInjectionKey } from '~flux/statistics/composable';
    import type { EChartsOption } from '~flux/statistics/composable';
    import { buildCartesianBaseOptions, CHART_DEFAULT_COLORS } from '~flux/statistics/util';
    import Chart from './FluxStatisticsChart.vue';

    type MixedSeriesItem = LineSeriesOption | BarSeriesOption;

    const LINE_DEFAULTS = { smooth: true, showSymbol: false, lineStyle: { width: 2 } };
    const BAR_DEFAULTS = { itemStyle: { borderRadius: 6 }, barCategoryGap: '55%' };
    const EMPHASIS_DISABLED = { emphasis: { disabled: true } };

    const {
        options = {},
        series
    } = defineProps<{
        readonly options?: EChartsOption;
        readonly series: readonly MixedSeriesItem[];
    }>();

    const {t} = useI18n({useScope: 'parent'});

    const legendContext = inject(FluxStatisticsChartLegendInjectionKey, null);

    const translatedSeries = computed<MixedSeriesItem[]>(() =>
        series.map(item => {
            const typeDefaults = (item.type ?? 'line') === 'bar' ? BAR_DEFAULTS : LINE_DEFAULTS;

            return {
                ...EMPHASIS_DISABLED,
                ...typeDefaults,
                ...item,
                name: item.name ? t(String(item.name)) : undefined
            } as MixedSeriesItem;
        })
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

    const base = buildCartesianBaseOptions({ tooltipTrigger: 'axis', dashedSplitLines: true });

    const mergedOptions = computed<EChartsOption>(() =>
        merge({}, base, options, { series: translatedSeries.value })
    );
</script>
