import { inject } from 'vue';
import { FluxTooltipInjectionKey } from '$flux/data';

export default function () {
    return inject(FluxTooltipInjectionKey, {
        calculate: () => void 0
    });
}
