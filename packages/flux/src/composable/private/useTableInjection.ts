import { inject, ref } from 'vue';
import { FluxTableInjection, FluxTableInjectionKey } from '@/data';

export function useTableInjection(): FluxTableInjection {
    return inject(FluxTableInjectionKey, {
        isBordered: ref(false),
        isHoverable: ref(false),
        isSeparated: ref(false),
        isStriped: ref(false)
    });
}
