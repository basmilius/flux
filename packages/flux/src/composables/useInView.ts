import type { Ref } from 'vue';
import { ref, watch } from 'vue';

export function useInView(containerRef: Ref<HTMLElement | null>, options: IntersectionObserverInit & { readonly initial?: boolean; }): Ref<boolean> {
    const inView = ref(options.initial ?? false);

    watch(containerRef, (container, _, onCleanup) => {
        if (!container) {
            return;
        }

        const observer = new IntersectionObserver(entries => inView.value = entries[0]?.isIntersecting ?? false, options);
        observer.observe(container);

        onCleanup(() => observer.disconnect());
    }, {immediate: true});

    return inView;
}
