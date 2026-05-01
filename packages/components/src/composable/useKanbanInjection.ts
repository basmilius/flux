import { inject } from 'vue';
import { FluxKanbanInjectionKey, type FluxKanbanInjection } from '$flux/data';

export default function (): FluxKanbanInjection {
    const injection = inject(FluxKanbanInjectionKey);

    if (!injection) {
        throw new Error('useFluxKanbanInjection must be used inside a FluxKanban.');
    }

    return injection;
}
