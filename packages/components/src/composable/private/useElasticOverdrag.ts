import type { FluxDirection } from '@flux-ui/types';
import { computed, ref } from 'vue';

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
 * the surface's (unscaled) rect, and call `reset` on release.
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

    function update(coord: number, rect: DOMRect): void {
        const vertical = isVertical();
        const startEdge = vertical ? rect.top : rect.left;
        const endEdge = vertical ? rect.bottom : rect.right;
        const size = vertical ? rect.height : rect.width;

        let past = 0;

        if (coord < startEdge) {
            past = coord - startEdge;
        } else if (coord > endEdge) {
            past = coord - endEdge;
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

        const over = Math.max(0, Math.abs(past) - deadZone);
        const stretchPx = maxStretch * (1 - Math.exp(-over / range));

        scale.value = 1 + stretchPx / size;
    }

    function reset(): void {
        outside = false;
        springHome();
    }

    function dispose(): void {
        stop();
    }

    return {transform, transformOrigin, update, reset, dispose};
}
