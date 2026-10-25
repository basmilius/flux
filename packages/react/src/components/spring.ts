// Matches @basmilius/common useSpring so Vue and React preserve the same release velocity.
export function createSpring(apply: (value: number) => void) {
    let value = 0;
    let target = 0;
    let velocity = 0;
    let damping = 38;
    let frame: number | null = null;
    let lastTime = 0;
    function stop() {if (frame !== null) cancelAnimationFrame(frame); frame = null;}
    function snap(next: number) {stop(); damping = 38; velocity = 0; target = value = next; apply(value);}
    function step(now: number) {
        let remaining = Math.min(now - lastTime, 1000 / 30);
        lastTime = now;
        while (remaining > 0) {
            const delta = Math.min(remaining, 1000 / 120) / 1000;
            velocity += (-360 * (value - target) - damping * velocity) * delta;
            value += velocity * delta;
            remaining -= 1000 / 120;
        }
        if (Math.abs(value - target) < .1 && Math.abs(velocity) < .1) {snap(target); return;}
        apply(value);
        frame = requestAnimationFrame(step);
    }
    return {
        get value() {return value;},
        set(next: number, options: {damping?: number; velocity?: number} = {}) {
            if (typeof document === 'undefined' || (typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches)) {snap(next); return;}
            damping = options.damping ?? 38;
            target = next;
            if (options.velocity !== undefined) velocity = options.velocity * 1000;
            if (frame === null) {lastTime = performance.now(); frame = requestAnimationFrame(step);}
        },
        snap,
        stop
    };
}
