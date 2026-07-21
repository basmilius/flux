---
outline: deep

props:
    -   name: value
        description: What the marker shows. A digit or letter keeps it square; a word widens it to fit.
        type: number | string
---

# Step

`FluxFlowStep` is a small marker that names a step. Place it in its own [Node](./node) and wire it up like any other node, so the trunk of a flow runs straight through it while each step branches off to the side.

A single character keeps the marker square. Give it a word and it widens to fit, which suits a flow whose steps are named rather than numbered.

::: render
render=../../code/flow/components/step/preview.vue
:::

<FrontmatterDocs/>

## Examples

::: example Numbered steps || The trunk runs from marker to marker; every marker points at the step it numbers.
example=../../code/flow/components/step/flow.vue
:::

::: example Values || Digits, letters and words all sit in the same marker.
example=../../code/flow/components/step/values.vue
:::

## Used components

- [Flow](./flow)
- [Node](./node)
