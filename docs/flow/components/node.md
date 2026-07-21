---
outline: deep

props:
    -   name: id
        description: A unique identifier for the node. Connectors reference nodes by this id.
        type: string

    -   name: x
        description: The horizontal position of the node, in flow coordinates.
        type: number

    -   name: y
        description: The vertical position of the node, in flow coordinates.
        type: number

slots:
    -   name: default
        description: The content of the node, typically a FluxFlowCard or one of its variants.
---

# Node

`FluxFlowNode` positions a piece of content on the flow canvas. Give it a unique `id` and an `x` / `y` position in flow coordinates; the node measures its rendered size and registers it with the flow, so connectors can anchor to its edges.

A node renders whatever you place in its default slot. In practice that is a [Card](./card), but any markup works.

A card and a pill each mark their icon with a `data-flow-anchor` attribute, which is what a connector with `from-align="start"` or `to-align="start"` lands on. Put the attribute on an element of your own to give custom node content the same anchor; without one, a `start` connector falls back to 30px from the corner.

::: render
render=../../code/flow/components/node/preview.vue
:::

::: tip
Connectors reference a node by its `id`, never through props on the node or the card, so the wiring of a flow stays in one place: the connectors.
:::

<FrontmatterDocs/>

## Used components

- [Flow](./flow)
- [Card](./card)
