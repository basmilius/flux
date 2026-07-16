import type { FluxIconName, FluxStatisticsChartColor } from '@flux-ui/types';
import { computed, type ComputedRef, inject, useTemplateRef, watchEffect } from 'vue';
import { useI18n } from 'vue-i18n';
import { CHART_DEFAULT_COLORS, resolveChartColor } from '~flux/statistics/util';
import { type ChartHoverSyncMode, useChartHoverSync } from './useChartHoverSync';
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
    t: ReturnType<typeof useI18n>['t']
) => ChartLegendItem | readonly ChartLegendItem[];

export interface UseChartSeriesSetupOptions<S extends ChartSeriesShape> {
    readonly mode?: ChartHoverSyncMode;
    readonly getLegendItem?: ChartLegendItemBuilder<S>;
}

export interface UseChartSeriesSetupReturn {
    readonly t: ReturnType<typeof useI18n>['t'];
    readonly palette: ComputedRef<readonly string[]>;
    readonly legendContext: ChartLegendContext | null;
    readonly chartInstance: ComputedRef<EChartsInstance | null>;
}

const defaultLegendItem = <S extends ChartSeriesShape>(
    s: S,
    color: string,
    _index: number,
    t: ReturnType<typeof useI18n>['t']
): ChartLegendItem => ({
    color,
    icon: s.icon,
    label: s.name ? t(String(s.name)) : ''
});

export function useChartSeriesSetup<S extends ChartSeriesShape>(
    seriesGetter: () => readonly S[],
    options: UseChartSeriesSetupOptions<S> = {}
): UseChartSeriesSetupReturn {
    const {mode = 'series', getLegendItem = defaultLegendItem} = options;
    const {t} = useI18n({useScope: 'parent'});
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
