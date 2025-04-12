import type { Ref } from 'vue';
import { ref, unref } from 'vue';
import type { TemplateRef } from '../util';
import useEventListener from './useEventListener';

export default function <TElement extends HTMLElement>(elementRef?: TemplateRef<TElement>): UseScrollPositionReturn {
    const x = ref(0);
    const y = ref(0);

    if (!elementRef) {
        elementRef = ref(document);
    }

    useEventListener(elementRef, 'scroll', () => {
        let element = unref(elementRef);

        if (element instanceof Document) {
            element = element.scrollingElement;
        }

        x.value = element?.scrollLeft ?? 0;
        y.value = element?.scrollTop ?? 0;
    });

    return {
        x,
        y
    };
}

export type UseScrollPositionReturn = {
    readonly x: Ref<number>;
    readonly y: Ref<number>;
};
