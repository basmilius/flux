# useWheelDrag

This composable tracks a two finger swipe over an element as one continuous gesture, and reports it in the same deltas a [pointer drag](./usePointerDrag) does. That way a surface that already follows a finger on a touch screen follows a trackpad on the desktop without a second set of math.

A trackpad never says that the fingers left it: the browser keeps sending wheel events while the flick runs out and then simply stops. The gesture therefore ends on an idle timer, once no event has arrived for `idle` milliseconds, which is after the momentum has died down. It is short enough to land right after the fingers stop and long enough to bridge the gap between two events of a slow swipe.

## Usage

```ts
import { useWheelDrag } from '@flux-ui/internals';
import { ref, useTemplateRef } from 'vue';

const row = useTemplateRef('row');
const offset = ref(0);

let startOffset = 0;

const {isWheeling} = useWheelDrag(row, {
    axis: 'x',
    onStart: () => {
        startOffset = offset.value;
    },
    onMove: ({dx}) => {
        offset.value = startOffset + dx;
    },
    onEnd: ({vx}) => {
        offset.value = vx < 0 ? -240 : 0;
    }
});
```

Only a swipe that leans on the chosen axis takes the gesture; anything else is a scroll and stays with the page, so a vertical flick over a horizontally swipeable row still scrolls the list. Once the gesture is taken the axis is settled, which keeps a wobbly finger from handing it back halfway. Returning `false` from `onStart` refuses it, the same as with a pointer drag.

Claiming the gesture also calls `preventDefault`, which is what stops the back and forward navigation swipe of macOS from running over the element while the surface is being dragged. A pinch is left alone: every browser but Safari reports it as a wheel event with a modifier key, and that belongs to the page.

Every context carries `vx` and `vy`, the speed in pixels per millisecond over the last 100 milliseconds. Read them in `onEnd` to tell a flick from a slow swipe, and hand them to a spring such as [useSpring](./useSpring) to let that speed carry into where the surface lands.

::: tip
A wheel event does not always report pixels: in line or page mode it reports steps. Those are scaled to pixels before they reach you, a page against the element's own size, so the deltas mean the same thing on every device.
:::

## Type declarations

```ts
import type { TemplateRef } from '@flux-ui/internals';
import type { Ref } from 'vue';

export declare function useWheelDrag<TElement extends HTMLElement>(
    elementRef: TemplateRef<TElement>,
    options?: UseWheelDragOptions
): UseWheelDragReturn;

type WheelDragContext = {
    readonly dx: number;
    readonly dy: number;
    readonly event: WheelEvent;
    readonly vx: number;
    readonly vy: number;
};

type UseWheelDragOptions = {
    readonly axis?: 'x' | 'y';
    readonly idle?: number;
    onEnd?(context: WheelDragContext): void;
    onMove?(context: WheelDragContext): void;
    onStart?(event: WheelEvent): boolean | void;
};

type UseWheelDragReturn = {
    readonly isWheeling: Readonly<Ref<boolean>>;
    cancel(): void;
};
```
