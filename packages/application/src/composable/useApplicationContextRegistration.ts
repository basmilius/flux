import { inject, onBeforeUnmount, onMounted, watch } from 'vue';
import { type FluxApplicationContextInfo, FluxApplicationInjectionKey } from '../data';

export default function (info: () => Omit<FluxApplicationContextInfo, 'id'>): void {
    const injection = inject(FluxApplicationInjectionKey, null);

    if (!injection) {
        return;
    }

    const id = Symbol('application-context');

    onMounted(() => {
        injection.pushContext({id, ...info()});
    });

    watch(info, next => {
        injection.removeContext(id);
        injection.pushContext({id, ...next});
    });

    onBeforeUnmount(() => {
        injection.removeContext(id);
    });
}
