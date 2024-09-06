import { inject } from 'vue';
import { FluxBreakpointsInjectionKey } from '@/data';

export default function () {
    const breakpoints = inject(FluxBreakpointsInjectionKey, null);

    if (!breakpoints) {
        throw new Error('[Flux] No breakpoints provider was found.');
    }

    return breakpoints;
}
