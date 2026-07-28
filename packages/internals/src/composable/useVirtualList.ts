import { computed, type MaybeRefOrGetter, type Ref, ref, toValue, watch } from 'vue';
import { animationFrameDebounce, type TemplateRef, unrefTemplateElement } from '../util';
import useEventListener from './useEventListener';

export type UseVirtualListPosition = 'start' | 'end';

export type UseVirtualListOptions = {
    readonly count: MaybeRefOrGetter<number>;
    readonly itemHeight: MaybeRefOrGetter<number>;
    readonly overscan?: MaybeRefOrGetter<number>;
};

export type UseVirtualListReturn = {
    readonly end: Readonly<Ref<number>>;
    readonly offsetAfter: Readonly<Ref<number>>;
    readonly offsetBefore: Readonly<Ref<number>>;
    readonly start: Readonly<Ref<number>>;
    readonly totalHeight: Readonly<Ref<number>>;
    measure(): void;
    scrollToIndex(index: number, position?: UseVirtualListPosition): void;
};

const DEFAULT_OVERSCAN = 3;

export default function <TElement extends HTMLElement>(containerRef: TemplateRef<TElement>, options: UseVirtualListOptions): UseVirtualListReturn {
    const scrollTop = ref(0);
    const viewportHeight = ref(0);

    const count = computed(() => Math.max(0, Math.trunc(toValue(options.count))));
    const itemHeight = computed(() => Math.max(1, toValue(options.itemHeight)));
    const overscan = computed(() => Math.max(0, Math.trunc(toValue(options.overscan ?? DEFAULT_OVERSCAN))));

    // Clamped against the count as well, so a stale scroll position after the list shrank
    // cannot reserve more room than the list has.
    const start = computed(() => Math.min(count.value, Math.max(0, Math.floor(scrollTop.value / itemHeight.value) - overscan.value)));
    const end = computed(() => Math.min(count.value, Math.ceil((scrollTop.value + viewportHeight.value) / itemHeight.value) + overscan.value));

    const offsetBefore = computed(() => start.value * itemHeight.value);
    const offsetAfter = computed(() => Math.max(0, (count.value - end.value) * itemHeight.value));
    const totalHeight = computed(() => count.value * itemHeight.value);

    const measureOnFrame = animationFrameDebounce(() => measure());

    useEventListener(containerRef, 'scroll', measureOnFrame);

    watch(containerRef, (_, __, onCleanup) => {
        const container = unrefTemplateElement(containerRef);

        if (!container) {
            return;
        }

        measure();

        const observer = new ResizeObserver(() => measure());
        observer.observe(container);

        onCleanup(() => observer.disconnect());
    }, {immediate: true});

    // The browser clamps scrollTop when the content shrinks, without firing a scroll event.
    watch([count, itemHeight], () => measure(), {flush: 'post'});

    function measure(): void {
        const container = unrefTemplateElement(containerRef);

        scrollTop.value = container?.scrollTop ?? 0;
        viewportHeight.value = container?.clientHeight ?? 0;
    }

    function scrollToIndex(index: number, position: UseVirtualListPosition = 'start'): void {
        const container = unrefTemplateElement(containerRef);

        if (!container) {
            return;
        }

        const offset = Math.max(0, index) * itemHeight.value;

        container.scrollTop = position === 'end' ? offset + itemHeight.value - container.clientHeight : offset;
        measure();
    }

    return {
        end,
        offsetAfter,
        offsetBefore,
        start,
        totalHeight,
        measure,
        scrollToIndex
    };
}
