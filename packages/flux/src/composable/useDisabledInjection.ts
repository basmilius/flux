import { inject, ref } from 'vue';
import { FluxDisabledInjectionKey } from '$flux/data';

export default function () {
    return inject(FluxDisabledInjectionKey, ref(false));
}
