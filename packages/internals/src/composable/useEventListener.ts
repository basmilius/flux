import { onScopeDispose, watch } from 'vue';
import type { TemplateRef } from '../util';
import { unrefTemplateElement } from '../util';

export default function <K extends keyof HTMLElementEventMap>(elementRef: TemplateRef<HTMLElement>, eventName: K, listener: (evt: HTMLElementEventMap[K]) => any, options: AddEventListenerOptions = {passive: true}): void {
    let cleanup: Function | undefined;

    const stop = watch(() => unrefTemplateElement(elementRef), element => {
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
