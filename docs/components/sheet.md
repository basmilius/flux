---
outline: deep

emits:
    -   name: close
        description: Triggered when the sheet asks to be closed, through the escape key, a drag or flick down past the dismiss threshold, or the grabber while the sheet sits at its lowest snap point.
        type: [ ]

props:
    -   name: is-closeable
        description: If the sheet can be closed with the escape key.
        type: boolean
        optional: true

    -   name: is-draggable
        description: If the sheet shows its grabber and can be dragged to another snap point or off the screen.
        type: boolean
        default: true
        optional: true

    -   name: snap-points
        description: The heights the sheet rests at, as fractions of the viewport height and in ascending order. The sheet opens at the first one. Without them it rests at a single height, sized to its content.
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

# Bottom sheet

The bottom sheet rises from the bottom edge of the view and is the mobile-native answer to a dialog: it stays within reach of a thumb, it can be dragged away, and it can rest at more than one height. Reach for it on touch surfaces where an [Overlay](./overlay) would land in the middle of the screen, out of reach.

::: render
render=../code/components/bottom-sheet/preview.vue
:::

::: warning Requires FluxRoot
This sheet renders through a parent [`<FluxRoot>`](./root). Without one in your app, nothing appears and no error is thrown.
:::

::: tip
The sheet never closes itself. Dragging it down past the threshold or flicking it down emits `close`, and so does the escape key once `is-closeable` is set; the `v-if` on its content is what actually removes it, exactly like the [Overlay](./overlay) and the [Slide over](./slide-over).
:::

::: info Dragging and scrolling
A drag that starts on the content only takes over when that content is scrolled to the top, so a scrollable body keeps its own gesture. Dragging from the grabber always moves the sheet, and a drag that starts on a button, link or form control is left alone.

Above the tallest snap point the sheet is elastic: it keeps following the pointer against a resistance that builds quickly, and it springs back to that snap point on release.
:::

::: info The grabber
The grabber is a button, not a decorative bar. <kbd>Arrow up</kbd> and <kbd>Arrow down</kbd> move between snap points, activating it steps one snap point down, and doing that at the lowest one closes the sheet. Set `is-draggable` to `false` to leave it out entirely.
:::

::: tip
The sheet keeps clear of `env(safe-area-inset-bottom)`. A visitor who prefers reduced motion gets the sheet without the slide, and it lands on its snap point directly instead of gliding there.
:::

<FrontmatterDocs/>

## Examples

::: example Basic || A sheet that rests at one height, sized to its content.
example=../code/components/bottom-sheet/basic.vue
:::

::: example Snap points || Two resting heights: a peek that shows the first results and a full state that shows the rest. Drag the grabber up or press arrow up to grow the sheet.
example=../code/components/bottom-sheet/snap-points.vue
:::

::: example Scrollable body || A tall sheet with a scrolling body. Dragging the list scrolls it; dragging it while it sits at the top moves the sheet instead.
example=../code/components/bottom-sheet/scrollable.vue
:::

::: example Not draggable || Without dragging the sheet has no grabber and only its own actions can dismiss it, which suits a decision that should not be swiped away.
example=../code/components/bottom-sheet/not-draggable.vue
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
