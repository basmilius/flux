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

    -   name: disabled
        description: If the radio is disabled.
        type: boolean
        optional: true

slots:
    -   name: default
        description: The label content of the radio. Falls back to the label prop.
---

# Radio

A radio represents a single option within a [Radio group](../radio/). It carries a `value`; selecting it updates the group's `v-model` to that value. A radio can render a plain label or fully custom content through its default slot.

::: render
render=../../../code/components/form/radio/item/preview.vue
:::

::: warning
This component is best used within a [Radio group](../radio/).
:::

<FrontmatterDocs/>

## Examples

::: example Custom content || A radio with custom label content.
example=../../../code/components/form/radio/item/content.vue
:::
