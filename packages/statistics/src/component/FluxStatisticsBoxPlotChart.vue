<template>
    <Chart
        :options="mergedOptions"/>
</template>

<script
    lang="ts"
    setup>
    import type { FluxStatisticsChartBoxPlotSeries } from '@flux-ui/types';
    import { merge } from 'lodash-es';
    import { computed, inject, watchEffect } from 'vue';
    import { useI18n } from 'vue-i18n';
    import { type ChartLegendItem, FluxStatisticsChartLegendInjectionKey } from '~flux/statistics/composable';
    import type { EChartsOption } from '~flux/statistics/composable';
    import { buildCartesianBaseOptions, CHART_DEFAULT_COLORS, resolveChartColor, toBoxPlotSeries } from '~flux/statistics/util';
    import Chart from './FluxStatisticsChart.vue';

    const {
        advancedOptions = {},
        labels,
        series
    } = defineProps<{
        readonly advancedOptions?: EChartsOption;
        readonly labels?: readonly string[];
        readonly series: readonly FluxStatisticsChartBoxPlotSeries[];
    }>();

    const {t} = useI18n({useScope: 'parent'});

    const legendContext = inject(FluxStatisticsChartLegendInjectionKey, null);

    const palette = computed<readonly string[]>(() =>
        series.map((s, i) => resolveChartColor(s.color) ?? CHART_DEFAULT_COLORS[i % CHART_DEFAULT_COLORS.length])
    );

    const xAxisLabels = computed<readonly string[] | undefined>(() => {
        if (labels) {
            return labels;
        }

        for (const s of series) {
            const fromPoints = s.data.map(p => p.label ?? '').filter(Boolean);
            if (fromPoints.length > 0) {
                return s.data.map(p => p.label ?? '');
            }
        }

        return undefined;
    });

    const echartsSeries = computed(() => series.map((s, i) =>
        toBoxPlotSeries({ ...s, name: s.name ? t(String(s.name)) : undefined }, palette.value[i])
    ));

    const legendItems = computed<readonly ChartLegendItem[]>(() =>
        series.map((s, i) => ({
            color: palette.value[i],
            icon: s.icon,
            label: s.name ? t(String(s.name)) : ''
        }))
    );

    watchEffect(() => {
        if (legendContext) {
            legendContext.items.value = legendItems.value;
        }
    });

    const mergedOptions = computed<EChartsOption>(() => {
        const base = buildCartesianBaseOptions({ dashedSplitLines: true });
        const xAxisOverride: EChartsOption | undefined = xAxisLabels.value
            ? { xAxis: { type: 'category', data: xAxisLabels.value as string[] } }
            : undefined;

        return merge({}, base, xAxisOverride ?? {}, advancedOptions, { series: echartsSeries.value, color: palette.value });
    });
</script>
