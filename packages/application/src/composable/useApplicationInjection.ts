import { inject } from 'vue';
import { type FluxApplicationInjection, FluxApplicationInjectionKey } from '../data';

export default function (): FluxApplicationInjection {
    const injection = inject(FluxApplicationInjectionKey);

    if (!injection) {
        throw new Error('[Flux] useApplicationInjection() was used outside a FluxApplication component.');
    }

    return injection;
}
