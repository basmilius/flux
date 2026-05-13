<template>
    <Chart
        :options="mergedOptions"/>
</template>

<script
    lang="ts"
    setup>
    import type { FluxStatisticsChartCandlestickSeries } from '@flux-ui/types';
    import { merge } from 'lodash-es';
    import { computed, inject, watchEffect } from 'vue';
    import { useI18n } from 'vue-i18n';
    import { type ChartLegendItem, FluxStatisticsChartLegendInjectionKey } from '~flux/statistics/composable';
    import type { EChartsOption } from '~flux/statistics/composable';
    import { buildCartesianBaseOptions, resolveChartColor, toCandlestickSeries } from '~flux/statistics/util';
    import Chart from './FluxStatisticsChart.vue';

    const {
        advancedOptions = {},
        labels,
        series
    } = defineProps<{
        readonly advancedOptions?: EChartsOption;
        readonly labels?: readonly string[];
        readonly series: readonly FluxStatisticsChartCandlestickSeries[];
    }>();

    const {t} = useI18n({useScope: 'parent'});

    const legendContext = inject(FluxStatisticsChartLegendInjectionKey, null);

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

        return merge({}, base, xAxisOverride ?? {}, advancedOptions, { series: echartsSeries.value });
    });
</script>
