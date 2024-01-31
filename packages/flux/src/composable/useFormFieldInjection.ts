import { inject } from 'vue';
import { FluxFormFieldInjection, FluxFormFieldInjectionKey } from '@/data';
import useId from './useId';

export default function (): FluxFormFieldInjection {
    return inject(FluxFormFieldInjectionKey, {
        id: useId()
    });
}
