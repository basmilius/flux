type Roll = {
    readonly from: number;
    readonly to: number;
    readonly animation: Animation;
};

const EASING = [0.4, 0, 0.2, 1] as const;
const DEPTH = 0.54;
const ANGLE = 64;
const PERSPECTIVE = 3;
const BLUR_UNIT = 0.03;
const GHOST_STRETCH = 0.07 / BLUR_UNIT;
const STOPS = 24;
const BLUR_LEVELS = [1, 1.25, 1.5, 1.75, 2];
const MAX_BLUR = 2;
const MIN_INTERVAL = 260;
const FAST_RATE = 0.6;
const SLOW_RATE = 0.25;

const reducedMotion = typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;

const bezier = (p1: number, p2: number, progress: number): number => 3 * p1 * progress * (1 - progress) ** 2 + 3 * p2 * progress * progress * (1 - progress) + progress ** 3;

function ease(progress: number): number {
    let low = 0;
    let high = 1;

    for (let i = 0; i < 24; i++) {
        const middle = (low + high) / 2;

        if (bezier(EASING[0], EASING[2], middle) < progress) {
            low = middle;
        } else {
            high = middle;
        }
    }

    return bezier(EASING[1], EASING[3], (low + high) / 2);
}

const height = (progress: number): number => Math.sin((ANGLE * (1 - ease(Math.min(1, Math.max(0, progress)))) * Math.PI) / 180);
const speed = (progress: number): number => Math.abs(height(progress + 0.004) - height(progress - 0.004));
const maxSpeed = Math.max(...Array.from({length: 101}, (_, i) => speed(i / 100)));
const stops = Array.from({length: STOPS + 1}, (_, i) => i / STOPS);

// How much of each keyframe goes to the motion-blurred ghost instead of the sharp glyph.
const blurWeights = stops.map((stop, i) => i === 0 || i === STOPS ? 0 : (speed(stop) / maxSpeed) ** 0.75);

const transformAt = (degrees: number): string => `perspective(${PERSPECTIVE}em) translateZ(-${DEPTH}em) rotateX(${degrees}deg) translateZ(${DEPTH}em)`;
const opacityAt = (degrees: number): number => Math.max(0, 1 - Math.abs(degrees) / ANGLE) ** 1.5;

let lastRoll = -1e9;
let rollDuration = 520;
let blurMultiplier = 1;

// Rapid successive rolls speed up and blur harder, like a drum spun faster.
function pace(): { rollDuration: number; blurMultiplier: number } {
    const now = performance.now();
    const elapsed = now - lastRoll;

    if (elapsed < 40) {
        return {rollDuration, blurMultiplier};
    }

    lastRoll = now;

    const interval = Math.min(520, Math.max(MIN_INTERVAL, elapsed));
    const rate = interval < rollDuration ? FAST_RATE : SLOW_RATE;

    rollDuration = elapsed > 1040 ? 520 : rollDuration + (interval - rollDuration) * rate;
    blurMultiplier = Math.min(MAX_BLUR, Math.max(1, 520 / rollDuration));

    return {rollDuration, blurMultiplier};
}

function levelWeights(multiplier: number): number[] {
    const position = (Math.min(MAX_BLUR, Math.max(1, multiplier)) - 1) / 0.25;
    const index = Math.min(BLUR_LEVELS.length - 2, Math.floor(position));
    const fraction = position - index;

    return BLUR_LEVELS.map((_, i) => i === index ? 1 - fraction : i === index + 1 ? fraction : 0);
}

const layersByParent = new WeakMap<HTMLElement, HTMLSpanElement[]>();
const ghostsByElement = new WeakMap<HTMLElement, HTMLElement[]>();
const rolls = new WeakMap<HTMLElement, Roll>();

function weighLayers(layers: HTMLSpanElement[], multiplier: number): void {
    const weights = levelWeights(multiplier);

    layers.forEach((layer, i) => {
        if (Math.abs(Number(layer.style.opacity || 0) - weights[i]) > 0.02) {
            layer.style.opacity = weights[i].toFixed(3);
        }
    });
}

function ensureLayers(parent: HTMLElement): HTMLSpanElement[] {
    const existing = layersByParent.get(parent);

    if (existing?.[0].parentElement === parent) {
        return existing;
    }

    const layers = BLUR_LEVELS.map((level, i) => {
        const layer = document.createElement('span');
        layer.setAttribute('aria-hidden', 'true');
        layer.style.cssText = `position:absolute;left:0;top:0;width:100%;height:100%;pointer-events:none;transform:scaleY(${GHOST_STRETCH});filter:blur(${BLUR_UNIT * level}em);opacity:${i === 0 ? '1' : '0'}`;
        parent.append(layer);

        return layer;
    });

    layersByParent.set(parent, layers);

    return layers;
}

