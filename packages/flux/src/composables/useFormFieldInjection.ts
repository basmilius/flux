import { inject } from 'vue-demi';
import { useId } from './useId';
import { FluxFormFieldInjection, FluxFormFieldInjectionKey } from '../data';

export function useFormFieldInjection(): FluxFormFieldInjection {
    return inject(FluxFormFieldInjectionKey, {
        id: useId()
    });
}
