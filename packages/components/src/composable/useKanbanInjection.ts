import { inject } from 'vue';
import { type FluxKanbanInjection, FluxKanbanInjectionKey } from '~flux/components/data';

export default function (): FluxKanbanInjection {
    const injection = inject(FluxKanbanInjectionKey);

    if (!injection) {
        throw new Error('useKanbanInjection() must be called within a <FluxKanban>.');
    }

    return injection;
}
