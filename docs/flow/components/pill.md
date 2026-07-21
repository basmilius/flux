---
outline: deep

props:
    -   name: icon
        description: The icon shown in the leading tile.
        type: FluxIconName

    -   name: label
        description: The text of the pill.
        type: string

    -   name: color
        description: The tint of the leading icon.
        type: FluxColor
        optional: true

    -   name: isLoading
        description: Replaces the leading icon with a spinner in the same tinted tile, for a node that is currently running.
        type: boolean
        optional: true
---

# Pill

`FluxFlowPill` is a compact node: a tinted icon and a label on a raised pill. Where a [Card](./card) describes a step in full, a pill names one, which makes it a natural head for a flow, the trigger that everything below hangs off.

::: render
render=../../code/flow/components/pill/preview.vue
:::

<FrontmatterDocs/>

## Examples

::: example In a flow || A pill starts the flow and connects to the rest of the canvas like any other node.
example=../../code/flow/components/pill/flow.vue
:::

::: example Loading || Set `isLoading` to swap the leading icon for a spinner in the same tinted tile. A chain of pills walks itself: the running stage spins, finished ones flip to a check.
example=../../code/flow/components/pill/loading.vue
:::

## Used components

- [Flow](./flow)
- [Node](./node)
