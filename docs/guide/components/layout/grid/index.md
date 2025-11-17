---
outline: deep

props:
    -   name: columns
        description: The amount of columns the grid has.
        type: number
        optional: true
        default: 12

    -   name: gap
        description: The gap between columns.
        type: number
        optional: true
        default: 30

slots:
    -   name: default
        description: The content of the grid.
---

# Grid

Our grid component is a powerful tool for creating responsive layouts that adapt to any screen size. With 12 equal-width columns, it provides maximum flexibility for building complex page designs. You can combine and rearrange the columns to create custom layouts that suit your specific needs.

::: render
render=../../../../code/guide/components/layout/grid/preview.vue
:::

<FrontmatterDocs/>

## Examples

::: example Basic || A basic grid.
example=../../../../code/guide/components/layout/grid/basic.vue
:::

::: tip
The class `column-example` is used in the documentation to display the columns.
:::
