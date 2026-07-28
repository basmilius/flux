import { onScopeDispose, readonly, ref, type Ref } from 'vue';
import { isSSR, prefersReducedMotion } from '../util';

export type SpringProfile = {
    /**
     * Resistance. At `2 * sqrt(stiffness * mass)` the spring stops without ever
     * passing its target; below that it overshoots once and comes back.
     */
    readonly damping?: number;
    /** Inertia of the animated value. */
    readonly mass?: number;
    /** Pull towards the target; higher is snappier. */
    readonly stiffness?: number;
};

export type UseSpringOptions = SpringProfile & {
    /** Distance and speed below which the spring is considered at rest. */
    readonly precision?: number;
};

export type UseSpringSetOptions = SpringProfile & {
    /** Speed the value carries into the spring, units per millisecond. */
    readonly velocity?: number;
};

export type UseSpringReturn = {
    readonly value: Readonly<Ref<number>>;
    set(target: number, options?: UseSpringSetOptions): void;
    snap(value: number): void;
    stop(): void;
    velocity(): number;
};

const MAX_FRAME = 1000 / 30;
const STEP = 1000 / 120;

type ResolvedProfile = Required<SpringProfile>;

function resolveProfile(profile: SpringProfile, fallback: ResolvedProfile): ResolvedProfile {
    return {
        damping: profile.damping ?? fallback.damping,
        mass: profile.mass ?? fallback.mass,
        stiffness: profile.stiffness ?? fallback.stiffness
    };
}

/**
 * Animates a single number towards a target with a spring, so a gesture's speed
 * survives the release: hand the pointer's velocity to `set` and the value keeps
 * travelling at that speed before the spring reels it in. Feeding `set` a moving
 * target every frame is what makes a dragged surface trail the pointer instead
 * of sticking to it.
 */
export default function (initial: number, options: UseSpringOptions = {}): UseSpringReturn {
    const {precision = .1} = options;

    const base = resolveProfile(options, {damping: 38, mass: 1, stiffness: 360});

    const value = ref(initial);

    let current = base;
    let currentVelocity = 0;
    let target = initial;
    let frame: number | null = null;
    let lastTime = 0;

    function stop(): void {
        if (frame !== null) {
            cancelAnimationFrame(frame);
            frame = null;
        }
    }

    function snap(next: number): void {
        stop();

        current = base;
        currentVelocity = 0;
        target = next;
        value.value = next;
    }

    function step(now: number): void {
        const {damping, mass, stiffness} = current;

        // A long frame integrated in one go would let the spring overshoot wildly,
        // so time always advances in fixed slices no matter how late we are.
        let remaining = Math.min(now - lastTime, MAX_FRAME);
        let position = value.value;

        lastTime = now;

        while (remaining > 0) {
            const delta = Math.min(remaining, STEP) / 1000;
            const force = -stiffness * (position - target) - damping * currentVelocity;

            currentVelocity += force / mass * delta;
            position += currentVelocity * delta;
            remaining -= STEP;
        }

        if (Math.abs(position - target) < precision && Math.abs(currentVelocity) < precision) {
            snap(target);

            return;
        }

        value.value = position;
        frame = requestAnimationFrame(step);
    }

    function set(next: number, setOptions: UseSpringSetOptions = {}): void {
        if (isSSR || prefersReducedMotion()) {
            snap(next);

            return;
        }

        current = resolveProfile(setOptions, base);
        target = next;

        if (setOptions.velocity !== undefined) {
            currentVelocity = setOptions.velocity * 1000;
        }

        if (frame === null) {
            lastTime = performance.now();
            frame = requestAnimationFrame(step);
        }
    }

    onScopeDispose(stop, true);

    return {
        value: readonly(value),
        set,
        snap,
        stop,
        velocity: () => currentVelocity / 1000
    };
}
