import type { InjectionKey, Ref } from 'vue';

export type FluxStatisticsLegendVariant = 'detailed' | 'compact';

export const FluxStatisticsLegendVariantInjectionKey: InjectionKey<Ref<FluxStatisticsLegendVariant>> = Symbol('flux-statistics-legend-variant');
