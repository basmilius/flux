import { inject, ref } from 'vue';
import { FluxSkeletonsInjection, FluxSkeletonsInjectionKey } from '@/data';

export function useSkeletonsInjection(): FluxSkeletonsInjection {
    return inject(FluxSkeletonsInjectionKey, {
        isEnabled: ref(false)
    });
}
