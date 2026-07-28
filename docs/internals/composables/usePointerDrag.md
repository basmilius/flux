# usePointerDrag

This composable tracks a pointer drag on an element. It handles pointer capture, so the drag keeps following the pointer once it leaves the element, and it reports the distance travelled since the drag started.

The element itself stays responsible for its `touch-action`, since only it knows which native gesture it replaces. A horizontal drag on a list row typically needs `touch-action: pan-y`, a resize handle needs `touch-action: none`.

## Usage

```ts
import { usePointerDrag } from '@flux-ui/internals';
import { ref, useTemplateRef } from 'vue';

const handle = useTemplateRef('handle');
const width = ref(300);

let startWidth = 0;

const {isDragging} = usePointerDrag(handle, {
    axis: 'x',
    onStart: () => {
        startWidth = width.value;
    },
    onMove: ({dx}) => {
        width.value = Math.max(120, startWidth + dx);
    }
});
```

Returning `false` from `onStart` refuses the drag, which is useful when a modifier key or a disabled state should let the native behavior through.

A `threshold` delays the start until the pointer has travelled that many pixels, so a click is not mistaken for a drag. `onMove` and `onEnd` only fire once the threshold is passed, and `isDragging` only turns true then. Pass a function instead of a number to vary it per pointer, for instance a shorter one for a mouse than for a finger. Since `dx` and `dy` are measured from the pointer's original position, the surface jumps by the threshold on the first move; `rebaseOnThreshold` moves the origin to where the threshold was passed so the drag starts at zero instead.

Every context carries `vx` and `vy`, the pointer's speed in pixels per millisecond over the last 100 milliseconds. Read them in `onEnd` to tell a flick from a slow drag, and hand them to a spring such as [useSpring](./useSpring) to let that speed carry into where the surface lands. A pointer that came to a stop before it was released reports close to zero, so no extra time window is needed.

## Type declarations

```ts
import type { TemplateRef } from '@flux-ui/internals';
import type { Ref } from 'vue';

export declare function usePointerDrag<TElement extends HTMLElement>(
    elementRef: TemplateRef<TElement>,
    options?: UsePointerDragOptions
): UsePointerDragReturn;

type PointerDragContext = {
    readonly dx: number;
    readonly dy: number;
    readonly event: PointerEvent;
    readonly startX: number;
    readonly startY: number;
    readonly vx: number;
    readonly vy: number;
    readonly x: number;
    readonly y: number;
};

type UsePointerDragOptions = {
    readonly axis?: 'x' | 'y' | 'both';
    readonly rebaseOnThreshold?: boolean;
    readonly threshold?: number | ((event: PointerEvent) => number);
    onCancel?(): void;
    onEnd?(context: PointerDragContext): void;
    onMove?(context: PointerDragContext): void;
    onStart?(event: PointerEvent): boolean | void;
};

type UsePointerDragReturn = {
    readonly isDragging: Readonly<Ref<boolean>>;
};
```
