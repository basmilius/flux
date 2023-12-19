import { inject } from 'vue';
import { FluxFormFieldInjection, FluxFormFieldInjectionKey } from '@/data';
import { useId } from './useId';

export function useFormFieldInjection(): FluxFormFieldInjection {
    return inject(FluxFormFieldInjectionKey, {
        id: useId()
    });
}
