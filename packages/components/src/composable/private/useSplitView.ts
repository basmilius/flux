import { useRemembered } from '@flux-ui/internals';
import type { FluxDirection } from '@flux-ui/types';
import { computed, type ComputedRef, nextTick, onMounted, ref, type Ref, watch } from 'vue';

export type SplitViewPane = {
    readonly id: number;
    readonly defaultSize: number | string | undefined;
    readonly minSize: number;
    readonly maxSize: number | undefined;
    readonly isResizable: boolean;
};

export type UseSplitViewOptions = {
    readonly containerRef: Readonly<Ref<HTMLElement | null>>;
    readonly direction: Readonly<Ref<FluxDirection>>;
    readonly panes: Readonly<Ref<readonly SplitViewPane[]>>;
    readonly rememberKey: string | undefined;
};

export type UseSplitViewReturn = {
    readonly sizes: Readonly<Ref<readonly number[]>>;
    readonly templateStyle: ComputedRef<Record<string, string>>;
    readonly isDragging: Readonly<Ref<boolean>>;

    onHandleKeyDown(evt: KeyboardEvent, handleIndex: number): void;
    onHandlePointerDown(evt: PointerEvent, handleIndex: number): void;
};

const HANDLE_SIZE = 6;
const KEY_STEP = 16;
const KEY_STEP_LARGE = 64;

