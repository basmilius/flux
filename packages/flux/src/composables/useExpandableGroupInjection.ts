import { inject } from 'vue';
import { FluxExpandableGroupInjection, FluxExpandableGroupInjectionKey } from '@/data';

export function useExpandableGroupInjection(): FluxExpandableGroupInjection {
    return inject(FluxExpandableGroupInjectionKey, {
        closeAll: () => void 0,
        register: () => void 0,
        unregister: () => void 0
    });
}
