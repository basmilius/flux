import { inject } from 'vue';
import { FluxDashboardInjection, FluxDashboardInjectionKey } from '@/data';

export default function (): FluxDashboardInjection {
    const injection = inject(FluxDashboardInjectionKey);

    if (!injection) {
        throw new Error('[Flux] useDashboardInjection() was used outside a FluxDashboard component.');
    }

    return injection;
}
