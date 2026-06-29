---
outline: deep

props:
    -   name: columns
        description: The number of columns in the grid. Values are floored and clamped to a minimum of 1.
        type: number
        optional: true
        default: "2"

slots:
    -   name: default
        description: The form fields to arrange in a grid.
---

# Form grid

The form grid arranges fields in a configurable number of columns. It is useful when you want to display multiple inputs side by side, for example in dense forms or settings panels.

::: render
render=../../code/components/form/grid/preview.vue
:::

::: tip
This component is best used within a [Form](../form).
:::

<FrontmatterDocs/>

## Examples

::: example Three columns || A form grid with three columns for short related fields like an address.
example=../../code/components/form/grid/three-columns.vue
:::
