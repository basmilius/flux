import { onBeforeUnmount, onMounted, type Ref, ref, type ShallowRef, watchEffect } from 'vue';
import type { FluxFlowController } from '~flux/flow/data';
import { clamp } from '~flux/flow/util';

// WebKit-only: Safari reports a trackpad pinch as a gesture instead of the
// ctrl + wheel every other browser sends, so it is missing from the DOM lib.
type GestureEvent = Event & {
    readonly scale: number;
    readonly clientX: number;
    readonly clientY: number;
};

type FlowGesturesOptions = {
    readonly clip: Readonly<ShallowRef<HTMLElement | null>>;
    readonly controller: FluxFlowController;
    isInteractive(): boolean;
    zoomStep(): number;
};

type FlowGestures = {
    readonly isPanning: Readonly<Ref<boolean>>;
    onPointerDown(event: PointerEvent): void;
    onPointerMove(event: PointerEvent): void;
    onPointerUp(event: PointerEvent): void;
    onWheel(event: WheelEvent): void;
};

// A press that lands on an interactive control inside a card must keep its own
// click: starting a pan captures the pointer and would swallow it. Opt any other
// content out of panning with a `data-nopan` attribute.
const NO_PAN_SELECTOR = 'a, button, input, select, textarea, label, [role="button"], [role="switch"], [contenteditable], [data-nopan]';

// How long after the last wheel or gesture event the flow keeps claiming the
// gesture. macOS keeps sending events through its momentum tail, and letting the
// page take those over mid-glide is what makes a nested canvas feel like it slips.
const GESTURE_TAIL = 140;

// A wheel event in line or page mode carries steps, not pixels.
const LINE_HEIGHT = 16;

// Turns a pinch (or ctrl + wheel) delta into a zoom factor.
const ZOOM_INTENSITY = 0.0075;

/**
 * The pointer, wheel and pinch handling of an interactive flow. Panning runs
 * through `panBounded`, so a two-finger scroll hands itself back to the page
 * once the flow rests against its own edge.
 */
export default function useFlowGestures(options: FlowGesturesOptions): FlowGestures {
    const {clip, controller} = options;

    const isPanning = ref(false);
    const isGesturing = ref(false);

    let lastPointer: { x: number; y: number } | null = null;
    let gestureTimer = 0;
    let gestureScale = 1;

    // A pan and a pinch both steer the viewport by hand, which is what the canvas
    // reads to drop its animation and follow along instead.
    watchEffect(() => controller.setTracking(isPanning.value || isGesturing.value));

    onMounted(() => {
        // Bound by hand: gesture events are WebKit-only, so Vue has no template
        // listener for them, and they must not be passive to keep Safari from
        // zooming the page instead of the flow.
        clip.value?.addEventListener('gesturestart', onGestureStart, {passive: false});
        clip.value?.addEventListener('gesturechange', onGestureChange, {passive: false});
    });

    onBeforeUnmount(() => {
        window.clearTimeout(gestureTimer);
        clip.value?.removeEventListener('gesturestart', onGestureStart);
        clip.value?.removeEventListener('gesturechange', onGestureChange);
    });

    function keepGesture(): void {
        isGesturing.value = true;
        window.clearTimeout(gestureTimer);
        gestureTimer = window.setTimeout(() => (isGesturing.value = false), GESTURE_TAIL);
    }

    function wheelScale(deltaMode: number): number {
        switch (deltaMode) {
            case WheelEvent.DOM_DELTA_LINE:
                return LINE_HEIGHT;
            case WheelEvent.DOM_DELTA_PAGE:
                return clip.value?.clientHeight ?? 0;
            default:
                return 1;
        }
    }

    function onPointerDown(event: PointerEvent): void {
        if (!options.isInteractive() || event.button !== 0) {
            return;
        }

        if (event.target instanceof Element && event.target.closest(NO_PAN_SELECTOR)) {
            return;
        }

        lastPointer = {x: event.clientX, y: event.clientY};
        isPanning.value = true;
        clip.value?.setPointerCapture(event.pointerId);
    }

    function onPointerMove(event: PointerEvent): void {
        if (!lastPointer) {
            return;
        }

        controller.panBounded(event.clientX - lastPointer.x, event.clientY - lastPointer.y);
        lastPointer = {x: event.clientX, y: event.clientY};
    }

    function onPointerUp(event: PointerEvent): void {
        if (!lastPointer) {
            return;
        }

        lastPointer = null;
        isPanning.value = false;
        clip.value?.releasePointerCapture(event.pointerId);
    }

    function onWheel(event: WheelEvent): void {
        if (!options.isInteractive()) {
            return;
        }

        const scale = wheelScale(event.deltaMode);
        const deltaX = event.deltaX * scale;
        const deltaY = event.deltaY * scale;

        // A trackpad pinch arrives as a wheel with ctrl held, the same shape as
        // ctrl/cmd + wheel on a mouse, so both zoom towards the pointer.
        if (event.ctrlKey || event.metaKey) {
            event.preventDefault();
            keepGesture();

            // A mouse notch reports a far coarser delta than a trackpad does, so
            // it is capped at a single `zoomStep`: one notch then moves exactly as
            // far as the zoom buttons, while a pinch stays continuous.
            const limit = Math.log(1 + options.zoomStep()) / ZOOM_INTENSITY;
            controller.zoomAt(event.clientX, event.clientY, Math.exp(-clamp(deltaY, -limit, limit) * ZOOM_INTENSITY));

            return;
        }

        const {x, y} = controller.panBounded(-deltaX, -deltaY);

        // Two fingers pan the canvas, but only for as long as it has somewhere to
        // go. Once it rests against its own edge the event is left alone and the
        // page scrolls on, unless this gesture already started out panning.
        if (x === 0 && y === 0 && !isGesturing.value) {
            return;
        }

        event.preventDefault();
        keepGesture();
    }

    function onGestureStart(event: Event): void {
        if (!options.isInteractive()) {
            return;
        }

        event.preventDefault();
        gestureScale = 1;
        keepGesture();
    }

    function onGestureChange(event: Event): void {
        if (!options.isInteractive()) {
            return;
        }

        event.preventDefault();
        keepGesture();

        // Safari reports the scale of the whole gesture, so each step is what it
        // grew by since the previous one.
        const {scale, clientX, clientY} = event as GestureEvent;
        controller.zoomAt(clientX, clientY, scale / gestureScale);
        gestureScale = scale;
    }

    return {
        isPanning,
        onPointerDown,
        onPointerMove,
        onPointerUp,
        onWheel
    };
}
