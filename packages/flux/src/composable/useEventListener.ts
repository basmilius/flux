import { onScopeDispose, watch } from 'vue';
import type { MaybeElementRef } from '@/util';
import { unrefElement } from '@/util';

export default function <K extends keyof HTMLElementEventMap>(elementRef: MaybeElementRef<HTMLElement | undefined>, eventName: K, listener: (evt: HTMLElementEventMap[K]) => any, options: AddEventListenerOptions = {passive: true}): void {
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
