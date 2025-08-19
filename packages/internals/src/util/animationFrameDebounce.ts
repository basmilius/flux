import type { FluxMaybePromise } from '@flux-ui/types';

export default function <T extends () => FluxMaybePromise<void>>(fn: T): T {
    let animationFrame = 0;

    return () => {
        cancelAnimationFrame(animationFrame);
        animationFrame = requestAnimationFrame(fn);
    };
}
