import { inject, ref } from 'vue';
import { FluxDisabledInjectionKey } from '~flux/components/data';

export default function () {
    return inject(FluxDisabledInjectionKey, ref(false));
}
