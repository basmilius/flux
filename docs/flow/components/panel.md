---
outline: deep

props:
    -   name: position
        description: The corner of the viewport the panel hangs in.
        type: "'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'"
        optional: true
        default: bottom-right

    -   name: offset
        description: The distance, in pixels, the panel keeps from the two edges of its corner.
        type: number
        optional: true
        default: 15

slots:
    -   name: default
        description: The content pinned to the viewport. A legend, a filter, a title, or anything else that should not travel with the flow.
---

# Panel

`FluxFlowPanel` pins its content to a corner of the viewport instead of to the canvas. Everything else written inside a [Flow](./flow) lives in the world and travels with it; a panel sits above that world and stays where it is while the flow pans and zooms underneath.

Write it anywhere inside the flow. Where it sits in your markup makes no difference: the corner is the `position` prop.

::: render
render=../../code/flow/components/panel/preview.vue
:::

::: tip
A panel takes its own presses back, so a button or a field inside one never starts a pan. It is also transparent to the pointer everywhere it does not cover, so the canvas below keeps the rest of the surface.
:::

::: tip
[Controls](./controls) and [Minimap](./minimap) are panels with something ready-made in them. Reach for `FluxFlowPanel` directly when you need a corner of the viewport for something else.
:::

<FrontmatterDocs/>

## Used components

- [Flow](./flow)
