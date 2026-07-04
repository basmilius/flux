import { prefersReducedMotion } from '@flux-ui/internals';
import type { BorderBeamVariant } from '@flux-ui/types';
import { unref, watchEffect, type Ref } from 'vue';

type PulseOscillator = {
    readonly prop: string;
    readonly a: number;
    readonly b: number;
    readonly delay: number;
    readonly period: number;
    readonly unit: '' | 'px';
};

type PulseConfig = {
    readonly huePeriod: number | null;
    readonly oscillators: PulseOscillator[];
};

type PulseInstance = {
    readonly config: PulseConfig;
    readonly element: HTMLElement;
};

const FRAME_INTERVAL = 1000 / 30 - 2;
const TWO_PI = Math.PI * 2;

const instances = new Set<PulseInstance>();
let lastFrame = 0;
let rafId: number | null = null;

/**
 * Cosine ease-in-out factor in [0, 1]: 0 at phase 0/1, 1 at phase 0.5.
 *
 * @param phase The current phase within the oscillation period.
 *
 * @author Bas Milius <bas@mili.us>
 * @since 1.0.0
 */
function pingPong(phase: number): number {
    return (1 - Math.cos(TWO_PI * phase)) / 2;
}

/**
 * Single shared requestAnimationFrame loop, throttled to ~30fps, that drives the
 * breathing motion of every registered pulse instance by writing CSS custom
 * properties. The breathing is very slow (1.6–6.4s periods), so a capped JS loop
 * repaints the gradient layers far less often than per-instance CSS keyframes
 * running at the display refresh rate would.
 *
 * @param ts The current timestamp provided by requestAnimationFrame.
 *
 * @author Bas Milius <bas@mili.us>
 * @since 1.0.0
 */
function frame(ts: number): void {
    rafId = requestAnimationFrame(frame);

    if (ts - lastFrame < FRAME_INTERVAL) {
        return;
    }

    lastFrame = ts;

    const tSec = ts / 1000;

    instances.forEach(({config, element}) => {
        for (const osc of config.oscillators) {
            const phase = (tSec - osc.delay) / osc.period;
            const value = osc.a + (osc.b - osc.a) * pingPong(phase);

            element.style.setProperty(osc.prop, osc.unit === 'px' ? `${value.toFixed(2)}px` : value.toFixed(4));
        }

        if (config.huePeriod !== null) {
            const value = ((tSec / config.huePeriod) % 1) * 360;

            element.style.setProperty('--beam-hue', `${value.toFixed(2)}deg`);
        }
    });
}

/**
 * Registers an element to be driven by the shared pulse loop and returns a
 * cleanup function that unregisters it again, stopping the loop once no
 * instances remain.
 *
 * @param element The border beam wrapper element.
 * @param config The oscillator configuration for the instance.
 *
 * @author Bas Milius <bas@mili.us>
 * @since 1.0.0
 */
function registerPulseInstance(element: HTMLElement, config: PulseConfig): () => void {
    const instance: PulseInstance = {config, element};
    instances.add(instance);

    if (rafId === null) {
        lastFrame = 0;
        rafId = requestAnimationFrame(frame);
    }

    return () => {
        instances.delete(instance);

        if (instances.size === 0 && rafId !== null) {
            cancelAnimationFrame(rafId);
            rafId = null;
        }
    };
}

/**
 * Builds the theme/variant/duration-tuned oscillator table for a pulse instance.
 * Kept in sync with the gradient geometry in BorderBeam.module.scss.
 *
 * @param variant The pulse variant.
 * @param isDark Whether the instance is rendered within a dark themed tree.
 * @param duration The breathing duration in seconds.
 * @param staticColors Whether the hue drift is disabled.
 *
 * @author Bas Milius <bas@mili.us>
 * @since 1.0.0
 */
