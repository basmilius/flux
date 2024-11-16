import { inject, ref } from 'vue';
import { FluxDisabledInjectionKey } from '@/data';

export default function () {
    return inject(FluxDisabledInjectionKey, ref(false));
}
