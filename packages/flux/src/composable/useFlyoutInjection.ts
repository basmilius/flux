import { inject, ref } from 'vue';
import { FluxFlyoutInjection, FluxFlyoutInjectionKey } from '@/data';

export default function (): FluxFlyoutInjection {
    return inject(FluxFlyoutInjectionKey, {
        isClosing: ref(false),
        isOpen: ref(false),
        isOpening: ref(false)
    });
}
