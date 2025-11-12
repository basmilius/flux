---
outline: deep

props:
    -   name: xs
        description: The column span on the xs breakpoint.
        type: number
        optional: true
        default: 12
        
    -   name: sm
        description: The column span on the sm breakpoint.
        type: number
        optional: true
        default: 12
        
    -   name: md
        description: The column span on the md breakpoint.
        type: number
        optional: true
        default: 12

    -   name: lg
        description: The column span on the lg breakpoint.
        type: number
        optional: true
        default: 12

    -   name: xl
        description: The column span on the xl breakpoint.
        type: number
        optional: true
        default: 12

slots:
    -   name: default
        description: The content of the grid item.
---

# Grid column

The grid column is used to arrange content within a grid layout. It defines how elements are positioned across the available columns, helping maintain clear alignment and consistent spacing. Using grid columns ensures that content stays organized and visually balanced across different screen sizes.

::: render
render=../../../../code/guide/components/layout/grid/column/preview.vue
:::

::: warning
This component only works properly inside [Grid](../grid) or [Auto grid](./auto).
:::

<FrontmatterDocs/>

## Examples

::: example Basic || A basic grid.
example=../../../../code/guide/components/layout/grid/column/basic.vue
:::

::: tip
The class `column-example` is used in the documentation to display the columns.
:::
