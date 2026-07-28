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

A `threshold` delays the start until the pointer has travelled that many pixels, so a click is not mistaken for a drag. `onMove` and `onEnd` only fire once the threshold is passed, and `isDragging` only turns true then.

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
    readonly x: number;
    readonly y: number;
};

type UsePointerDragOptions = {
    readonly axis?: 'x' | 'y' | 'both';
    readonly threshold?: number;
    onCancel?(): void;
    onEnd?(context: PointerDragContext): void;
    onMove?(context: PointerDragContext): void;
    onStart?(event: PointerEvent): boolean | void;
};

type UsePointerDragReturn = {
    readonly isDragging: Readonly<Ref<boolean>>;
};
```
