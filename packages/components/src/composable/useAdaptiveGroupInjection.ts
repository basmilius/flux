import { inject } from 'vue';
import { FluxAdaptiveGroupInjectionKey } from '$flux/data';

export default function () {
    return inject(FluxAdaptiveGroupInjectionKey, null);
}
