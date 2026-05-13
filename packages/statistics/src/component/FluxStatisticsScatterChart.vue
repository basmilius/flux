<template>
    <Chart
        :options="mergedOptions"/>
</template>

<script
    lang="ts"
    setup>
    import type { FluxStatisticsChartScatterSeries } from '@flux-ui/types';
    import { merge } from 'lodash-es';
    import { computed, inject, watchEffect } from 'vue';
    import { useI18n } from 'vue-i18n';
    import { type ChartLegendItem, FluxStatisticsChartLegendInjectionKey } from '~flux/statistics/composable';
    import type { EChartsOption } from '~flux/statistics/composable';
    import { buildCartesianBaseOptions, CHART_DEFAULT_COLORS, resolveChartColor, toScatterSeries } from '~flux/statistics/util';
    import Chart from './FluxStatisticsChart.vue';

    const {
        advancedOptions = {},
        series
    } = defineProps<{
        readonly advancedOptions?: EChartsOption;
        readonly series: readonly FluxStatisticsChartScatterSeries[];
    }>();

    const {t} = useI18n({useScope: 'parent'});

    const legendContext = inject(FluxStatisticsChartLegendInjectionKey, null);

    const palette = computed<readonly string[]>(() =>
        series.map((s, i) => resolveChartColor(s.color) ?? CHART_DEFAULT_COLORS[i % CHART_DEFAULT_COLORS.length])
    );

    const echartsSeries = computed(() => series.map((s, i) =>
        toScatterSeries({ ...s, name: s.name ? t(String(s.name)) : undefined }, palette.value[i])
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

    const base = buildCartesianBaseOptions({
        xAxisType: 'value',
        yAxisType: 'value',
        scale: true,
        dashedSplitLines: true
    });

    const mergedOptions = computed<EChartsOption>(() =>
        merge({}, base, advancedOptions, { series: echartsSeries.value, color: palette.value })
    );
</script>
