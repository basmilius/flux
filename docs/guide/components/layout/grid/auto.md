---
outline: deep

props:
    -   name: gap
        description: The gap between each column.
        type: number
        optional: true
        default: 30

    -   name: min-column-width
        description: The minimum width of each column.
        type: number
        optional: true

slots:
    -   name: default
        description: The content to be displayed in the grid.
---

# Auto grid

The Auto grid component is a Vue component that automatically adjusts the width of its children to ensure they have a minimum width. It intelligently determines the number of columns that fit best within the parent container, making it easy to create responsive layouts that adapt to various screen sizes.

::: render
render=../../../../code/guide/components/layout/grid/auto/preview.vue
:::

<FrontmatterDocs/>

## Examples

::: example Basic || A basic auto grid.
example=../../../../code/guide/components/layout/grid/auto/basic.vue
:::

::: tip
The class `column-example` is used in the documentation to display the columns.
:::
