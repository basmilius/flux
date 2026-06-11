import { ref, type Ref, unref, watch } from 'vue';
import { isSSR, type TemplateRef } from '../util';
import useEventListener from './useEventListener';

export default function <TElement extends HTMLElement>(elementRef?: TemplateRef<TElement>): UseScrollPositionReturn {
    const x = ref(0);
    const y = ref(0);

    if (isSSR) {
        return {
            x,
            y
        };
    }

    const targetRef = elementRef ?? ref(document);

    const update = (): void => {
        let element = unref(targetRef);

        if (element instanceof Document) {
            element = element.scrollingElement;
        }

        x.value = element?.scrollLeft ?? 0;
        y.value = element?.scrollTop ?? 0;
    };

    useEventListener(targetRef, 'scroll', update);

    watch(targetRef, () => update(), {immediate: true});

    return {
        x,
        y
    };
}

export type UseScrollPositionReturn = {
    readonly x: Ref<number>;
    readonly y: Ref<number>;
};
