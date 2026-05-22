import type { FluxStatisticsChartPieSlice } from '@flux-ui/types';
import { computed, inject, useTemplateRef, watchEffect, type ComputedRef } from 'vue';
import { useI18n } from 'vue-i18n';
import { CHART_DEFAULT_COLORS, resolveChartColor, type SharedTooltipItem } from '~flux/statistics/util';
import { useChartHoverSync } from './useChartHoverSync';
import { type ChartLegendContext, type ChartLegendItem, FluxStatisticsChartLegendInjectionKey } from './useChartLegend';
import type { EChartsInstance } from './useECharts';

export interface UseChartSlicesSetupReturn {
    readonly t: ReturnType<typeof useI18n>['t'];
    readonly palette: ComputedRef<readonly string[]>;
    readonly tooltipItems: ComputedRef<readonly SharedTooltipItem[]>;
    readonly legendContext: ChartLegendContext | null;
    readonly chartInstance: ComputedRef<EChartsInstance | null>;
}

export function useChartSlicesSetup(
    slicesGetter: () => readonly FluxStatisticsChartPieSlice[]
): UseChartSlicesSetupReturn {
    const { t } = useI18n({ useScope: 'parent' });
    const legendContext = inject(FluxStatisticsChartLegendInjectionKey, null);
    const chartRef = useTemplateRef<{ chartInstance: EChartsInstance | null } | null>('chartRef');
    const chartInstance = computed<EChartsInstance | null>(() => chartRef.value?.chartInstance ?? null);

    useChartHoverSync(chartInstance, legendContext, { mode: 'data' });

    const palette = computed<readonly string[]>(() =>
        slicesGetter().map((slice, i) => resolveChartColor(slice.color) ?? CHART_DEFAULT_COLORS[i % CHART_DEFAULT_COLORS.length])
    );

    const tooltipItems = computed<readonly SharedTooltipItem[]>(() =>
        slicesGetter().map((slice, i) => ({
            name: slice.label,
            value: slice.formatted ?? slice.value,
            color: palette.value[i],
            icon: slice.icon,
            seriesIndex: 0,
            dataIndex: i
        }))
    );

    const legendItems = computed<readonly ChartLegendItem[]>(() =>
        slicesGetter().map((slice, i) => ({
            color: palette.value[i],
            icon: slice.icon,
            label: slice.label ? t(String(slice.label)) : '',
            value: slice.formatted ?? slice.value
        }))
    );

    watchEffect(() => {
        if (legendContext) {
            legendContext.items.value = legendItems.value;
        }
    });

    return { t, palette, tooltipItems, legendContext, chartInstance };
}
