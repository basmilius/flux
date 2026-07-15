import { countDecimals, roundStep } from '@basmilius/utils';
import { unrefTemplateElement } from '@flux-ui/internals';
import type { FluxColor } from '@flux-ui/types';
import { computed, type CSSProperties, onBeforeUnmount, onMounted, ref, type Ref, type ShallowRef, unref } from 'vue';
import { useElasticOverdrag } from './useElasticOverdrag';

/**
 * The thin bar sits this many px inside the fill's edge, and never closer than
 * the same distance to the track sides — so at a very low value it parks at the
 * side, outside the (tiny) fill.
 */
export const FADER_BAR_INSET = 8;

/** Safe margin around the in-track text where the bar dims to stay out of the way. */
const DODGE_ZONE = 6;

/** A fader with this many stops or fewer behaves as detents (snappy). */
const DISCRETE_LIMIT = 12;

/** The visible fill edge in px, clamped to the track. */
export function faderFillEdgePx(percent: number, width: number): number {
    return Math.min(Math.max(0, (percent / 100) * width), width);
}

/** Clamp a bar's center so it never gets closer than FADER_BAR_INSET to either side. */
export function faderClampPark(centerPx: number, width: number): number {
    return Math.min(Math.max(centerPx, FADER_BAR_INSET), Math.max(FADER_BAR_INSET, width - FADER_BAR_INSET));
}

/**
 * The CSS `left` for a bar riding a fill edge: `offset` is the signed px inset
 * into the fill (negative for a right edge, positive for a left edge), and the
 * clamp keeps the bar FADER_BAR_INSET from the track sides.
 */
export function faderBarLeft(percent: number, offset: number): string {
    const sign = offset < 0 ? '-' : '+';

    return `clamp(${FADER_BAR_INSET}px, calc(${percent}% ${sign} ${Math.abs(offset)}px), calc(100% - ${FADER_BAR_INSET}px))`;
}

export function faderRoundToDecimals(value: number, digits: number): number {
    const factor = 10 ** digits;

    return Math.round(value * factor) / factor;
}

function easeOutCubic(value: number): number {
    return 1 - Math.pow(1 - value, 3);
}

/**
 * An interruptible 150ms tween of a numeric ref (easeOutCubic). Feeding it
 * `immediate` snaps instantly; otherwise the fill and the value read glide
 * together toward a committed value.
 */
export function createFaderAnimator(target: Ref<number>) {
    let frame: number | null = null;
    let from = 0;
    let to = 0;
    let start = 0;

    function step(now: number): void {
        const progress = Math.min(1, (now - start) / 150);

        target.value = from + (to - from) * easeOutCubic(progress);

        if (progress < 1) {
            frame = requestAnimationFrame(step);
        } else {
            target.value = to;
            frame = null;
        }
    }

    return {
        animate(value: number, immediate: boolean): void {
            if (frame !== null) {
                cancelAnimationFrame(frame);
                frame = null;
            }

            if (immediate) {
                target.value = value;
                return;
            }

            from = target.value;
            to = value;
            start = performance.now();
            frame = requestAnimationFrame(step);
        },
        stop(): void {
            if (frame !== null) {
                cancelAnimationFrame(frame);
                frame = null;
            }
        }
    };
}

export type FaderBarState = 'isDodge' | 'isGrabbed' | 'isFocus' | null;

/** Bar states, in priority order: a bar dims under text even while grabbed. */
export function faderBarStateClass(dodge: boolean, dragging: boolean, focus: boolean): FaderBarState {
    if (dodge) {
        return 'isDodge';
    }

    if (dragging) {
        return 'isGrabbed';
    }

    if (focus) {
        return 'isFocus';
    }

    return null;
}

type FaderElementRef = Readonly<ShallowRef<HTMLElement | null>>;

type UseFaderOptions = {
    readonly rootRef: FaderElementRef;
    readonly labelRef: FaderElementRef;
    readonly valueRef: FaderElementRef;
    min(): number;
    max(): number;
    step(): number;
    color(): FluxColor;
};

/**
 * Shared behavior for both fader variants: the value grammar (span, decimals,
 * snapping, snappy detents), text-zone measurement and the bar dodge that reads
 * from it, the accent color variables, and the elastic overdrag. The variant
 * owns its model, percentages, bars, pointer and keyboard.
 */
export function useFormFader(options: UseFaderOptions) {
    const overdrag = useElasticOverdrag();

    const trackWidth = ref(0);
    const labelStart = ref(0);
    const labelEnd = ref(0);
    const valueStart = ref(0);

    const span = computed(() => options.max() - options.min());
    const isRangeValid = computed(() => unref(span) > 0);
    const decimals = computed(() => countDecimals(options.step()));
    const pageStep = computed(() => Math.max(options.step(), unref(span) / 10));

    // Few enough stops to feel like detents: hops between them glide even while
    // dragging, and the marks show automatically.
    const isSnappy = computed(() => {
        if (!unref(isRangeValid) || options.step() <= 0) {
            return false;
        }

        const ratio = unref(span) / options.step();
        const fullSteps = Math.floor(ratio + 1e-9);

        return fullSteps + (ratio - fullSteps > 1e-9 ? 2 : 1) <= DISCRETE_LIMIT;
    });

    const colorVars = computed(() => ({
        '--fader-accent': `var(--${options.color()}-500)`,
        '--fader-strong': `var(--${options.color()}-900)`
    }) as CSSProperties);

    function snap(value: number): number {
        const step = options.step();
        const min = options.min();
        // Anchor the step grid at `min` so a non-zero, non-step-aligned lower
        // bound keeps its own valid values reachable.
        const stepped = step > 0 ? min + roundStep(value - min, step) : value;

        return +Math.max(min, Math.min(options.max(), stepped)).toFixed(unref(decimals));
    }

    function isDodging(center: number): boolean {
        if (unref(trackWidth) <= 0) {
            return false;
        }

        return (center > unref(labelStart) - DODGE_ZONE && center < unref(labelEnd) + DODGE_ZONE) || center > unref(valueStart) - DODGE_ZONE;
    }

    function measureZones(): void {
        const root = unrefTemplateElement(options.rootRef);

        if (!root) {
            return;
        }

        const rootRect = root.getBoundingClientRect();

        if (rootRect.width === 0) {
            return;
        }

        const labelRect = unrefTemplateElement(options.labelRef)?.getBoundingClientRect();
        const valueRect = unrefTemplateElement(options.valueRef)?.getBoundingClientRect();

        trackWidth.value = rootRect.width;
        labelStart.value = labelRect ? labelRect.left - rootRect.left : 0;
        labelEnd.value = labelRect ? labelRect.right - rootRect.left : 0;
        valueStart.value = valueRect ? valueRect.left - rootRect.left : rootRect.width;
    }

    let observer: ResizeObserver | null = null;

    onMounted(() => {
        measureZones();

        const root = unrefTemplateElement(options.rootRef);

        if (root && typeof ResizeObserver !== 'undefined') {
            observer = new ResizeObserver(() => measureZones());
            observer.observe(root);
        }
    });

    onBeforeUnmount(() => {
        observer?.disconnect();
        observer = null;
        overdrag.dispose();
    });

    return {
        overdrag,
        trackWidth,
        span,
        isRangeValid,
        decimals,
        pageStep,
        isSnappy,
        colorVars,
        snap,
        isDodging,
        measureZones
    };
}