export function useSplitView(options: UseSplitViewOptions): UseSplitViewReturn {
    const sizes = ref<number[]>([]);
    const isDragging = ref(false);
    const persisted = options.rememberKey
        ? useRemembered<number[] | null>(`split-view/${options.rememberKey}`, null)
        : null;

    const containerSize = (): number => {
        const el = options.containerRef.value;

        if (!el) {
            return 0;
        }

        return options.direction.value === 'horizontal' ? el.clientWidth : el.clientHeight;
    };

    const computeInitialSizes = (): number[] => {
        const persistedValue = persisted?.value;

        if (persistedValue && persistedValue.length === options.panes.value.length) {
            return [...persistedValue];
        }

        const total = containerSize();
        const handleSpace = Math.max(0, options.panes.value.length - 1) * HANDLE_SIZE;
        const available = Math.max(0, total - handleSpace);
        const result: number[] = [];

        let claimed = 0;
        let flexCount = 0;

        for (const pane of options.panes.value) {
            if (typeof pane.defaultSize === 'number') {
                result.push(pane.defaultSize);
                claimed += pane.defaultSize;
            } else if (typeof pane.defaultSize === 'string' && pane.defaultSize.endsWith('%')) {
                const percentage = parseFloat(pane.defaultSize) / 100;
                const size = available * percentage;
                result.push(size);
                claimed += size;
            } else {
                result.push(-1);
                flexCount++;
            }
        }

        const flexShare = flexCount > 0 ? Math.max(0, (available - claimed) / flexCount) : 0;

        return result.map(size => size === -1 ? flexShare : size);
    };

    const clampSizes = (next: number[]): number[] => {
        return next.map((size, i) => {
            const pane = options.panes.value[i];
            const min = pane.minSize;
            const max = pane.maxSize ?? Infinity;
            return Math.min(Math.max(size, min), max);
        });
    };

    onMounted(async () => {
        await nextTick();
        sizes.value = computeInitialSizes();
    });

    watch(() => options.panes.value.length, () => {
        sizes.value = computeInitialSizes();
    });

    watch(sizes, value => {
        if (persisted && !isDragging.value) {
            persisted.value = [...value];
        }
    }, {deep: true});

    const templateStyle = computed(() => {
        const direction = options.direction.value;
        const property = direction === 'horizontal' ? 'gridTemplateColumns' : 'gridTemplateRows';
        const tracks: string[] = [];

        for (let i = 0; i < sizes.value.length; i++) {
            tracks.push(`${sizes.value[i]}px`);

            if (i < sizes.value.length - 1) {
                tracks.push(`${HANDLE_SIZE}px`);
            }
        }

        return {[property]: tracks.join(' ')};
    });

    function applyDelta(handleIndex: number, delta: number): void {
        const next = [...sizes.value];
        const leftIndex = handleIndex;
        const rightIndex = handleIndex + 1;
        const leftPane = options.panes.value[leftIndex];
        const rightPane = options.panes.value[rightIndex];

        const leftMin = leftPane.minSize;
        const leftMax = leftPane.maxSize ?? Infinity;
        const rightMin = rightPane.minSize;
        const rightMax = rightPane.maxSize ?? Infinity;

        let newLeft = next[leftIndex] + delta;
        let newRight = next[rightIndex] - delta;

        if (newLeft < leftMin) {
            const overshoot = leftMin - newLeft;
            newLeft = leftMin;
            newRight -= overshoot;
        } else if (newLeft > leftMax) {
            const overshoot = newLeft - leftMax;
            newLeft = leftMax;
            newRight += overshoot;
        }

        if (newRight < rightMin) {
            const overshoot = rightMin - newRight;
            newRight = rightMin;
            newLeft -= overshoot;
        } else if (newRight > rightMax) {
            const overshoot = newRight - rightMax;
            newRight = rightMax;
            newLeft += overshoot;
        }

        next[leftIndex] = newLeft;
        next[rightIndex] = newRight;

        sizes.value = clampSizes(next);
    }

    function onHandlePointerDown(evt: PointerEvent, handleIndex: number): void {
        if (evt.button !== 0) {
            return;
        }

        evt.preventDefault();
        const target = evt.currentTarget as HTMLElement;
        target.setPointerCapture(evt.pointerId);

        isDragging.value = true;

        const isHorizontal = options.direction.value === 'horizontal';
        const startCoord = isHorizontal ? evt.clientX : evt.clientY;
        const startSizes = [...sizes.value];

        const onMove = (moveEvt: PointerEvent): void => {
            const currentCoord = isHorizontal ? moveEvt.clientX : moveEvt.clientY;
            const delta = currentCoord - startCoord;

            sizes.value = clampSizes(startSizes.map((size, i) => {
                if (i === handleIndex) {
                    return size + delta;
                }

                if (i === handleIndex + 1) {
                    return size - delta;
                }

                return size;
            }));
        };

        const onUp = (upEvt: PointerEvent): void => {
            target.releasePointerCapture(upEvt.pointerId);
            target.removeEventListener('pointermove', onMove);
            target.removeEventListener('pointerup', onUp);
            target.removeEventListener('pointercancel', onUp);

            isDragging.value = false;

            if (persisted) {
                persisted.value = [...sizes.value];
            }
        };

        target.addEventListener('pointermove', onMove);
        target.addEventListener('pointerup', onUp);
        target.addEventListener('pointercancel', onUp);
    }

    function onHandleKeyDown(evt: KeyboardEvent, handleIndex: number): void {
        const isHorizontal = options.direction.value === 'horizontal';
        const decreaseKey = isHorizontal ? 'ArrowLeft' : 'ArrowUp';
        const increaseKey = isHorizontal ? 'ArrowRight' : 'ArrowDown';
        const step = evt.shiftKey ? KEY_STEP_LARGE : KEY_STEP;

        if (evt.key === decreaseKey) {
            evt.preventDefault();
            applyDelta(handleIndex, -step);
        } else if (evt.key === increaseKey) {
            evt.preventDefault();
            applyDelta(handleIndex, step);
        } else if (evt.key === 'Home') {
            evt.preventDefault();
            const leftPane = options.panes.value[handleIndex];
            const delta = leftPane.minSize - sizes.value[handleIndex];
            applyDelta(handleIndex, delta);
        } else if (evt.key === 'End') {
            evt.preventDefault();
            const leftPane = options.panes.value[handleIndex];
            const max = leftPane.maxSize ?? sizes.value[handleIndex] + sizes.value[handleIndex + 1] - options.panes.value[handleIndex + 1].minSize;
            const delta = max - sizes.value[handleIndex];
            applyDelta(handleIndex, delta);
        }
    }

    return {
        sizes,
        templateStyle,
        isDragging,
        onHandleKeyDown,
        onHandlePointerDown
    };
}
