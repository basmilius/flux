---
outline: deep

props:
    -   name: value
        description: The value of the tile, bound to the radio group's model.
        type: [ string, number, boolean ]

    -   name: label
        description: The label of the tile.
        type: string
        optional: true

    -   name: sub-label
        description: A secondary line of text shown below the label.
        type: string
        optional: true

    -   name: icon
        description: An icon shown at the start of the tile.
        type: FluxIconName
        optional: true

    -   name: disabled
        description: If the tile is disabled.
        type: boolean
        optional: true

slots:
    -   name: default
        description: The label content of the tile. Falls back to the label prop.
---

# Radio tile

A radio tile is a card-style [Radio](./) for prominent, fully visible choices — each option carries an icon, a label and a short description. Place the tiles inside a [Radio group](./group) just like regular radios; the group handles selection and state.

::: render
render=../../../code/components/form/radio/tile/preview.vue
:::

::: tip
Tiles fill the group's width when stacked. Add `is-inline` to the [Radio group](./group) to lay them out in equal columns — best for two or three options. You can mix tiles and regular [Radios](./) in the same group when one option is less prominent.
:::

<FrontmatterDocs/>

## Examples

::: example Stacked || Card-style radios stacked at full width.
example=../../../code/components/form/radio/tile/stacked.vue
:::

::: example Inline || Tiles laid out in equal columns with is-inline.
example=../../../code/components/form/radio/tile/inline.vue
:::

::: example Without description || Compact tiles with just an icon and label, no sub-label.
example=../../../code/components/form/radio/tile/without-description.vue
:::

::: example Shipping method || A real-world group with a description and price per option.
example=../../../code/components/form/radio/tile/shipping.vue
:::

## Used components

- [Icon](../../icon)
- [Radio group](./group)
