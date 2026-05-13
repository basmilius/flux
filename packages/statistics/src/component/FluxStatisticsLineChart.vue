<template>
    <Chart
        ref="chartRef"
        :options="mergedOptions"/>
</template>

<script
    lang="ts"
    setup>
    import type { FluxStatisticsChartLineSeries } from '@flux-ui/types';
    import { merge } from 'lodash-es';
    import { computed, inject, useTemplateRef, watchEffect } from 'vue';
    import { useI18n } from 'vue-i18n';
    import { type ChartLegendItem, FluxStatisticsChartLegendInjectionKey, useChartHoverSync } from '~flux/statistics/composable';
    import type { EChartsInstance, EChartsOption } from '~flux/statistics/composable';
    import { buildCartesianTooltipOptions, cartesianFallbackLabels, CHART_DEFAULT_COLORS, extractLabels, resolveChartColor, toLineSeries } from '~flux/statistics/util';
    import Chart from './FluxStatisticsChart.vue';
    import $style from '~flux/statistics/css/Chart.module.scss';

    const {
        advancedOptions = {},
        labels,
        series,
        tooltip = false
    } = defineProps<{
        readonly advancedOptions?: EChartsOption;
        readonly labels?: readonly string[];
        readonly series: readonly FluxStatisticsChartLineSeries[];
        readonly tooltip?: boolean;
    }>();

    const {t} = useI18n({useScope: 'parent'});

    const legendContext = inject(FluxStatisticsChartLegendInjectionKey, null);
    const chartRef = useTemplateRef<InstanceType<typeof Chart>>('chartRef');
    const chartInstance = computed<EChartsInstance | null>(() => chartRef.value?.chartInstance ?? null);

    useChartHoverSync(chartInstance, legendContext, { mode: 'series' });

    const palette = computed<readonly string[]>(() =>
        series.map((s, i) => resolveChartColor(s.color) ?? CHART_DEFAULT_COLORS[i % CHART_DEFAULT_COLORS.length])
    );

    const xAxisLabels = computed<readonly string[]>(() => labels ?? extractLabels(series) ?? cartesianFallbackLabels(series));

    const echartsSeries = computed(() => series.map((s, i) =>
        toLineSeries({ ...s, name: s.name ? t(String(s.name)) : undefined }, palette.value[i])
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
        const base: EChartsOption = {
            grid: { left: 9, right: 9, top: 9, bottom: 24, containLabel: true },
            xAxis: { type: 'category', data: xAxisLabels.value as string[], boundaryGap: false },
            yAxis: { type: 'value', show: false }
        };

        const tooltipOptions: EChartsOption = tooltip
            ? buildCartesianTooltipOptions(t, $style as never, () => series.map(s => s.icon))
            : { tooltip: { show: false } };

        return merge({}, base, tooltipOptions, advancedOptions, { series: echartsSeries.value, color: palette.value });
    });
</script>
