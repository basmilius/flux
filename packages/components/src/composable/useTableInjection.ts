import { inject, ref } from 'vue';
import { FluxTableInjectionKey } from '~flux/components/data';

export default function () {
    return inject(FluxTableInjectionKey, () => ({
        isBordered: ref(false),
        isHoverable: ref(false),
        isSeparated: ref(false),
        isStriped: ref(false)
    }), true);
}
