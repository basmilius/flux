---
outline: deep

props:
    -   name: label
        description: The text of the terminal.
        type: string

    -   name: icon
        description: An icon shown before the label.
        type: FluxIconName
        optional: true

    -   name: color
        description: The tint of the capsule.
        type: FluxColor
        optional: true
---

# Terminal

`FluxFlowTerminal` is the start and the end of a flow: the capsule a classic flowchart opens and closes with. Place it in its own [Node](./node) and connect it like any other node.

Where a [Pill](./pill) names a step on a raised surface, a terminal is one solid tinted capsule, so an endpoint never reads as another step in the chain.

::: render
render=../../code/flow/components/terminal/preview.vue
:::

::: tip
An endpoint has nothing before or after it, so drop the marker on that side of its connector: `marker-start="none"` on the line leaving a start, `marker-end="none"` on the line reaching an end.
:::

<FrontmatterDocs/>

## Examples

::: example In a flow || A start terminal heads the flow and an end terminal closes it, with the steps in between.
example=../../code/flow/components/terminal/flow.vue
:::

::: example Colors || A terminal accepts any FluxColor, which is enough to tell a clean finish from a failed one.
example=../../code/flow/components/terminal/colors.vue
:::

## Used components

- [Flow](./flow)
- [Node](./node)
