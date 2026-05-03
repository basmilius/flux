import { inject, ref } from 'vue';
import { FluxTabBarInjectionKey } from '~flux/components/data';

export default function () {
    return inject(FluxTabBarInjectionKey, {
        isPills: ref(false),
        registerItem: () => undefined,
        unregisterItem: () => undefined
    });
}
