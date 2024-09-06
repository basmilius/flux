import { inject, ref } from 'vue';
import { FluxFlyoutInjectionKey } from '@/data';

export default function () {
    return inject(FluxFlyoutInjectionKey, {
        isClosing: ref(false),
        isOpen: ref(false),
        isOpening: ref(false)
    });
}
