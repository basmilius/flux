import { onScopeDispose, watch } from 'vue';
import type { TemplateRef } from '../util';
import { unrefTemplateElement } from '../util';

export default function <TElement extends HTMLElement>(elementRef: TemplateRef<TElement>, callback: ResizeObserverCallback, options?: ResizeObserverOptions): void {
    options ??= {};

    let observer: ResizeObserver | undefined;

    const stop = watch(() => unrefTemplateElement(elementRef), element => {
        cleanup();

        if (!element) {
            return;
        }

        observer = new ResizeObserver(callback);
        observer.observe(element, options);
    }, {immediate: true});

    function cleanup(): void {
        if (!observer) {
            return;
        }

        observer.disconnect();
        observer = undefined;
    }

    function dispose(): void {
        cleanup();
        stop();
    }

    onScopeDispose(dispose);
}
