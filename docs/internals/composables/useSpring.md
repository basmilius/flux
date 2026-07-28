# useSpring

This composable animates a single number towards a target with a spring. Where a CSS transition always takes the same time from wherever it starts, a spring carries speed: hand it the velocity a gesture ended with and the value keeps travelling at that speed before the spring reels it in. That is the difference between a surface that was flicked away and one that was nudged.

## Usage

```ts
import { usePointerDrag, useSpring } from '@flux-ui/internals';
import { useTemplateRef } from 'vue';

const surface = useTemplateRef('surface');
const offset = useSpring(0);

let base = 0;

usePointerDrag(surface, {
    axis: 'y',
    rebaseOnThreshold: true,
    onStart: () => {
        base = offset.value.value;
    },
    onMove: ({dy}) => offset.set(base + dy),
    onEnd: ({vy}) => offset.set(0, {velocity: vy})
});
```

Feeding `set` a moving target on every pointer move, instead of writing the value straight out, is what makes a dragged surface trail the pointer by a hair. It also means there is no break in speed at the moment of release: the spring is already moving.

`snap` jumps to a value without animating, which is what a resize or a first render needs. `stop` leaves the value where it is. `velocity()` reports the current speed in units per millisecond, in the same unit `set` accepts.

`set` also takes the spring's own three numbers, so one value can move under a different character per animation without a second spring. The default damping is exactly critical, `2 * sqrt(stiffness * mass)`: the value stops the moment it arrives and never passes its target. Lower it and the spring overshoots once and comes back, which is what makes a surface read as arriving rather than as being placed.

```ts
const offset = useSpring(0);

offset.set(0, {damping: 28});   // arrives with one overshoot
offset.set(height);             // leaves without any
```

The override lasts until the next `set`; `snap` restores the spring's own numbers.

A visitor who prefers reduced motion gets `set` as `snap`, so nothing animates. The spring stops on its own once it is close enough to its target, and it releases its animation frame when its scope is disposed.

## Type declarations

```ts
import type { Ref } from 'vue';

export declare function useSpring(
    initial: number,
    options?: UseSpringOptions
): UseSpringReturn;

type SpringProfile = {
    readonly damping?: number;
    readonly mass?: number;
    readonly stiffness?: number;
};

type UseSpringOptions = SpringProfile & {
    readonly precision?: number;
};

type UseSpringSetOptions = SpringProfile & {
    readonly velocity?: number;
};

type UseSpringReturn = {
    readonly value: Readonly<Ref<number>>;
    set(target: number, options?: UseSpringSetOptions): void;
    snap(value: number): void;
    stop(): void;
    velocity(): number;
};
```
