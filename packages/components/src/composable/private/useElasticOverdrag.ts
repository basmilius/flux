import { prefersReducedMotion } from '@basmilius/utils';
import type { FluxDirection } from '@flux-ui/types';
import { computed, ref } from 'vue';

export type ElasticResistanceOptions = {
    readonly deadZone?: number;
    readonly max?: number;
    readonly range?: number;
};

/**
 * The resistance curve every elastic surface in the library shares: past
 * `deadZone` the result keeps growing with `distance`, ever slower, closing in
 * on `max` without ever reaching it. That reads as "the edge is here" while the
 * surface still answers the pointer. The sign of `distance` is preserved, so a
 * single call covers both bounds of an axis.
 */
export function elasticResistance(distance: number, options: ElasticResistanceOptions = {}): number {
    const {deadZone = 0, max = 8, range = 120} = options;

    const over = Math.max(0, Math.abs(distance) - deadZone);

    return Math.sign(distance) * max * (1 - Math.exp(-over / range));
}

type UseElasticOverdragOptions = {
    /** The scrub axis; the stretch follows it (default horizontal). */
    direction?(): FluxDirection;
    /** Pointer distance past the edge before resistance engages, px. */
    readonly deadZone?: number;
    /** Maximum stretch at full overdrag, px. */
    readonly maxStretch?: number;
    /** Damping range of the resistance curve (larger = softer), px. */
    readonly range?: number;
};

/**
 * Elastic overdrag: dragging past a scrubbed surface's bounds stretches it with
 * exponentially damped resistance, then springs home on release or re-entry —
 * "boundary reached, input heard, no more range". The stretch is transform-only
 * (`scaleX`/`scaleY`, anchored to the opposite edge), so it composes cleanly
 * with the rest of a control's layout.
 *
 * The consumer owns the pointer session; feed the pointer's main-axis coordinate
 * (`clientX` when horizontal, `clientY` when vertical) to `update` together with
 * the (unscaled) bounds it may travel between, and call `reset` on release.
 */
export function useElasticOverdrag(options: UseElasticOverdragOptions = {}) {
    const {
        direction,
        deadZone = 4,
        maxStretch = 8,
        range = 120
    } = options;

    const scale = ref(1);
    const transformOrigin = ref('0% 50%');

    const isVertical = () => direction?.() === 'vertical';
    const transform = computed(() => isVertical() ? `scaleY(${scale.value})` : `scaleX(${scale.value})`);

    let outside = false;
    let frame: number | null = null;

    function stop(): void {
        if (frame !== null) {
            cancelAnimationFrame(frame);
            frame = null;
        }
    }

    function springHome(): void {
        stop();

        const from = scale.value;

        if (from === 1) {
            return;
        }

        if (prefersReducedMotion()) {
            scale.value = 1;

            return;
        }

        const start = performance.now();

        function step(now: number): void {
            const progress = Math.min(1, (now - start) / 320);
            const eased = 1 - Math.pow(1 - progress, 3);

            scale.value = from + (1 - from) * eased;

            if (progress < 1) {
                frame = requestAnimationFrame(step);
            } else {
                scale.value = 1;
                frame = null;
            }
        }

        frame = requestAnimationFrame(step);
    }

    function update(coord: number, start: number, end: number): void {
        const vertical = isVertical();

        let past = 0;

        if (coord < start) {
            past = coord - start;
        } else if (coord > end) {
            past = coord - end;
        }

        if (past === 0) {
            if (outside) {
                outside = false;
                springHome();
            }

            return;
        }

        // Refresh the origin on every overdrag frame, not only on entry, so a
        // jump from one edge straight to the other re-anchors to the right side.
        outside = true;

        if (past > 0) {
            transformOrigin.value = vertical ? '50% 0%' : '0% 50%';
        } else {
            transformOrigin.value = vertical ? '50% 100%' : '100% 50%';
        }

        stop();

        scale.value = 1 + elasticResistance(Math.abs(past), {deadZone, max: maxStretch, range}) / (end - start);
    }

    function reset(): void {
        outside = false;
        springHome();
    }

    function dispose(): void {
        stop();
    }

    return {scale, transform, transformOrigin, update, reset, dispose};
}
