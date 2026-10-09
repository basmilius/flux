import { inject } from 'vue';
import { FluxCardListInjectionKey } from '~flux/components/data';

export default function () {
    return inject(FluxCardListInjectionKey, {
        opened: () => void 0,
        register: () => void 0,
        unregister: () => void 0
    });
}
