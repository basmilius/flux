import type { FluxIconName } from '@flux-ui/types';
import { ref, type InjectionKey, type Ref } from 'vue';

export interface ChartLegendItem {
    readonly color?: string;
    readonly icon?: FluxIconName;
    readonly label: string;
    readonly seriesIndex?: number;
    readonly value?: string | number;
}

export interface ChartLegendContext {
    readonly items: Ref<readonly ChartLegendItem[]>;
    readonly hoveredIndex: Ref<number | null>;
}

export const FluxStatisticsChartLegendInjectionKey: InjectionKey<ChartLegendContext> = Symbol('flux-statistics-chart-legend');

export function createChartLegendContext(): ChartLegendContext {
    return {
        items: ref<readonly ChartLegendItem[]>([]),
        hoveredIndex: ref<number | null>(null)
    };
}
