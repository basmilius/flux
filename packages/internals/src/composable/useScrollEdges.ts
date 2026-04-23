import type { Ref } from 'vue';
import { ref, watch } from 'vue';
import type { TemplateRef } from '../util';
import { unrefTemplateElement } from '../util';

export default function <TElement extends HTMLElement>(elementRef: TemplateRef<TElement>): UseScrollEdgesReturn {
    const isAtStart = ref(true);
    const isAtEnd = ref(true);

    watch(elementRef, (_, __, onCleanup) => {
        const element = unrefTemplateElement(elementRef);

        if (!element) {
            return;
        }

        const update = (): void => {
            const {scrollTop, scrollHeight, clientHeight} = element;

            isAtStart.value = scrollTop <= 0;
            isAtEnd.value = Math.ceil(scrollTop + clientHeight) >= scrollHeight;
        };

        const resizeObserver = new ResizeObserver(update);
        resizeObserver.observe(element);

        for (const child of Array.from(element.children)) {
            resizeObserver.observe(child);
        }

        const mutationObserver = new MutationObserver(mutations => {
            for (const mutation of mutations) {
                for (const node of Array.from(mutation.addedNodes)) {
                    if (node instanceof Element) {
                        resizeObserver.observe(node);
                    }
                }

                for (const node of Array.from(mutation.removedNodes)) {
                    if (node instanceof Element) {
                        resizeObserver.unobserve(node);
                    }
                }
            }

            update();
        });

        mutationObserver.observe(element, {childList: true});
        element.addEventListener('scroll', update, {passive: true});

        update();

        onCleanup(() => {
            element.removeEventListener('scroll', update);
            resizeObserver.disconnect();
            mutationObserver.disconnect();
        });
    }, {immediate: true});

    return {
        isAtStart,
        isAtEnd
    };
}

export type UseScrollEdgesReturn = {
    readonly isAtStart: Ref<boolean>;
    readonly isAtEnd: Ref<boolean>;
};