function createPulseConfig(variant: 'pulse-inner' | 'pulse-outside', isDark: boolean, duration: number, staticColors: boolean): PulseConfig {
    const durScale = duration / 2.3;
    const isInner = variant === 'pulse-inner';

    const sp = isInner ? .28 : (isDark ? .28 : .36);
    const dr = isInner ? (isDark ? 33 : 40) : (isDark ? 14 : 19);
    const op = isInner ? (isDark ? .48 : .45) : (isDark ? .46 : 0);
    const gh = isInner ? (isDark ? .34 : .22) : (isDark ? .16 : .58);
    const bs = (isInner ? (isDark ? 1.9 : 2.6) : (isDark ? 2.3 : 3.7)) * durScale;
    const ss = (isInner ? (isDark ? 2.6 : 4.6) : (isDark ? 6.4 : 4.6)) * durScale;
    const ghs = (isInner ? (isDark ? 2.4 : 5.5) : (isDark ? 2.4 : 3.8)) * durScale;
    const huePeriod = isInner ? 16 : 14;

    return {
        huePeriod: staticColors ? null : huePeriod,
        oscillators: [
            {prop: '--beam-bw1', a: 1 - sp, b: 1 + sp * 1.1, period: ss * .9, delay: 0, unit: ''},
            {prop: '--beam-bh1', a: 1 + sp * .9, b: 1 - sp * .85, period: ss * 1.26, delay: 0, unit: ''},
            {prop: '--beam-bx1', a: -dr, b: dr * .9, period: bs * 1.6, delay: 0, unit: 'px'},
            {prop: '--beam-by1', a: dr * .55, b: -dr * .7, period: bs * 1.6, delay: 0, unit: 'px'},
            {prop: '--beam-bw2', a: 1 + sp, b: 1 - sp * .85, period: ss * 1.1, delay: 0, unit: ''},
            {prop: '--beam-bh2', a: 1 - sp * .8, b: 1 + sp * 1.05, period: ss * .81, delay: 0, unit: ''},
            {prop: '--beam-bx2', a: dr * .8, b: -dr * .9, period: bs * 1.88, delay: 0, unit: 'px'},
            {prop: '--beam-by2', a: -dr, b: dr * .65, period: bs * 1.88, delay: 0, unit: 'px'},
            {prop: '--beam-bw3', a: 1 - sp * .6, b: 1 + sp * 1.15, period: ss * .98, delay: 0, unit: ''},
            {prop: '--beam-bh3', a: 1 + sp * .75, b: 1 - sp, period: ss * 1.4, delay: 0, unit: ''},
            {prop: '--beam-bx3', a: -dr * .6, b: dr, period: bs * 1.45, delay: 0, unit: 'px'},
            {prop: '--beam-by3', a: -dr * .85, b: dr * .45, period: bs * 1.45, delay: 0, unit: 'px'},
            {prop: '--beam-bgh', a: 1 - gh, b: 1 + gh, period: ghs, delay: 0, unit: ''},
            {prop: '--beam-bop-tl', a: 1 - op, b: 1, period: bs, delay: 0, unit: ''},
            {prop: '--beam-bop-tr', a: 1 - op, b: 1, period: bs * 1.32, delay: bs * .28, unit: ''},
            {prop: '--beam-bop-bl', a: 1 - op, b: 1, period: bs * .84, delay: bs * .55, unit: ''},
            {prop: '--beam-bop-br', a: 1 - op, b: 1, period: bs * 1.58, delay: bs * .83, unit: ''}
        ]
    };
}

type UseBorderBeamPulseOptions = {
    readonly duration: Ref<number>;
    readonly elementRef: Ref<HTMLElement | null>;
    readonly enabled: Ref<boolean>;
    readonly staticColors: Ref<boolean>;
    readonly variant: Ref<BorderBeamVariant>;
};

/**
 * Drives the breathing of a pulse border beam from the shared, frame-rate-capped
 * animation loop while the instance is enabled. Respects prefers-reduced-motion
 * and resolves the theme from the nearest `[dark]` ancestor.
 *
 * @param options The reactive instance options.
 *
 * @author Bas Milius <bas@mili.us>
 * @since 1.0.0
 */
export default function useBorderBeamPulse(options: UseBorderBeamPulseOptions): void {
    watchEffect(onCleanup => {
        const variant = unref(options.variant);

        if (variant !== 'pulse-inner' && variant !== 'pulse-outside') {
            return;
        }

        const element = unref(options.elementRef);

        if (!element || !unref(options.enabled)) {
            return;
        }

        if (prefersReducedMotion()) {
            return;
        }

        const isDark = element.closest('[dark]') !== null;
        const config = createPulseConfig(variant, isDark, unref(options.duration), unref(options.staticColors));

        onCleanup(registerPulseInstance(element, config));
    });
}
