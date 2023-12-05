import { onScopeDispose, watch } from 'vue';
import type { MaybeElementRef } from '@/helpers';
import { unrefElement } from '@/helpers';

export function useMutationObserver(elementRef: MaybeElementRef<HTMLElement | undefined>, callback: MutationCallback, options?: MutationObserverInit): void {
    options ??= {
        attributes: true
    };

    let observer: MutationObserver | undefined;

    const stop = watch(() => unrefElement(elementRef), element => {
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
