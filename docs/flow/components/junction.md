---
outline: deep

props:
    -   name: color
        description: The tint of the ring. Without one it is drawn in the same gray as a plain connector.
        type: FluxColor
        optional: true
---

# Junction

`FluxFlowJunction` is the knot in a flow: the point where several lines meet, or where one line splits into many. Place it in its own [Node](./node) and wire it up like any other node, so three connectors reaching it and one leaving it read as a single merge instead of three lines crossing.

It is a connection point, not a step, so it carries no label. A [Step](./step) numbers a stage of the flow; a junction only says the wiring comes together here.

::: render
render=../../code/flow/components/junction/preview.vue
:::

<FrontmatterDocs/>

## Examples

::: example Merging sources || Three sources land on one junction, and a single connector carries them into the step that consumes them. Dropping the marker on the connectors that meet keeps the junction itself the only shape at that point.
example=../../code/flow/components/junction/flow.vue
:::

## Used components

- [Flow](./flow)
- [Node](./node)
