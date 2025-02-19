---
outline: deep

emits:
    -   name: click
        description: Triggered when the chip is clicked.
        type: [ MouseEvent ]

props:
    -   name: icon-leading
        description: The icon shown at the start of the chip.
        type: FluxIconName
        optional: true

    -   name: icon-trailing
        description: The icon shown at the end of the chip.
        type: FluxIconName
        optional: true

    -   name: is-selectable
        description: Indicates that the chip is selectable.
        type: boolean
        optional: true

    -   name: is-selected
        description: Indicates that the chip is selected.
        type: boolean
        optional: true

    -   name: label
        description: The label of the chip.
        type: string
---

# Chip

This component displays brief information with optional interactivity. It supports icons before and after the label and can function as either a static element or a selectable button with a selected state.

::: render
render=../../code/guide/components/chip/preview.vue
:::

<FrontmatterDocs/>

## Examples

::: example List || Chips can be placed within stacks to create a list.
example=../../code/guide/components/chip/list.vue
:::

::: example Selectable || This variant of a chip can be used within filters.
example=../../code/guide/components/chip/selectable.vue
:::

## Used components

- [Icon](./icon)
