---
outline: deep

props:
    -   name: y
        description: The top of the lane, in flow coordinates. Pair it with `height` for a lane that runs across the flow.
        type: number
        optional: true
        default: 0

    -   name: height
        description: The height of the lane. Giving it makes the lane a row.
        type: number
        optional: true

    -   name: x
        description: The left edge of the lane, in flow coordinates. Pair it with `width` for a lane that runs down the flow.
        type: number
        optional: true
        default: 0

    -   name: width
        description: The width of the lane. Giving it makes the lane a column.
        type: number
        optional: true

    -   name: title
        description: The label shown in the gutter at the head of the lane.
        type: string
        optional: true

    -   name: color
        description: The tint of the band. Without one it is drawn in gray.
        type: FluxColor
        optional: true

    -   name: padding
        description: The space, in pixels, the lane reaches past the nodes on the axis it spans.
        type: number
        optional: true
        default: 21
---

# Lane

`FluxFlowLane` is the swimlane of a flow: a band with a titled gutter that says who owns the part of the canvas standing on it. Client and server, the two teams a handover runs between, the machine a stage runs on.

A lane is a backdrop and nothing more. It never positions its content: the nodes keep their own absolute `x` and `y`, and the lane is the strip they happen to stand on.

::: render
render=../../code/flow/components/lane/preview.vue
:::

::: tip
The pair of props you give picks the axis: `y` and `height` make a row, `x` and `width` make a column. The other axis is not yours to set, since a lane always spans the whole flow.
:::

<FrontmatterDocs/>

## Examples

::: example Columns || `x` and `width` turn the band on its side, so a handover between two teams reads left to right with the title above each column. The steps inside a column are placed by a [Chain](./chain), which lines up pills of different widths that a lane would not.
example=../../code/flow/components/lane/columns.vue
:::

## Used components

- [Flow](./flow)
- [Node](./node)
- [Card](./card)
