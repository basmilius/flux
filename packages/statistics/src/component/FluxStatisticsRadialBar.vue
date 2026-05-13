<template>
    <Chart
        ref="chartRef"
        :options="mergedOptions"/>
</template>

<script
    lang="ts"
    setup>
    import type { FluxStatisticsChartGaugeSeries } from '@flux-ui/types';
    import { merge } from 'lodash-es';
    import { computed, inject, useTemplateRef, watchEffect } from 'vue';
    import { useI18n } from 'vue-i18n';
    import { type ChartLegendItem, FluxStatisticsChartLegendInjectionKey, useChartHoverSync } from '~flux/statistics/composable';
    import type { EChartsInstance, EChartsOption } from '~flux/statistics/composable';
    import { buildGaugeTooltipOptions, CHART_DEFAULT_COLORS, POLAR_BASE_OPTIONS, resolveChartColor, toGaugeSeries } from '~flux/statistics/util';
    import Chart from './FluxStatisticsChart.vue';
    import $style from '~flux/statistics/css/Chart.module.scss';

    const {
        advancedOptions = {},
        series,
        tooltip = false
    } = defineProps<{
        readonly advancedOptions?: EChartsOption;
        readonly series: readonly FluxStatisticsChartGaugeSeries[];
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

    const echartsSeries = computed(() => series.map((s, i) =>
        toGaugeSeries({ ...s, name: s.name ? t(String(s.name)) : s.name }, palette.value[i], i, series.length)
    ));

    const legendItems = computed<readonly ChartLegendItem[]>(() =>
        series.map((s, i) => ({
            color: palette.value[i],
            icon: s.icon,
            label: s.name ? t(String(s.name)) : '',
            value: s.value
        }))
    );

    watchEffect(() => {
        if (legendContext) {
            legendContext.items.value = legendItems.value;
        }
    });

    const mergedOptions = computed<EChartsOption>(() => {
        const tooltipOptions: EChartsOption = tooltip
            ? buildGaugeTooltipOptions(t, $style as never, () => series, () => palette.value)
            : { tooltip: { show: false } };

        return merge({}, POLAR_BASE_OPTIONS, tooltipOptions, advancedOptions, { series: echartsSeries.value, color: palette.value });
    });
</script>
