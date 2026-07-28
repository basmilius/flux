---
outline: deep

props:
    -   name: xs
        description: The column span on the xs breakpoint.
        type: number
        optional: true
        default: 12
        
    -   name: sm
        description: The column span on the sm breakpoint. Falls back to the xs value when omitted.
        type: number
        optional: true
        default: xs
        
    -   name: md
        description: The column span on the md breakpoint. Falls back to the sm value when omitted.
        type: number
        optional: true
        default: sm

    -   name: lg
        description: The column span on the lg breakpoint. Falls back to the md value when omitted.
        type: number
        optional: true
        default: md

    -   name: xl
        description: The column span on the xl breakpoint. Falls back to the lg value when omitted.
        type: number
        optional: true
        default: lg

    -   name: tag
        description: The HTML tag to use for the grid column.
        type: keyof HTMLElementTagNameMap
        optional: true
        default: div

slots:
    -   name: default
        description: The content of the grid item.
---

# Grid column

The grid column is used to arrange content within a grid layout. It defines how elements are positioned across the available columns, helping maintain clear alignment and consistent spacing. Using grid columns ensures that content stays organized and visually balanced across different screen sizes.

::: render
render=../../../code/components/layout/grid/column/preview.vue
:::

::: warning
This component only works properly inside a [Grid](../grid).
:::

::: tip
The breakpoints cascade upwards. A column only needs the breakpoints where its span changes: `md` falls back to `sm`, `sm` to `xs`, and `xs` to the full width of twelve columns.
:::

<FrontmatterDocs/>

## Examples

::: example Basic || A basic grid.
example=../../../code/components/layout/grid/column/basic.vue
:::

::: tip
The class `column-example` is used in the documentation to display the columns.
:::
