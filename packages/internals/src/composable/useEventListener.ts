import { watch } from 'vue';
import { type TemplateRef, unrefTemplateElement } from '../util';

export default function <K extends keyof HTMLElementEventMap>(elementRef: TemplateRef<HTMLElement>, eventName: K, listener: (evt: HTMLElementEventMap[K]) => any, options: AddEventListenerOptions = {passive: true}): void {
    watch(elementRef, (value, _, onCleanup) => {
        const element: EventTarget | null = unrefTemplateElement(elementRef) ?? (value instanceof EventTarget ? value : null);

        if (!element) {
            return;
        }

        element.addEventListener(eventName, listener as EventListener, options);

        onCleanup(() => element.removeEventListener(eventName, listener as EventListener, options));
    }, {immediate: true});
}
