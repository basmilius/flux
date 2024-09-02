import type { InjectionKey, Ref } from 'vue';

export const FluxDashboardInjectionKey: InjectionKey<FluxDashboardInjection> = Symbol();

export type FluxDashboardInjection = {
    readonly isNavigationCollapsed: Ref<boolean>;
};
