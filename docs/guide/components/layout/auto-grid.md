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

# Auto Grid

The AutoGrid component is a Vue component that automatically adjusts the width of its children to ensure they have a minimum width. It intelligently determines the number of columns that fit best within the parent container, making it easy to create responsive layouts that adapt to various screen sizes.

::: render
render=../../../code/guide/components/layout/auto-grid/preview.vue
:::

<FrontmatterDocs/>

## Examples
