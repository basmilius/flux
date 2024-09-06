import { inject, useId } from 'vue';
import { FluxFormFieldInjectionKey } from '@/data';

export default function () {
    return inject(FluxFormFieldInjectionKey, {
        id: useId()
    });
}
