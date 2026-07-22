---
outline: deep

emits:
    -   name: update:viewport
        description: Triggered when the viewport pans or zooms. Bind it with v-model:viewport to control the viewport.
        type: [ FluxFlowViewport ]

props:
    -   name: align
        description: Where an interactive viewport opens horizontally. `center` centres the flow when the container is wider than it, and falls back to `start` when it is not; `start` always sits against the flow's left edge. Both open at the top.
        type: "'start' | 'center'"
        optional: true
        default: center

    -   name: axis
        description: The axis every connector leaves and enters its nodes on. Without one each connector picks the shorter of the two, which is the wrong one as soon as a row of nodes is wider than the gap between two rows. A connector that names its own from-side or to-side still wins.
        type: "'horizontal' | 'vertical'"
        optional: true

    -   name: background
        description: The backdrop behind the flow. `dots` and `grid` pan with the content at a fixed size; `none` is transparent. Opt in by setting it.
        type: "'dots' | 'grid' | 'none'"
        optional: true
        default: none

    -   name: interactive
        description: Fills its container with a pannable and zoomable viewport, starting at 100% zoom from the top of the flow. Without it the flow sizes its own height to its content and scrolls when wider than its container.
        type: boolean
        optional: true

    -   name: start
        description: The id of a node to centre the interactive viewport on at 100% zoom, instead of starting at the top of the flow.
        type: string
        optional: true

    -   name: padding
        description: The padding, in pixels, kept around the content.
        type: number
        optional: true
        default: 0

    -   name: minZoom
        description: The minimum zoom level.
        type: number
        optional: true
        default: 0.4

    -   name: maxZoom
        description: The maximum zoom level.
        type: number
        optional: true
        default: 2

    -   name: zoomStep
        description: The relative amount each zoom step changes the zoom level.
        type: number
        optional: true
        default: 0.2

    -   name: gridSize
        description: The spacing, in pixels, of the background dots or grid at 100% zoom.
        type: number
        optional: true
        default: 24

    -   name: viewport
        description: The current viewport (x, y and zoom). Use with v-model:viewport for a controlled viewport.
        type: FluxFlowViewport
        optional: true

slots:
    -   name: default
        description: The nodes and connectors that make up the flow. Place FluxFlowNode and FluxFlowConnection components here.
---

# Flow

`FluxFlow` is the root of a flow: a shared coordinate space that connectors use to route between nodes. By default it lays its content out naturally, sizes its own height, and scrolls horizontally when the content is wider than its container, so it drops inline without a fixed-height wrapper.

Add `interactive` to opt into a pannable and zoomable viewport that fills its container instead: drag or scroll with two fingers to pan, and pinch or hold `ctrl`/`cmd` while scrolling to zoom towards the cursor.

::: render
render=../../code/flow/components/flow/preview.vue
:::

::: tip
Everything inside a flow, both `FluxFlowNode` and `FluxFlowConnection`, is written declaratively. Connectors reference nodes by id, so cards stay free of wiring props.
:::

<FrontmatterDocs/>

## Examples

::: example Branching || A condition that fans out to two labeled branches. Branching is just more connectors, each referencing a node by id.
example=../../code/flow/components/flow/branching.vue
:::

::: example Axis || Two branches sitting further apart than the row below them is deep. Without `axis` each connector would take the shorter way out, leaving the card sideways and crossing back over it; naming the axis keeps every line running with the flow.
example=../../code/flow/components/flow/axis.vue
:::

::: example Background || Opt into a `dots` or `grid` backdrop with the `background` prop; it is transparent by default.
example=../../code/flow/components/flow/background.vue
:::

::: example Interactive || With `interactive` the flow fills its container as a pannable, zoomable canvas, starting at 100% from the top of the flow. Drag or scroll with two fingers to pan, and pinch or hold `ctrl`/`cmd` while scrolling to zoom.
example=../../code/flow/components/flow/interactive.vue
:::

::: example Start point || Point `start` at a node id to open the interactive viewport centered on that card instead of the top of the flow.
example=../../code/flow/components/flow/start.vue
:::

::: tip
On an interactive canvas, controls inside a card (a toggle, a button, a link, a text field) keep working: a press that starts on one never begins a pan. Add `data-nopan` to any other element that should grab the pointer for itself instead of panning the canvas.
:::

::: tip
An interactive canvas is reachable with the keyboard: tab to it, then pan with the arrow keys (hold `shift` to cover three times the ground), zoom with `+` and `-`, and press `0` to fit the whole flow in view. A field or a button inside a card keeps every key it is given.
:::

::: tip
An interactive canvas pans up to 300px past the viewport and then stops, so it always has room to move, even when the flow is smaller than its container. A two-finger scroll that runs into that edge hands the page its scroll back, so a flow embedded halfway down a page never traps it.
:::

For flows built out in full, from routing rules to a running deploy pipeline, see [Examples](../examples).

## Used components

- [Node](./node)
- [Connection](./connection)
- [Card](./card)
- [Controls](./controls)
- [Minimap](./minimap)