function mirrorInto(element: HTMLElement, layers: HTMLSpanElement[]): HTMLElement[] {
    for (const ghost of ghostsByElement.get(element) ?? []) {
        ghost.remove();
    }

    const ghosts = layers.map(layer => {
        const clone = element.cloneNode(true) as HTMLElement;
        clone.style.cssText = 'position:absolute;left:0;top:0;height:100%';
        layer.append(clone);

        return clone;
    });

    ghostsByElement.set(element, ghosts);

    return ghosts;
}

// Backwards filling holds the first keyframe during a stagger delay; with no delay it equals the original none / forwards.
function animateRoll(element: HTMLElement, from: number, to: number, entering: boolean, duration: number, multiplier: number, delay: number): Animation[] {
    const angles = stops.map(stop => from + (to - from) * ease(stop));
    const fill = entering ? 'backwards' : 'both';

    if (reducedMotion) {
        const animation = element.animate(angles.map(angle => ({transform: transformAt(angle), opacity: opacityAt(angle)})), {duration, delay, fill});
        rolls.set(element, {from, to, animation});

        return [animation];
    }

    const sharp = element.animate(angles.map((angle, i) => ({transform: transformAt(angle), opacity: opacityAt(angle) * (1 - blurWeights[i])})), {duration, delay, fill});
    rolls.set(element, {from, to, animation: sharp});

    const parent = element.parentElement;

    if (!parent) {
        return [sharp];
    }

    const layers = ensureLayers(parent);
    weighLayers(layers, multiplier);

    const ghosts = mirrorInto(element, layers);
    const blurred = ghosts.map(ghost => ghost.animate(angles.map((angle, i) => ({
        transform: `scaleY(${1 / GHOST_STRETCH}) ${transformAt(angle)}`,
        opacity: opacityAt(angle) * blurWeights[i]
    })), {duration, delay, fill: 'both'}));

    const cleanup = (): void => {
        for (const ghost of ghosts) {
            ghost.remove();
        }

        if (ghostsByElement.get(element) === ghosts) {
            ghostsByElement.delete(element);
        }

        if (layers.every(layer => !layer.childElementCount)) {
            for (const layer of layers) {
                layer.remove();
            }
        }
    };

    blurred[0].finished.then(cleanup, cleanup);

    return [sharp, ...blurred];
}

/**
 * Rolls `incoming` into view like a digit on a drum and rolls `outgoing` away
 * from wherever its previous roll currently is. A positive direction rolls up.
 *
 * @param delay Milliseconds before both rolls start, used to stagger characters.
 */
export function drumRoll(outgoing: HTMLElement | null, incoming: HTMLElement, direction: number, delay: number = 0): Animation[] {
    const {rollDuration: duration, blurMultiplier: multiplier} = pace();
    const animations = animateRoll(incoming, -direction * ANGLE, 0, true, duration, multiplier, delay);

    if (!outgoing) {
        return animations;
    }

    const previous = rolls.get(outgoing);
    const progress = previous?.animation.effect?.getComputedTiming().progress ?? 1;
    const current = previous ? previous.from + (previous.to - previous.from) * ease(progress) : 0;

    outgoing.getAnimations().forEach(animation => animation.cancel());

    return [...animations, ...animateRoll(outgoing, current, direction * ANGLE, false, duration, multiplier, delay)];
}

/**
 * A cell that rolls between strings: the glyphs sit absolutely positioned
 * inside it, so the parent CSS has to give the cell a height and position its
 * direct `span` children absolutely. Its width animates through a CSS
 * transition on `width`.
 *
 * @returns A setter that reports whether the text changed. Direction 0 swaps
 * the text without a roll.
 */
export function createDrumRollReel(parent: HTMLElement, className: string): (text: string, direction: number, delay?: number) => boolean {
    const reel = document.createElement('span');
    reel.className = className;
    parent.append(reel);

    let previous: HTMLSpanElement | null = null;
    let previousText: string | null = null;

    return (text, direction, delay = 0) => {
        if (text === previousText) {
            return false;
        }

        const glyph = document.createElement('span');
        glyph.textContent = text;
        reel.append(glyph);

        if (direction) {
            reel.style.width = text ? `${glyph.offsetWidth}px` : '0px';
        } else {
            reel.style.transition = 'none';
            reel.style.width = text ? `${glyph.offsetWidth}px` : '0px';
            void reel.offsetWidth;
            reel.style.transition = '';
            reel.replaceChildren(glyph);
        }

        if (direction && previous) {
            const outgoing = previous;
            drumRoll(outgoing, glyph, direction, delay);
            Promise.all(outgoing.getAnimations().map(animation => animation.finished)).then(() => outgoing.remove(), () => {
            });
        }

        previous = glyph;
        previousText = text;

        return true;
    };
}
