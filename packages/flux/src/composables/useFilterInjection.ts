import { inject, ref } from 'vue-demi';
import { FluxFilterInjection, FluxFilterInjectionKey } from '@/data';

export function useFilterInjection(): FluxFilterInjection {
    return inject(FluxFilterInjectionKey, {
        state: ref({}),
        back: () => void 0,
        reset: () => void 0,
        getValue: () => void 0,
        hasValue: () => false,
        setValue: () => void 0
    });
}
