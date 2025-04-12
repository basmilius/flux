import { watch } from 'vue';
import type { TemplateRef } from '../util';

export default function <K extends keyof HTMLElementEventMap>(elementRef: TemplateRef<HTMLElement>, eventName: K, listener: (evt: HTMLElementEventMap[K]) => any, options: AddEventListenerOptions = {passive: true}): void {
    watch(elementRef, (element: HTMLElement, _, onCleanup) => {
        if (!element) {
            return;
        }

        element.addEventListener(eventName, listener, options);

        onCleanup(() => element.removeEventListener(eventName, listener));
    }, {immediate: true});
}
