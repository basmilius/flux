import { inject } from 'vue';
import { FluxExpandableGroupInjectionKey } from '~flux/components/data';

export default function () {
    return inject(FluxExpandableGroupInjectionKey, {
        closeAll: () => void 0,
        register: () => void 0,
        unregister: () => void 0
    });
}
