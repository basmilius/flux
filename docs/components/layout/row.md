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
        description: The content that should be stacked horizontally.
---

# Row

A row component arranges its children horizontally with a configurable gap between them. Use it for simple horizontal layouts where only the spacing needs to be controlled.

::: render
render=../../code/components/layout/row/preview.vue
:::

<FrontmatterDocs/>

## Examples

::: tip
The class `column-example` is used in the documentation to display the items.
:::

::: example Basic || A basic row.
example=../../code/components/layout/row/basic.vue
:::
