import { readonly, ref, type Ref, watch } from 'vue';
import { isSSR, type TemplateRef, unrefTemplateElement } from '../util';

export type PointerDragContext = {
    readonly dx: number;
    readonly dy: number;
    readonly event: PointerEvent;
    readonly startX: number;
    readonly startY: number;
    readonly x: number;
    readonly y: number;
};

export type UsePointerDragOptions = {
    readonly axis?: 'x' | 'y' | 'both';
    readonly threshold?: number;
    onCancel?(): void;
    onEnd?(context: PointerDragContext): void;
    onMove?(context: PointerDragContext): void;
    onStart?(event: PointerEvent): boolean | void;
};

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

    const {axis = 'both', threshold = 0, onCancel, onEnd, onMove, onStart} = options;

    watch(elementRef, (_, __, onCleanup) => {
        const element = unrefTemplateElement(elementRef);

        if (!element) {
            return;
        }

        let pointerId: number | null = null;
        let startX = 0;
        let startY = 0;
        let hasPassedThreshold = false;

        function resolveContext(evt: PointerEvent): PointerDragContext {
            const dx = axis === 'y' ? 0 : evt.clientX - startX;
            const dy = axis === 'x' ? 0 : evt.clientY - startY;

            return {
                dx,
                dy,
                event: evt,
                startX,
                startY,
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
            hasPassedThreshold = threshold <= 0;

            window.addEventListener('pointermove', onPointerMove);
            window.addEventListener('pointerup', onPointerUp);
            window.addEventListener('pointercancel', onPointerCancel);

            if (hasPassedThreshold) {
                capture();
                isDragging.value = true;
            }
        }

        // Capturing only once the drag is real keeps pointer driven controls inside the
        // element working, since their events are not retargeted before the threshold.
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

            const context = resolveContext(evt);

            if (!hasPassedThreshold) {
                const travelled = axis === 'x' ? Math.abs(context.dx) : axis === 'y' ? Math.abs(context.dy) : Math.hypot(context.dx, context.dy);

                if (travelled < threshold) {
                    return;
                }

                hasPassedThreshold = true;
                capture();
                isDragging.value = true;
            }

            onMove?.(context);
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
