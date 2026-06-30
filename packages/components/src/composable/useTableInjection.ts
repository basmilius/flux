import { inject, ref } from 'vue';
import { FluxTableInjectionKey } from '~flux/components/data';

export default function () {
    return inject(FluxTableInjectionKey, () => ({
        isHoverable: ref(false)
    }), true);
}
