---
outline: deep

props:
    -   name: nodes
        description: The ids of the nodes the frame encloses. An unknown id is ignored.
        type: string[]

    -   name: title
        description: The label shown inside the frame, at its top-left. The frame reaches further up to make room for it, so it never covers a node.
        type: string
        optional: true

    -   name: color
        description: The tint of the frame. Without one it is drawn in gray.
        type: FluxColor
        optional: true

    -   name: padding
        description: The space, in pixels, kept between the nodes and the frame.
        type: number
        optional: true
        default: 21
---

# Group

`FluxFlowGroup` draws a labelled frame behind a set of nodes: a retry block, a stage of a pipeline, the part of a flow that runs on one machine. It names the nodes it encloses by id and measures the frame from them, so it follows along when they move.

A group is a backdrop, not a node. It renders behind every card on the canvas, never takes a pointer, and nothing anchors a connector to it.

::: render
render=../../code/flow/components/group/preview.vue
:::

::: tip
An id that matches no node is skipped without a word, so a group survives a card that is only rendered under a condition.
:::

<FrontmatterDocs/>

## Examples

::: example Two stages || A frame per stage, each in its own tint. The frames grow with the cards inside them, so a chain that gains a step keeps its group.
example=../../code/flow/components/group/flow.vue
:::

## Used components

- [Flow](./flow)
- [Node](./node)
- [Chain](./chain)
- [Card](./card)
