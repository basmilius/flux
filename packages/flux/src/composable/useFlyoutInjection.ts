import { inject, ref } from 'vue';
import { FluxFlyoutInjection, FluxFlyoutInjectionKey } from '@/data';

export function useFlyoutInjection(): FluxFlyoutInjection {
    return inject(FluxFlyoutInjectionKey, {
        isClosing: ref(false),
        isOpen: ref(false),
        isOpening: ref(false)
    });
}
