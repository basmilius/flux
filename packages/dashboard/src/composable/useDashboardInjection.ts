import { inject } from 'vue';
import { type FluxDashboardInjection, FluxDashboardInjectionKey } from '$fluxDashboard/data';

export default function (): FluxDashboardInjection {
    const injection = inject(FluxDashboardInjectionKey);

    if (!injection) {
        throw new Error('[Flux] useDashboardInjection() was used outside a FluxDashboard component.');
    }

    return injection;
}
