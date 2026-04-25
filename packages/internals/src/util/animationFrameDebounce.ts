import type { FluxMaybePromise } from '@flux-ui/types';

export default function <T extends () => FluxMaybePromise<void>>(fn: T): T {
    if (typeof requestAnimationFrame === 'undefined') {
        return (() => {}) as T;
    }

    let animationFrame = 0;

    return (() => {
        cancelAnimationFrame(animationFrame);
        animationFrame = requestAnimationFrame(fn);
    }) as T;
}
