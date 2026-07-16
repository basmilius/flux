import { inject } from 'vue';
import { type FluxKanbanInjection, FluxKanbanInjectionKey } from '~flux/components/data';

export default function (): FluxKanbanInjection {
    const injection = inject(FluxKanbanInjectionKey);

    if (!injection) {
        throw new Error('useFluxKanbanInjection must be used inside a FluxKanban.');
    }

    return injection;
}
