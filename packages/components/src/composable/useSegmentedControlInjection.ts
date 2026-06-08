import type { FluxSize } from '@flux-ui/types';
import { inject, ref } from 'vue';
import { FluxSegmentedControlInjectionKey, type FluxSegmentedControlValue } from '~flux/components/data';

export default function () {
    return inject(FluxSegmentedControlInjectionKey, {
        modelValue: ref<FluxSegmentedControlValue | undefined>(undefined),
        size: ref<FluxSize>('medium'),
        select: () => undefined,
        registerItem: () => undefined,
        unregisterItem: () => undefined
    });
}
