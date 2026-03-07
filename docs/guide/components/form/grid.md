---
outline: deep

props:
    -   name: columns
        description: The number of columns in the grid.
        type: number
        optional: true

slots:
    -   name: default
        description: The form fields to arrange in a grid.
---

# Form grid

The form grid arranges fields in a configurable number of columns. It is useful when you want to display multiple inputs side by side, for example in dense forms or settings panels.

::: render
render=../../../code/guide/components/form/grid/preview.vue
:::

::: tip
This component is best used within a [Form](../form).
:::

<FrontmatterDocs/>
