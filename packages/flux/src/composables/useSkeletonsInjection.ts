import { inject, ref } from 'vue-demi';
import { FluxSkeletonsInjection, FluxSkeletonsInjectionKey } from '@/data';

export function useSkeletonsInjection(): FluxSkeletonsInjection {
    return inject(FluxSkeletonsInjectionKey, {
        isEnabled: ref(false)
    });
}
