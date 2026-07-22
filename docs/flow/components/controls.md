---
outline: deep

requiredIcons: [ arrows-to-dot, circle-check, compress, expand, minus, plus ]

props:
    -   name: position
        description: The corner of the viewport the controls hang in.
        type: "'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'"
        optional: true
        default: bottom-right

    -   name: offset
        description: The distance, in pixels, the controls keep from the two edges of their corner.
        type: number
        optional: true
        default: 15

    -   name: fitLabel
        description: The name of the fit view item in the zoom flyout.
        type: string
        optional: true
        default: Fit view

    -   name: fullscreenLabel
        description: The accessible name of the fullscreen button.
        type: string
        optional: true
        default: Fullscreen

    -   name: exitFullscreenLabel
        description: The accessible name the fullscreen button carries while the flow fills the screen.
        type: string
        optional: true
        default: Exit fullscreen

    -   name: zoomInLabel
        description: The accessible name of the zoom in button.
        type: string
        optional: true
        default: Zoom in

    -   name: zoomLabel
        description: The accessible name of the flyout the zoom level opens.
        type: string
        optional: true
        default: Zoom

    -   name: zoomOutLabel
        description: The accessible name of the zoom out button.
        type: string
        optional: true
        default: Zoom out
---

# Controls

`FluxFlowControls` is the button bar of an interactive canvas: zoom out, the current zoom level, zoom in, and take the flow fullscreen. Write it anywhere inside a [Flow](./flow) and it pins itself to a corner of the viewport, so it stays put while the flow pans and zooms behind it.

It renders nothing on a flow without `interactive`, since there is nothing there to zoom.

The zoom level sits between the two zoom buttons and is a button of its own: it opens a flyout holding 200%, 150%, 100%, 75%, 50% and fit view. A level zooms about the middle of the viewport, so what is being looked at stays where it is, and a level the flow cannot reach is left out of the list: a canvas capped with `max-zoom` never offers one.

Fullscreen hands the whole screen to the flow, panels and all, and leaves the zoom and the position alone: the flow only gains room. The button sits apart from the zoom buttons, and it is left out entirely on a browser that does not allow fullscreen.

::: render
render=../../code/flow/components/controls/preview.vue
:::

::: tip
The buttons carry an icon and no text of their own, so every name the bar holds is a prop rather than a fixed string: set `fit-label`, `fullscreen-label`, `exit-fullscreen-label`, `zoom-in-label`, `zoom-label` and `zoom-out-label` to the language of your application. The zoom levels are percentages, which need no translating.
:::

<FrontmatterDocs/>

## Examples

::: example Corner || Point `position` at the corner the bar belongs in. It is the same prop a [Panel](./panel) takes, so controls and a panel of your own line up on the same grid.
example=../../code/flow/components/controls/position.vue
:::

## Used components

- [Flow](./flow)
- [Panel](./panel)
