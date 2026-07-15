import { ref } from 'vue';

type UseElasticOverdragOptions = {
    /** Pointer distance past the edge before resistance engages, px. */
    readonly deadZone?: number;
    /** Maximum stretch at full overdrag, px. */
    readonly maxStretch?: number;
    /** Damping range of the resistance curve (larger = softer), px. */
    readonly range?: number;
};

/**
 * Elastic overdrag: dragging past a horizontally scrubbed surface's bounds
 * stretches it with exponentially damped resistance, then springs home on
 * release or re-entry — "boundary reached, input heard, no more range". The
 * stretch is transform-only (`scaleX`, anchored to the opposite edge), so it
 * composes cleanly with the rest of a control's layout.
 *
 * The consumer owns the pointer session; feed pointer moves to `update` with
 * the surface's (unscaled) rect and call `reset` on release.
 */
export function useElasticOverdrag(options: UseElasticOverdragOptions = {}) {
    const {
        deadZone = 4,
        maxStretch = 8,
        range = 120
    } = options;

    const scaleX = ref(1);
    const transformOrigin = ref('0% 50%');

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

        const from = scaleX.value;

        if (from === 1) {
            return;
        }

        const start = performance.now();

        function step(now: number): void {
            const progress = Math.min(1, (now - start) / 320);
            const eased = 1 - Math.pow(1 - progress, 3);

            scaleX.value = from + (1 - from) * eased;

            if (progress < 1) {
                frame = requestAnimationFrame(step);
            } else {
                scaleX.value = 1;
                frame = null;
            }
        }

        frame = requestAnimationFrame(step);
    }

    function update(clientX: number, rect: DOMRect): void {
        let past = 0;

        if (clientX < rect.left) {
            past = clientX - rect.left;
        } else if (clientX > rect.right) {
            past = clientX - rect.right;
        }

        if (past === 0) {
            if (outside) {
                outside = false;
                springHome();
            }

            return;
        }

        if (!outside) {
            outside = true;
            transformOrigin.value = past > 0 ? '0% 50%' : '100% 50%';
        }

        stop();

        const over = Math.max(0, Math.abs(past) - deadZone);
        const stretchPx = maxStretch * (1 - Math.exp(-over / range));

        scaleX.value = 1 + stretchPx / rect.width;
    }

    function reset(): void {
        outside = false;
        springHome();
    }

    function dispose(): void {
        stop();
    }

    return {scaleX, transformOrigin, update, reset, dispose};
}
