---
outline: deep

props:
    -   name: position
        description: The corner of the viewport the minimap hangs in.
        type: "'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'"
        optional: true
        default: bottom-right

    -   name: offset
        description: The distance, in pixels, the minimap keeps from the two edges of its corner.
        type: number
        optional: true
        default: 15

    -   name: width
        description: The width, in pixels, of the map.
        type: number
        optional: true
        default: 180

    -   name: height
        description: The height, in pixels, of the map.
        type: number
        optional: true
        default: 120

    -   name: padding
        description: The air, in pixels, kept between the flow and the edge of the map.
        type: number
        optional: true
        default: 9
---

# Minimap

`FluxFlowMinimap` is the whole flow at a glance: a block per node and a frame around the part of it currently on screen. Click or drag on the map to move the viewport there, which is how you cross a flow that reaches well past its container without panning your way over.

It renders nothing on a flow without `interactive`, since a flow that shows all of itself has nothing to map.

::: render
render=../../code/flow/components/minimap/preview.vue
:::

::: tip
The map fits the nodes, not the whole world, so panning past the flow does not shrink every block. The frame is allowed to run off the edge of the map: that is what tells you the viewport sits beside the flow rather than on it.
:::

::: tip
Blocks are drawn in one flat gray. A minimap says where things are, not what they are; the color of a card belongs on the card.
:::

<FrontmatterDocs/>

## Used components

- [Flow](./flow)
- [Panel](./panel)
