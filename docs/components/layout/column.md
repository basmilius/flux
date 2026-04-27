---
outline: deep

props:
    -   name: gap
        description: The gap between each element.
        type: number
        optional: true
        default: 18

slots:
    -   name: default
        description: The content that should be stacked vertically.
---

# Column

A column component arranges its children vertically with a configurable gap between them. Use it for simple vertical layouts where only the spacing needs to be controlled.

::: render
render=../../code/components/layout/column/preview.vue
:::

<FrontmatterDocs/>

## Examples

::: tip
The class `column-example` is used in the documentation to display the items.
:::

::: example Basic || A basic column.
example=../../code/components/layout/column/basic.vue
:::
