---
outline: deep

props:
    -   name: value
        description: The value of the radio, bound to the radio group's model.
        type: [ string, number, boolean ]

    -   name: label
        description: The label of the radio.
        type: string
        optional: true

    -   name: sub-label
        description: A secondary line of text shown below the label. The radio stays aligned with the label.
        type: string
        optional: true

    -   name: disabled
        description: If the radio is disabled.
        type: boolean
        optional: true

slots:
    -   name: default
        description: The label content of the radio. Falls back to the label prop.
---

# Radio

A radio represents a single option within a [Radio group](./group). It carries a `value`; selecting it updates the group's `v-model` to that value. A radio can render a plain label or fully custom content through its default slot.

::: render
render=../../../code/components/form/radio/preview.vue
:::

::: warning
This component is best used within a [Radio group](./group).
:::

<FrontmatterDocs/>

## Examples

::: example Custom content || A radio with custom label content.
example=../../../code/components/form/radio/content.vue
:::

::: example Sub-label || A radio with a secondary line of text below the label.
example=../../../code/components/form/radio/sub-label.vue
:::

## Used components

- [Radio group](./group)
