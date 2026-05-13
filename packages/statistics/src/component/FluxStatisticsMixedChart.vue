<template>
    <Chart
        :options="mergedOptions"/>
</template>

<script
    lang="ts"
    setup>
    import type { FluxStatisticsChartMixedSeries } from '@flux-ui/types';
    import { merge } from 'lodash-es';
    import { computed, inject, watchEffect } from 'vue';
    import { useI18n } from 'vue-i18n';
    import { type ChartLegendItem, FluxStatisticsChartLegendInjectionKey } from '~flux/statistics/composable';
    import type { EChartsOption } from '~flux/statistics/composable';
    import { buildCartesianBaseOptions, buildCartesianTooltipOptions, cartesianFallbackLabels, CHART_DEFAULT_COLORS, extractLabels, resolveChartColor, toMixedSeries } from '~flux/statistics/util';
    import Chart from './FluxStatisticsChart.vue';
    import $style from '~flux/statistics/css/Chart.module.scss';

    const {
        advancedOptions = {},
        labels,
        series
    } = defineProps<{
        readonly advancedOptions?: EChartsOption;
        readonly labels?: readonly string[];
        readonly series: readonly FluxStatisticsChartMixedSeries[];
    }>();

    const {t} = useI18n({useScope: 'parent'});

    const legendContext = inject(FluxStatisticsChartLegendInjectionKey, null);

    const palette = computed<readonly string[]>(() =>
        series.map((s, i) => resolveChartColor(s.color) ?? CHART_DEFAULT_COLORS[i % CHART_DEFAULT_COLORS.length])
    );

    const xAxisLabels = computed<readonly string[]>(() => labels ?? extractLabels(series) ?? cartesianFallbackLabels(series));

    const echartsSeries = computed(() => series.map((s, i) =>
        toMixedSeries({ ...s, name: s.name ? t(String(s.name)) : undefined }, palette.value[i])
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
        const base = buildCartesianBaseOptions({ tooltipTrigger: 'axis', dashedSplitLines: true });
        const xAxisOverride: EChartsOption = { xAxis: { type: 'category', data: xAxisLabels.value as string[] } };
        const tooltipOptions = buildCartesianTooltipOptions(t, $style as never, () => series.map(s => s.icon));

        return merge({}, base, xAxisOverride, tooltipOptions, advancedOptions, { series: echartsSeries.value, color: palette.value });
    });
</script>
