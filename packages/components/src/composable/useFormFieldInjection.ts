import { inject, useId } from 'vue';
import { FluxFormFieldInjectionKey } from '~flux/components/data';

export default function () {
    return inject(FluxFormFieldInjectionKey, {
        id: useId()
    });
}
