import type { MaybeElementRef } from '../helpers';
import { unrefElement } from '../helpers';
import { onScopeDispose, watch } from 'vue-demi';

export function useEventListener<K extends keyof HTMLElementEventMap>(elementRef: MaybeElementRef<HTMLElement | undefined>, eventName: K, listener: (evt: HTMLElementEventMap[K]) => any, options: AddEventListenerOptions = {passive: true}): void {
    let cleanup: Function | undefined;

    const stop = watch(() => unrefElement(elementRef), element => {
        cleanup?.();

        if (!element) {
            return;
        }

        element.addEventListener(eventName, listener, options);
        cleanup = () => element.removeEventListener(eventName, listener);
    });

    function dispose(): void {
        cleanup?.();
        stop();
    }

    onScopeDispose(dispose);
}
