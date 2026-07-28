import { readonly, ref, type Ref, watch } from 'vue';
import { isSSR, type TemplateRef, unrefTemplateElement } from '../util';

/** What every gesture reports, whatever device drives it. */
export type DragContext = {
    readonly dx: number;
    readonly dy: number;
    readonly vx: number;
    readonly vy: number;
};

export type PointerDragContext = DragContext & {
    readonly event: PointerEvent;
    readonly startX: number;
    readonly startY: number;
    readonly x: number;
    readonly y: number;
};

export type PointerDragAxis = 'x' | 'y' | 'both';

export type UsePointerDragOptions = {
    readonly axis?: PointerDragAxis | (() => PointerDragAxis);
    readonly rebaseOnThreshold?: boolean;
    readonly threshold?: number | ((event: PointerEvent) => number);
    onCancel?(): void;
    onEnd?(context: PointerDragContext): void;
    onMove?(context: PointerDragContext): void;
    onStart?(event: PointerEvent): boolean | void;
};

type Sample = {
    readonly time: number;
    readonly x: number;
    readonly y: number;
};

const VELOCITY_WINDOW = 100;

export type UsePointerDragReturn = {
    readonly isDragging: Readonly<Ref<boolean>>;
};

/**
 * Tracks a pointer drag on an element. The element itself stays responsible
 * for its `touch-action`, since only it knows which native gesture it replaces.
 */
export default function <TElement extends HTMLElement>(elementRef: TemplateRef<TElement>, options: UsePointerDragOptions = {}): UsePointerDragReturn {
    const isDragging = ref(false);

    if (isSSR) {
        return {
            isDragging: readonly(isDragging)
        };
    }

    const {axis = 'both', rebaseOnThreshold = false, threshold = 0, onCancel, onEnd, onMove, onStart} = options;

    const resolveAxis = (): PointerDragAxis => typeof axis === 'function' ? axis() : axis;

    watch(elementRef, (_, __, onCleanup) => {
        const element = unrefTemplateElement(elementRef);

        if (!element) {
            return;
        }

        const samples: Sample[] = [];

        let pointerId: number | null = null;
        let startX = 0;
        let startY = 0;
        let currentAxis: PointerDragAxis = 'both';
        let currentThreshold = 0;
        let hasPassedThreshold = false;

        function sample(evt: PointerEvent): void {
            samples.push({time: evt.timeStamp, x: evt.clientX, y: evt.clientY});

            while (samples.length > 2 && evt.timeStamp - samples[0].time > VELOCITY_WINDOW) {
                samples.shift();
            }
        }

        function resolveContext(evt: PointerEvent): PointerDragContext {
            const dx = currentAxis === 'y' ? 0 : evt.clientX - startX;
            const dy = currentAxis === 'x' ? 0 : evt.clientY - startY;
            const oldest = samples[0];
            const elapsed = oldest ? evt.timeStamp - oldest.time : 0;

            return {
                dx,
                dy,
                event: evt,
                startX,
                startY,
                vx: elapsed > 0 && currentAxis !== 'y' ? (evt.clientX - oldest.x) / elapsed : 0,
                vy: elapsed > 0 && currentAxis !== 'x' ? (evt.clientY - oldest.y) / elapsed : 0,
                x: evt.clientX,
                y: evt.clientY
            };
        }

        function release(): void {
            if (pointerId === null) {
                return;
            }

            // A cancelled or already lost pointer is no longer captured, and releasing it then throws.
            if (element!.hasPointerCapture(pointerId)) {
                element!.releasePointerCapture(pointerId);
            }

            pointerId = null;
            window.removeEventListener('pointermove', onPointerMove);
            window.removeEventListener('pointerup', onPointerUp);
            window.removeEventListener('pointercancel', onPointerCancel);
        }

        function stop(evt: PointerEvent, isCancelled: boolean): void {
            if (pointerId === null || evt.pointerId !== pointerId) {
                return;
            }

            const context = resolveContext(evt);
            const wasDragging = hasPassedThreshold;

            release();

            if (!wasDragging) {
                return;
            }

            isDragging.value = false;

            if (isCancelled) {
                onCancel?.();
            } else {
                onEnd?.(context);
            }
        }

        function onPointerDown(evt: PointerEvent): void {
            if (pointerId !== null || evt.button !== 0) {
                return;
            }

            if (onStart?.(evt) === false) {
                return;
            }

            pointerId = evt.pointerId;
            startX = evt.clientX;
            startY = evt.clientY;
            currentAxis = resolveAxis();
            currentThreshold = typeof threshold === 'function' ? threshold(evt) : threshold;
            hasPassedThreshold = currentThreshold <= 0;
            samples.length = 0;
            sample(evt);

            window.addEventListener('pointermove', onPointerMove);
            window.addEventListener('pointerup', onPointerUp);
            window.addEventListener('pointercancel', onPointerCancel);

            if (hasPassedThreshold) {
                capture();
                isDragging.value = true;
            }
        }

        function capture(): void {
            if (pointerId !== null) {
                element!.setPointerCapture(pointerId);
            }
        }

        function onSelectStart(evt: Event): void {
            if (pointerId !== null) {
                evt.preventDefault();
            }
        }

        function onPointerMove(evt: PointerEvent): void {
            if (pointerId === null || evt.pointerId !== pointerId) {
                return;
            }

            sample(evt);

            if (!hasPassedThreshold) {
                const dx = currentAxis === 'y' ? 0 : evt.clientX - startX;
                const dy = currentAxis === 'x' ? 0 : evt.clientY - startY;
                const travelled = currentAxis === 'x' ? Math.abs(dx) : currentAxis === 'y' ? Math.abs(dy) : Math.hypot(dx, dy);

                if (travelled < currentThreshold) {
                    return;
                }

                if (rebaseOnThreshold) {
                    startX = evt.clientX;
                    startY = evt.clientY;
                }

                hasPassedThreshold = true;
                capture();
                isDragging.value = true;
            }

            onMove?.(resolveContext(evt));
        }

        function onPointerUp(evt: PointerEvent): void {
            stop(evt, false);
        }

        function onPointerCancel(evt: PointerEvent): void {
            stop(evt, true);
        }

        element.addEventListener('pointerdown', onPointerDown);
        element.addEventListener('selectstart', onSelectStart);

        onCleanup(() => {
            element.removeEventListener('pointerdown', onPointerDown);
            element.removeEventListener('selectstart', onSelectStart);

            const wasDragging = pointerId !== null && hasPassedThreshold;

            release();
            hasPassedThreshold = false;
            isDragging.value = false;

            if (wasDragging) {
                onCancel?.();
            }
        });
    }, {immediate: true});

    return {
        isDragging: readonly(isDragging)
    };
}
