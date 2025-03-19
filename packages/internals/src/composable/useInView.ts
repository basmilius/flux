import type { Ref } from 'vue';
import { ref, watch } from 'vue';
import type { TemplateRef } from '../util';
import { unrefTemplateElement } from '../util';

export default function <TElement extends HTMLElement>(containerRef: TemplateRef<TElement>, options: UseInViewOptions = {}): Ref<boolean> {
    const inView = ref(options.initial ?? false);

    watch(containerRef, (_, __, onCleanup) => {
        const container = unrefTemplateElement(containerRef);

        if (!container) {
            return;
        }

        const observer = new IntersectionObserver(entries => inView.value = entries[0]?.isIntersecting ?? false, options);
        observer.observe(container);

        onCleanup(() => observer.disconnect());
    }, {immediate: true});

    return inView;
}

type UseInViewOptions = IntersectionObserverInit & {
    readonly initial?: boolean;
};
