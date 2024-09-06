import { getCurrentInstance, VNode } from 'vue';

export default function (fn: () => VNode): void {
    const instance = getCurrentInstance();

    if (!instance) {
        throw new Error('[Flux] useRender() must be called from a setup function.');
    }

    (instance as any).render = fn;
}
