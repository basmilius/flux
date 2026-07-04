<template>
    <span
        ref="label"
        :aria-label="accessibleValue"
        :class="$style.numberFlow">{{ initialText }}</span>
</template>

<script
    lang="ts"
    setup>
    import { prefersReducedMotion } from '@flux-ui/internals';
    import { computed, onBeforeUnmount, onMounted, useTemplateRef, watch } from 'vue';
    import $style from '~flux/visuals/css/component/NumberFlow.module.scss';

    type NumberFlowEasingKeyword = 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out';

    type NumberFlowEasingFunction = (t: number) => number;

    type NumberFlowEasing = NumberFlowEasingKeyword | `cubic-bezier(${string})` | NumberFlowEasingFunction;

    const {
        value,
        animateOnMount = true,
        duration = 800,
        // The default matches the --swift-out custom property from @flux-ui/components
        // (packages/components/src/css/variables.scss). Keep these control points in
        // sync with that variable so the tween matches the rest of the design system.
        easing = 'cubic-bezier(0.55, 0, 0.1, 1)',
        format,
        locale
    } = defineProps<{
        readonly value: number;
        readonly animateOnMount?: boolean;
        readonly duration?: number;
        readonly easing?: NumberFlowEasing;
        readonly format?: Intl.NumberFormatOptions;
        readonly locale?: string;
    }>();

    // Named easing curves for the rAF tween. A CSS easing string cannot be
    // sampled per frame, so the value tween uses these functions instead.
    const EASINGS: Record<NumberFlowEasingKeyword, NumberFlowEasingFunction> = {
        'linear': progress => progress,
        'ease-in': progress => progress * progress,
        'ease-out': progress => 1 - (1 - progress) * (1 - progress),
        'ease-in-out': progress => progress < .5 ? 2 * progress * progress : 1 - ((-2 * progress + 2) ** 2) / 2
    };

    const CUBIC_BEZIER_PATTERN = /^cubic-bezier\(\s*([-\d.]+)\s*,\s*([-\d.]+)\s*,\s*([-\d.]+)\s*,\s*([-\d.]+)\s*\)$/;

    // Evaluate a cubic-bezier(x1, y1, x2, y2) timing function in JS. The control
    // points describe x(t) and y(t); for a given progress we need y at the t where
    // x(t) === progress. x is solved with Newton-Raphson and a bisection fallback,
    // mirroring the standard UnitBezier approach browsers use for CSS easings.
    function cubicBezier(x1: number, y1: number, x2: number, y2: number): NumberFlowEasingFunction {
        const ax = 3 * x1 - 3 * x2 + 1;
        const bx = 3 * x2 - 6 * x1;
        const cx = 3 * x1;

        const ay = 3 * y1 - 3 * y2 + 1;
        const by = 3 * y2 - 6 * y1;
        const cy = 3 * y1;

        const sampleX = (t: number): number => ((ax * t + bx) * t + cx) * t;
        const sampleY = (t: number): number => ((ay * t + by) * t + cy) * t;
        const slopeX = (t: number): number => (3 * ax * t + 2 * bx) * t + cx;

        const solveX = (x: number): number => {
            let t = x;

            for (let i = 0; i < 8; ++i) {
                const error = sampleX(t) - x;

                if (Math.abs(error) < 1e-6) {
                    return t;
                }

                const slope = slopeX(t);

                if (Math.abs(slope) < 1e-6) {
                    break;
                }

                t -= error / slope;
            }

            let low = 0;
            let high = 1;
            t = x;

            for (let i = 0; i < 20; ++i) {
                const estimate = sampleX(t);

                if (Math.abs(estimate - x) < 1e-6) {
                    return t;
                }

                if (estimate < x) {
                    low = t;
                } else {
                    high = t;
                }

                t = (low + high) / 2;
            }

            return t;
        };

        return progress => {
            if (progress <= 0) {
                return 0;
            }

            if (progress >= 1) {
                return 1;
            }

            return sampleY(solveX(progress));
        };
    }

    // Parse a cubic-bezier(...) string into a solver, or return null when the
    // string is malformed so the caller can fall back to the default easing.
    function parseCubicBezier(input: string): NumberFlowEasingFunction | null {
        const match = CUBIC_BEZIER_PATTERN.exec(input.trim());

        if (!match) {
            return null;
        }

        return cubicBezier(Number(match[1]), Number(match[2]), Number(match[3]), Number(match[4]));
    }

    // Fallback for an unrecognised easing value, matching the --swift-out default.
    const swiftOutEasing = cubicBezier(0.55, 0, 0.1, 1);

    // Resolve the easing prop to a plain (t) => number function the tween can
    // sample: functions pass through, keywords map to the table above and a
    // cubic-bezier(...) string is parsed into a solver, falling back to swift-out.
    const easingFunction = computed<NumberFlowEasingFunction>(() => {
        if (typeof easing === 'function') {
            return easing;
        }

        const keyword = EASINGS[easing as NumberFlowEasingKeyword];

        if (keyword) {
            return keyword;
        }

        return parseCubicBezier(easing) ?? swiftOutEasing;
    });

    // Default to whole numbers so a mid-tween value never sprouts stray decimals.
    // Currency, percentage and fractional displays opt in through `format`.
    const formatter = computed(() => new Intl.NumberFormat(locale, format ?? {maximumFractionDigits: 0}));

    // Rendered once for SSR / first paint only. The engine owns the span's text
    // after mount, so this must NOT be reactive - a reactive {{ value }} would make
    // Vue re-patch the text node every frame and wipe the tween. The accessible
    // name stays current through the reactive :aria-label binding.
    const initialText = formatter.value.format(animateOnMount ? 0 : value);

    // Screen readers always read the final, settled value rather than the
    // intermediate frames streaming past on screen.
    const accessibleValue = computed(() => formatter.value.format(value));

    const labelRef = useTemplateRef('label');

    let frame = 0;
    let current = animateOnMount ? 0 : value;

    function render(next: number): void {
        current = next;

        const element = labelRef.value;

        if (element) {
            element.textContent = formatter.value.format(next);
        }
    }

    function cancel(): void {
        if (frame) {
            cancelAnimationFrame(frame);
            frame = 0;
        }
    }

    function tween(from: number, to: number): void {
        cancel();

        // Reduced motion, no distance or no duration: snap straight to the value.
        if (from === to || duration <= 0 || prefersReducedMotion()) {
            render(to);
            return;
        }

        const ease = easingFunction.value;
        const delta = to - from;
        const startTime = performance.now();

        const step = (now: number): void => {
            const progress = Math.min(1, (now - startTime) / duration);
            render(from + delta * ease(progress));

            if (progress < 1) {
                frame = requestAnimationFrame(step);
            } else {
                frame = 0;
                render(to);
            }
        };

        frame = requestAnimationFrame(step);
    }

    onMounted(() => {
        if (animateOnMount) {
            tween(0, value);
        } else {
            render(value);
        }
    });

    // Tween from wherever the display currently sits, so a value that changes
    // mid-tween keeps rolling smoothly instead of jumping.
    watch(() => value, next => tween(current, next));

    // Re-render in place when the locale or format changes.
    watch(formatter, () => render(current));

    onBeforeUnmount(cancel);
</script>
