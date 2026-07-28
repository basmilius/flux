---
outline: deep

emits:
    -   name: close
        description: Triggered when the sheet asks to be closed, through the escape key, a click beside the sheet, a drag or flick away from its edge past the dismiss threshold, or the grabber while the sheet sits at its smallest snap point.
        type: [ ]

props:
    -   name: is-closeable
        description: If the sheet can be closed with the escape key or by clicking beside it.
        type: boolean
        optional: true

    -   name: is-draggable
        description: If the sheet shows its grabber and can be dragged to another snap point or off the screen.
        type: boolean
        default: true
        optional: true

    -   name: position
        description: The edge the sheet is attached to and slides in from.
        type: "'bottom' | 'left' | 'right' | 'top'"
        default: bottom
        optional: true

    -   name: snap-points
        description: The sizes the sheet rests at, as fractions of the viewport height for a bottom or top sheet and of its width for a left or right one, in ascending order. The sheet opens at the first one. Without them it rests at a single size, fitted to its content.
        type: number[]
        optional: true

    -   name: view-key
        description: A unique key to identify the current view within the sheet. Used for view-based transitions.
        type: string
        optional: true

slots:
    -   name: default
        description: The content of the sheet. Use a v-if on it to control its visibility.
---

# Sheet

The sheet slides in from an edge of the view and is the gesture-native answer to a dialog: it stays within reach of a thumb, it can be dragged away, and it can rest at more than one size. Reach for it on touch surfaces where an [Overlay](./overlay) would land in the middle of the screen, out of reach.

It defaults to the bottom edge, the one a thumb reaches best. `position` moves it to any of the four, and every position is the same sheet mirrored: the drag, the snap points and the grabber follow the axis it sits on. A right-hand sheet resembles the [Slide over](./slide-over), which is the quieter, undraggable panel for the same corner of the screen.

::: render
render=../code/components/sheet/preview.vue
:::

::: warning Requires FluxRoot
This sheet renders through a parent [`<FluxRoot>`](./root). Without one in your app, nothing appears and no error is thrown.
:::

::: tip
The sheet never closes itself. Dragging it away from its edge past the threshold or flicking it away emits `close`, and so do the escape key and a click beside the sheet once `is-closeable` is set; the `v-if` on its content is what actually removes it, exactly like the [Overlay](./overlay) and the [Slide over](./slide-over).

A gesture keeps its momentum all the way out: the sheet rides the same spring off the screen and only emits `close` once it is gone. Anything the event triggers, a route change for instance, therefore starts after the sheet has left rather than halfway through.
:::

::: info Dragging and scrolling
The sheet moves on a spring, so the speed you let go with carries into where it lands: a flick travels further and settles sooner than a slow drag over the same distance. Opening is the one movement that overshoots: the sheet passes its resting place by a few percent and comes back once, the way a surface that was thrown into place would. Everything else, closing included, stops exactly where it is aimed. The surface never fades; it is opaque from the first frame to the last and only travels. What fades is the shade behind it. The shade behind it follows along, lightening as you pull the sheet below its lowest snap point and darkening again when it springs back.

Sheet and content share one gesture. Scrolled content keeps scrolling until it runs out, and from there the same drag continues into the sheet. Dragging towards the edge grows the sheet to a larger snap point first, and only once it is at its largest does the content scroll. Dragging from the grabber always moves the sheet, and a drag that starts on a button, link or form control is left alone.

Past the largest snap point, with nothing left to scroll, the sheet is elastic: it keeps following the pointer against a resistance that builds quickly, and it springs back on release.
:::

::: info On a desktop
The sheet is drawn to the pointer as well as to a thumb. Dragging works with a mouse from the same places, at a shorter threshold, and the wheel or trackpad moves between snap points as long as the content has nowhere left to scroll in that direction. A left or right sheet listens to horizontal scrolling, the axis it moves on. Scrolling never dismisses the sheet: at its smallest snap point the wheel does nothing, so a stray flick cannot close it. With `is-closeable` set, a click beside the sheet does.
:::

::: info The grabber
The grabber is a button, not a decorative bar. It sits against the edge the sheet is pulled away from and turns with it. The two arrow keys along its axis move between snap points, activating it steps one snap point down, and doing that at the smallest one closes the sheet. Set `is-draggable` to `false` to leave it out entirely.
:::

::: tip
The sheet keeps clear of the safe area inset on the edge it is attached to. A visitor who prefers reduced motion gets the sheet without the slide, and it lands on its snap point directly instead of gliding there.
:::

<FrontmatterDocs/>

## Examples

::: example Basic || A sheet that rests at one height, sized to its content.
example=../code/components/sheet/basic.vue
:::

::: example Positions || The same sheet on each of the four edges. Every one of them drags, snaps and dismisses along the axis it sits on.
example=../code/components/sheet/positions.vue
:::

::: example Snap points || Two resting heights: a peek that shows the first results and a full state that shows the rest. Drag the grabber up or press arrow up to grow the sheet.
example=../code/components/sheet/snap-points.vue
:::

::: example Scrollable body || A sheet with a scrolling body and two snap points. Dragging the list up grows the sheet first and scrolls the list once it is full height; dragging back down scrolls to the top and then shrinks the sheet, all within one gesture.
example=../code/components/sheet/scrollable.vue
:::

::: example Not draggable || Without dragging the sheet has no grabber and only its own actions can dismiss it, which suits a decision that should not be swiped away.
example=../code/components/sheet/not-draggable.vue
:::

## Used components

- [Button](./button)
    - [Destructive](./button/destructive)
    - [Secondary](./button/secondary)
- [Item](./item/)
- [Pane](./pane)
    - [Body](./pane/body)
    - [Footer](./pane/footer)
    - [Header](./pane/header)
