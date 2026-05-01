import { inject } from 'vue';
import type { FluxKanbanInjection } from '$flux/data/di';
import { FluxKanbanInjectionKey } from '$flux/data/di';

export default function (): FluxKanbanInjection {
    const injection = inject(FluxKanbanInjectionKey);

    if (!injection) {
        throw new Error('useFluxKanbanInjection must be used inside a FluxKanban.');
    }

    return injection;
}
