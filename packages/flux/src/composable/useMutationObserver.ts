import { onScopeDispose, watch } from 'vue';
import type { TemplateRef } from '@/util';
import { unrefTemplateElement } from '@/util';

export default function <TElement extends HTMLElement>(elementRef: TemplateRef<TElement>, callback: MutationCallback, options?: MutationObserverInit): void {
    options ??= {
        attributes: true
    };

    let observer: MutationObserver | undefined;

    const stop = watch(() => unrefTemplateElement(elementRef), element => {
        cleanup();

        if (!element) {
            return;
        }

        observer = new MutationObserver(callback);
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
