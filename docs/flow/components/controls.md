---
outline: deep

requiredIcons: [ arrows-to-dot, compress, expand, minus, plus ]

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
        description: The accessible name of the fit button.
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

    -   name: zoomOutLabel
        description: The accessible name of the zoom out button.
        type: string
        optional: true
        default: Zoom out
---

# Controls

`FluxFlowControls` is the button bar of an interactive canvas: zoom out, zoom in, fit the whole flow in view, and take it fullscreen. Write it anywhere inside a [Flow](./flow) and it pins itself to a corner of the viewport, so it stays put while the flow pans and zooms behind it.

It renders nothing on a flow without `interactive`, since there is nothing there to zoom.

Fullscreen hands the whole screen to the flow, panels and all, and leaves the zoom and the position alone: the flow only gains room. The button sits apart from the zoom buttons, and it is left out entirely on a browser that does not allow fullscreen.

::: render
render=../../code/flow/components/controls/preview.vue
:::

::: tip
The buttons carry an icon and no text, so their names are props rather than fixed strings: set `fit-label`, `fullscreen-label`, `exit-fullscreen-label`, `zoom-in-label` and `zoom-out-label` to the language of your application.
:::

<FrontmatterDocs/>

## Examples

::: example Corner || Point `position` at the corner the bar belongs in. It is the same prop a [Panel](./panel) takes, so controls and a panel of your own line up on the same grid.
example=../../code/flow/components/controls/position.vue
:::

## Used components

- [Flow](./flow)
- [Panel](./panel)
