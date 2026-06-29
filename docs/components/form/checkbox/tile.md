---
outline: deep

props:
    -   name: value
        description: The value this tile contributes to the surrounding [Checkbox group](./group).
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

requiredIcons:
    - check
---

# Checkbox tile

A checkbox tile is a card-style [Checkbox](./) for prominent, multi-select choices — each option carries an icon, a label and a short description. Place the tiles inside a [Checkbox group](./group); the group binds the selected values to an array.

::: render
render=../../../code/components/form/checkbox/tile/preview.vue
:::

::: tip
Tiles fill the group's width when stacked. Add `is-inline` to the [Checkbox group](./group) to lay them out in equal columns — best for two or three options. You can mix tiles and regular [Checkboxes](./) in the same group.
:::

<FrontmatterDocs/>

## Examples

::: example Stacked || Card-style checkboxes stacked at full width.
example=../../../code/components/form/checkbox/tile/stacked.vue
:::

::: example Inline || Tiles laid out in equal columns with is-inline.
example=../../../code/components/form/checkbox/tile/inline.vue
:::

::: example Without description || Compact tiles with just an icon and label, no sub-label.
example=../../../code/components/form/checkbox/tile/without-description.vue
:::

::: example Account security || A real-world group with a description per option.
example=../../../code/components/form/checkbox/tile/security.vue
:::

## Used components

- [Checkbox group](./group)
- [Icon](../../icon)
