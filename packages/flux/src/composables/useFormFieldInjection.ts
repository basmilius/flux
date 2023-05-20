import { inject } from 'vue-demi';
import { FluxFormFieldInjection, FluxFormFieldInjectionKey } from '@/data';
import { useId } from './useId';

export function useFormFieldInjection(): FluxFormFieldInjection {
    return inject(FluxFormFieldInjectionKey, {
        id: useId()
    });
}
