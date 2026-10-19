# drumRoll

Rolls an element into view like a digit on a drum, and rolls the previous element away from wherever its own roll currently is. The roll is a 3D `rotateX` with a short motion blur. Rolls that follow each other quickly get shorter and blur harder.

A positive direction rolls up, a negative direction rolls down. Both elements need the same parent: the blurred ghosts are layered on top of it. With `prefers-reduced-motion` the roll stays, but without the blur.

## Usage

```ts
import { drumRoll } from '@flux-ui/internals';

const incoming = document.createElement('span');
incoming.textContent = '5';
cell.append(incoming);

// Roll up, starting after 40ms.
const animations = drumRoll(outgoing, incoming, 1, 40);

Promise.all(animations.map(animation => animation.finished))
    .then(() => outgoing.remove());
```

## Type declarations

```ts
declare function drumRoll(
    outgoing: HTMLElement | null,
    incoming: HTMLElement,
    direction: number,
    delay?: number
): Animation[];
```

## Used by

- [createDrumRollReel](./createDrumRollReel)
