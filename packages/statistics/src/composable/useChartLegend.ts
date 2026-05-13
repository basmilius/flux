import { type InjectionKey, type Ref, ref } from 'vue';

export interface ChartLegendItem {
    readonly color: string;
    readonly label: string;
    readonly value?: string | number;
}

export interface ChartLegendContext {
    readonly items: Ref<readonly ChartLegendItem[]>;
}

export const FluxStatisticsChartLegendInjectionKey: InjectionKey<ChartLegendContext> = Symbol('flux-statistics-chart-legend');

export function createChartLegendContext(): ChartLegendContext {
    return {
        items: ref<readonly ChartLegendItem[]>([])
    };
}
