<template>
    <Chart
        ref="chartRef"
        :options="mergedOptions"/>
</template>

<script
    lang="ts"
    setup>
    import type { FluxStatisticsChartPieSlice } from '@flux-ui/types';
    import { merge } from 'lodash-es';
    import { computed, inject, useTemplateRef, watchEffect } from 'vue';
    import { useI18n } from 'vue-i18n';
    import { type ChartLegendItem, FluxStatisticsChartLegendInjectionKey, useChartHoverSync } from '~flux/statistics/composable';
    import type { EChartsInstance, EChartsOption } from '~flux/statistics/composable';
    import { buildSharedItemTooltipFormatter, CHART_DEFAULT_COLORS, POLAR_BASE_OPTIONS, resolveChartColor, type SharedTooltipItem, toPieSeries } from '~flux/statistics/util';
    import Chart from './FluxStatisticsChart.vue';
    import $style from '~flux/statistics/css/Chart.module.scss';

    const {
        advancedOptions = {},
        slices,
        tooltip = false
    } = defineProps<{
        readonly advancedOptions?: EChartsOption;
        readonly slices: readonly FluxStatisticsChartPieSlice[];
        readonly tooltip?: boolean;
    }>();

    const {t} = useI18n({useScope: 'parent'});

    const legendContext = inject(FluxStatisticsChartLegendInjectionKey, null);
    const chartRef = useTemplateRef<InstanceType<typeof Chart>>('chartRef');
    const chartInstance = computed<EChartsInstance | null>(() => chartRef.value?.chartInstance ?? null);

    useChartHoverSync(chartInstance, legendContext, { mode: 'data' });

    const palette = computed<readonly string[]>(() =>
        slices.map((slice, i) => resolveChartColor(slice.color) ?? CHART_DEFAULT_COLORS[i % CHART_DEFAULT_COLORS.length])
    );

    const tooltipItems = computed<readonly SharedTooltipItem[]>(() =>
        slices.map((slice, i) => ({
            name: slice.label,
            value: slice.value,
            color: palette.value[i],
            icon: slice.icon
        }))
    );

    const tooltipOptions = computed<EChartsOption>(() => {
        if (!tooltip) {
            return { tooltip: { show: false } };
        }

        return {
            tooltip: {
                show: true,
                trigger: 'item',
                formatter: buildSharedItemTooltipFormatter(t, $style as never, () => tooltipItems.value) as never
            }
        };
    });

    const echartsSeries = computed(() => [toPieSeries(slices, palette.value)]);

    const legendItems = computed<readonly ChartLegendItem[]>(() =>
        slices.map((slice, i) => ({
            color: palette.value[i],
            icon: slice.icon,
            label: slice.label ? t(String(slice.label)) : '',
            value: slice.value
        }))
    );

    watchEffect(() => {
        if (legendContext) {
            legendContext.items.value = legendItems.value;
        }
    });

    const mergedOptions = computed<EChartsOption>(() =>
        merge({}, POLAR_BASE_OPTIONS, tooltipOptions.value, advancedOptions, { series: echartsSeries.value, color: palette.value })
    );
</script>
