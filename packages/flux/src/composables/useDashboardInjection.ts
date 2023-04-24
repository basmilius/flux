import { inject } from 'vue-demi';
import { FluxDashboardInjection, FluxDashboardInjectionKey } from '../data';

export function useDashboardInjection(): FluxDashboardInjection {
    const injection = inject(FluxDashboardInjectionKey);

    if (!injection) {
        throw new Error('[Flux] useDashboard() was used outside a FluxDashboard component.');
    }

    return injection;
}
