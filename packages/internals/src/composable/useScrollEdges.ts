import { ref, type Ref, watch } from 'vue';
import { type TemplateRef, unrefTemplateElement } from '../util';

export default function <TElement extends HTMLElement>(elementRef: TemplateRef<TElement>): UseScrollEdgesReturn {
    const isAtStart = ref(true);
    const isAtEnd = ref(true);
    const isAtLeft = ref(true);
    const isAtRight = ref(true);

    watch(elementRef, (_, __, onCleanup) => {
        const element = unrefTemplateElement(elementRef);

        if (!element) {
            return;
        }

        const update = (): void => {
            const {scrollTop, scrollHeight, clientHeight, scrollLeft, scrollWidth, clientWidth} = element;

            isAtStart.value = scrollTop <= 0;
            isAtEnd.value = Math.ceil(scrollTop + clientHeight) >= scrollHeight;
            isAtLeft.value = scrollLeft <= 0;
            isAtRight.value = Math.ceil(scrollLeft + clientWidth) >= scrollWidth;
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
        isAtEnd,
        isAtLeft,
        isAtRight
    };
}

export type UseScrollEdgesReturn = {
    readonly isAtStart: Ref<boolean>;
    readonly isAtEnd: Ref<boolean>;
    readonly isAtLeft: Ref<boolean>;
    readonly isAtRight: Ref<boolean>;
};
