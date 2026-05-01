import { inject } from 'vue';
import { FluxAdaptiveGroupInjectionKey } from '~flux/components/data';

export default function () {
    return inject(FluxAdaptiveGroupInjectionKey, null);
}
