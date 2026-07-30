import type { FluxIconName, FluxStatisticsChartColor } from '@flux-ui/types';
import { computed, type ComputedRef, inject, useTemplateRef, watchEffect } from 'vue';
import { useTranslate } from '~flux/statistics/composable/private';
import { CHART_DEFAULT_COLORS, resolveChartColor, type Translator } from '~flux/statistics/util';
import useChartHoverSync, { type ChartHoverSyncMode } from './useChartHoverSync';
import { type ChartLegendContext, type ChartLegendItem, FluxStatisticsChartLegendInjectionKey } from './useChartLegend';
import type { EChartsInstance } from './useECharts';

export interface ChartSeriesShape {
    readonly name?: string;
    readonly icon?: FluxIconName;
    readonly color?: FluxStatisticsChartColor;
}

export type ChartLegendItemBuilder<S> = (
    series: S,
    color: string,
    index: number,
    t: Translator
) => ChartLegendItem | readonly ChartLegendItem[];

export interface UseChartSeriesSetupOptions<S extends ChartSeriesShape> {
    readonly mode?: ChartHoverSyncMode;
    readonly getLegendItem?: ChartLegendItemBuilder<S>;
}

export interface UseChartSeriesSetupReturn {
    readonly t: Translator;
    readonly palette: ComputedRef<readonly string[]>;
    readonly legendContext: ChartLegendContext | null;
    readonly chartInstance: ComputedRef<EChartsInstance | null>;
}

const defaultLegendItem = <S extends ChartSeriesShape>(
    s: S,
    color: string,
    _index: number,
    t: Translator
): ChartLegendItem => ({
    color,
    icon: s.icon,
    label: s.name ? t(String(s.name)) : ''
});

export default function useChartSeriesSetup<S extends ChartSeriesShape>(
    seriesGetter: () => readonly S[],
    options: UseChartSeriesSetupOptions<S> = {}
): UseChartSeriesSetupReturn {
    const {mode = 'series', getLegendItem = defaultLegendItem} = options;
    const t = useTranslate();
    const legendContext = inject(FluxStatisticsChartLegendInjectionKey, null);
    const chartRef = useTemplateRef<{ chartInstance: EChartsInstance | null } | null>('chartRef');
    const chartInstance = computed<EChartsInstance | null>(() => chartRef.value?.chartInstance ?? null);

    useChartHoverSync(chartInstance, legendContext, {mode});

    const palette = computed<readonly string[]>(() =>
        seriesGetter().map((s, i) => resolveChartColor(s.color) ?? CHART_DEFAULT_COLORS[i % CHART_DEFAULT_COLORS.length])
    );

    const legendItems = computed<readonly ChartLegendItem[]>(() =>
        seriesGetter().flatMap((s, i) => {
            const item = getLegendItem(s, palette.value[i], i, t);
            return Array.isArray(item) ? item : [item as ChartLegendItem];
        })
    );

    watchEffect(() => {
        if (legendContext) {
            legendContext.items.value = legendItems.value;
        }
    });

    return {t, palette, legendContext, chartInstance};
}
