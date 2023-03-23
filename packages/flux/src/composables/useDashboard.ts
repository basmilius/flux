import { ComputedRef, inject, Ref } from 'vue-demi';

export interface FluxDashboardApi {
    readonly isNavigationCollapsible: ComputedRef<boolean>;
    readonly isNavigationOpen: Ref<boolean>;
}

export function useDashboard(): FluxDashboardApi {
    const injection = inject<FluxDashboardApi>('flux-dashboard');

    if (!injection) {
        throw new Error('[Flux] useDashboard() was used outside a FluxDashboard component.');
    }

    return injection;
}
