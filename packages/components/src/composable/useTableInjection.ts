import { inject } from 'vue';
import { FluxTableInjectionKey } from '~flux/components/data';

export default function () {
    return inject(FluxTableInjectionKey, {
        isBordered: false,
        isHoverable: false,
        isSeparated: false,
        isStriped: false
    });
}
