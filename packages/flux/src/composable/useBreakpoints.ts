import { inject } from 'vue';
import { FluxBreakpointsInjection, FluxBreakpointsInjectionKey } from '@/data';

export default function (): FluxBreakpointsInjection {
    const breakpoints = inject(FluxBreakpointsInjectionKey, null);

    if (!breakpoints) {
        throw new Error('[Flux] No breakpoints provider was found.');
    }

    return breakpoints;
}
