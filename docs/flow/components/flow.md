---
outline: deep

emits:
    -   name: update:viewport
        description: Triggered when the viewport pans or zooms. Bind it with v-model:viewport to control the viewport.
        type: [ FluxFlowViewport ]

props:
    -   name: background
        description: The backdrop behind the flow. `dots` and `grid` pan with the content at a fixed size; `none` is transparent. Opt in by setting it.
        type: "'dots' | 'grid' | 'none'"
        optional: true
        default: none

    -   name: interactive
        description: Fills its container with a pannable and zoomable viewport, starting at 100% zoom from the flow's top-left. Without it the flow sizes its own height to its content and scrolls when wider than its container.
        type: boolean
        optional: true

    -   name: start
        description: The id of a node to centre the interactive viewport on at 100% zoom, instead of starting at the top-left.
        type: string
        optional: true

    -   name: padding
        description: The padding, in pixels, kept around the content. Room for a card's badge is always reserved on top.
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

Add `interactive` to opt into a pannable and zoomable viewport that fills its container instead: drag to pan, and hold `ctrl` or `cmd` while scrolling to zoom towards the cursor.

::: render
render=../../code/flow/components/flow/preview.vue
:::

::: tip
Everything inside a flow, both `FluxFlowNode` and `FluxFlowConnection`, is written declaratively. Connectors reference nodes by id, so cards stay free of wiring props.
:::

<FrontmatterDocs/>

## Examples

::: example Running a flow || Connectors carry a progress fill so you can visualize a flow while it runs. Bind `progress-value` to your own run state.
example=../../code/flow/components/flow/run.vue
:::

::: example Branching || A condition that fans out to two labeled branches. Branching is just more connectors, each referencing a node by id.
example=../../code/flow/components/flow/branching.vue
:::

::: example Deploy pipeline || A real-world CI/CD flow: a push builds an image, tests gate the release, and the outcome branches to a deploy or an alert.
example=../../code/flow/components/flow/deploy.vue
:::

::: example Knowledge graph || A richer, real-world flow: data sources feeding structured skills that compile into an output. It combines card rows, colored and dashed connectors, and endpoint markers.
example=../../code/flow/components/flow/knowledge.vue
:::

::: example Background || Opt into a `dots` or `grid` backdrop with the `background` prop; it is transparent by default.
example=../../code/flow/components/flow/background.vue
:::

::: example Interactive || With `interactive` the flow fills its container as a pannable, zoomable canvas, starting at 100% from the top-left. Drag to pan, and hold `ctrl`/`cmd` while scrolling to zoom.
example=../../code/flow/components/flow/interactive.vue
:::

::: example Start point || Point `start` at a node id to open the interactive viewport centered on that card instead of the top-left.
example=../../code/flow/components/flow/start.vue
:::

## Used components

- [Node](./node)
- [Connection](./connection)
- [Card](./card)
