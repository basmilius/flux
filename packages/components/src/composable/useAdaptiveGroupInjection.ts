import { inject } from 'vue';
import { type FluxAdaptiveGroupInjection, FluxAdaptiveGroupInjectionKey } from '~flux/components/data';

export default function (): FluxAdaptiveGroupInjection | null {
    return inject(FluxAdaptiveGroupInjectionKey, null);
}
