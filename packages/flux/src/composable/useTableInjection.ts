import { inject } from 'vue';
import { FluxTableInjectionKey } from '@/data';

export default function () {
    return inject(FluxTableInjectionKey, {
        isBordered: false,
        isHoverable: false,
        isSeparated: false,
        isStriped: false
    });
}
