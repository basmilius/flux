import { onScopeDispose, readonly, ref, type Ref } from 'vue';
import { isSSR, type TemplateRef, unrefTemplateElement } from '../util';
import useEventListener from './useEventListener';
import type { DragContext } from './usePointerDrag';

export type WheelDragAxis = 'x' | 'y';

export type WheelDragContext = DragContext & {
    readonly event: WheelEvent;
};

export type UseWheelDragOptions = {
    readonly axis?: WheelDragAxis;
    readonly idle?: number;
    onEnd?(context: WheelDragContext): void;
    onMove?(context: WheelDragContext): void;
    onStart?(event: WheelEvent): boolean | void;
};

export type UseWheelDragReturn = {
    readonly isWheeling: Readonly<Ref<boolean>>;
    cancel(): void;
};

type Sample = {
    readonly time: number;
    readonly x: number;
    readonly y: number;
};

// A wheel event in line or page mode carries steps, not pixels.
const LINE_HEIGHT = 16;

const IDLE = 80;
const VELOCITY_WINDOW = 100;

/**
 * Tracks a two finger swipe over an element as one continuous gesture, in the
 * same deltas a pointer drag reports. A trackpad has no way to say that the
 * fingers left it, so the gesture ends once the events stop coming in, which is
 * after the momentum of the flick has run out.
 */
export default function <TElement extends HTMLElement>(elementRef: TemplateRef<TElement>, options: UseWheelDragOptions = {}): UseWheelDragReturn {
    const isWheeling = ref(false);

    if (isSSR) {
        return {
            isWheeling: readonly(isWheeling),
            cancel: () => void 0
        };
    }

    const {axis = 'x', idle = IDLE, onEnd, onMove, onStart} = options;

    const samples: Sample[] = [];

    let dx = 0;
    let dy = 0;
    let idleTimer = 0;
    let lastEvent: WheelEvent | null = null;

    useEventListener(elementRef, 'wheel', onWheel, {passive: false});

    onScopeDispose(cancel);

    function cancel(): void {
        window.clearTimeout(idleTimer);

        idleTimer = 0;
        isWheeling.value = false;
        lastEvent = null;
        samples.length = 0;
        dx = 0;
        dy = 0;
    }

    function sample(time: number): void {
        samples.push({time, x: dx, y: dy});

        while (samples.length > 2 && time - samples[0].time > VELOCITY_WINDOW) {
            samples.shift();
        }
    }

    function resolveContext(evt: WheelEvent): WheelDragContext {
        const oldest = samples[0];
        const elapsed = oldest ? evt.timeStamp - oldest.time : 0;

        return {
            dx,
            dy,
            event: evt,
            vx: elapsed > 0 ? (dx - oldest.x) / elapsed : 0,
            vy: elapsed > 0 ? (dy - oldest.y) / elapsed : 0
        };
    }

    function wheelScale(deltaMode: number): number {
        switch (deltaMode) {
            case WheelEvent.DOM_DELTA_LINE:
                return LINE_HEIGHT;
            case WheelEvent.DOM_DELTA_PAGE:
                return (axis === 'x' ? unrefTemplateElement(elementRef)?.clientWidth : unrefTemplateElement(elementRef)?.clientHeight) ?? 0;
            default:
                return 1;
        }
    }

    function finish(): void {
        if (!isWheeling.value || !lastEvent) {
            return;
        }

        const context = resolveContext(lastEvent);

        cancel();
        onEnd?.(context);
    }

    function onWheel(evt: WheelEvent): void {
        // Every browser but Safari sends a pinch as ctrl + wheel, which belongs to the page.
        if (evt.ctrlKey || evt.metaKey) {
            return;
        }

        const scale = wheelScale(evt.deltaMode);
        const deltaX = evt.deltaX * scale;
        const deltaY = evt.deltaY * scale;

        if (!isWheeling.value) {
            const dominant = axis === 'x' ? Math.abs(deltaX) > Math.abs(deltaY) : Math.abs(deltaY) > Math.abs(deltaX);

            if (!dominant || onStart?.(evt) === false) {
                return;
            }

            cancel();
            isWheeling.value = true;
            sample(evt.timeStamp);
        }

        evt.preventDefault();

        if (axis === 'x') {
            dx -= deltaX;
        } else {
            dy -= deltaY;
        }

        lastEvent = evt;

        sample(evt.timeStamp);
        onMove?.(resolveContext(evt));

        window.clearTimeout(idleTimer);
        idleTimer = window.setTimeout(finish, idle);
    }

    return {
        isWheeling: readonly(isWheeling),
        cancel
    };
}
