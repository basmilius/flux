<template>
    <Chart
        ref="chartRef"
        :options="mergedOptions"/>
</template>

<script
    lang="ts"
    setup>
    import type { FluxStatisticsChartCandlestickSeries } from '@flux-ui/types';
    import { merge } from 'lodash-es';
    import { computed, inject, useTemplateRef, watchEffect } from 'vue';
    import { useI18n } from 'vue-i18n';
    import { FluxStatisticsChartLegendInjectionKey, useChartHoverSync, type ChartLegendItem, type EChartsInstance, type EChartsOption } from '~flux/statistics/composable';
    import { buildCartesianBaseOptions, buildCartesianTooltipOptions, resolveChartColor, toCandlestickSeries } from '~flux/statistics/util';
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
        readonly series: readonly FluxStatisticsChartCandlestickSeries[];
        readonly tooltip?: boolean;
    }>();

    const {t} = useI18n({useScope: 'parent'});

    const legendContext = inject(FluxStatisticsChartLegendInjectionKey, null);
    const chartRef = useTemplateRef<InstanceType<typeof Chart>>('chartRef');
    const chartInstance = computed<EChartsInstance | null>(() => chartRef.value?.chartInstance ?? null);

    useChartHoverSync(chartInstance, legendContext, { mode: 'series' });

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

    const echartsSeries = computed(() => series.map(s =>
        toCandlestickSeries({ ...s, name: s.name ? t(String(s.name)) : undefined })
    ));

    const legendItems = computed<readonly ChartLegendItem[]>(() => {
        if (series.length === 0) {
            return [];
        }

        return series.flatMap(s => [
            {
                color: resolveChartColor(s.positiveColor) ?? 'var(--success-500)',
                icon: s.icon,
                label: 'Up'
            },
            {
                color: resolveChartColor(s.negativeColor) ?? 'var(--danger-500)',
                label: 'Down'
            }
        ]);
    });

    watchEffect(() => {
        if (legendContext) {
            legendContext.items.value = legendItems.value;
        }
    });

    const mergedOptions = computed<EChartsOption>(() => {
        const base = buildCartesianBaseOptions({ scale: true, dashedSplitLines: true });
        const xAxisOverride: EChartsOption | undefined = xAxisLabels.value
            ? { xAxis: { type: 'category', data: xAxisLabels.value as string[] } }
            : undefined;

        const tooltipOptions: EChartsOption = tooltip
            ? buildCartesianTooltipOptions(t, $style as never, () => series.map(s => s.icon))
            : { tooltip: { show: false } };

        return merge({}, base, xAxisOverride ?? {}, tooltipOptions, advancedOptions, { series: echartsSeries.value });
    });
</script>
