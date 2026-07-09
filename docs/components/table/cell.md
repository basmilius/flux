---
outline: deep

props:
    -   name: align
        description: Horizontal alignment of the cell content. Use `end` for numeric columns. When unset, the cell inherits the `align` of its column's header.
        type: [ '"start"', '"center"', '"end"' ]
        optional: true

    -   name: colspan
        description: Number of columns the cell spans. A spanning cell does not derive formatting or pinning from a column.
        type: number
        optional: true

    -   name: content-direction
        description: The direction of the content.
        type: [ '"column"', '"row"' ]
        optional: true
        default: row

    -   name: content-gap
        description: The gap between items inside the cell content (in pixels).
        type: number
        optional: true

    -   name: is-numeric
        description: Renders the cell content with tabular (monospaced) figures. Use for numeric columns so digits align vertically. Combine with `align` set to `end` for right-aligned numbers. Also inherited from the column's header, which is preferred for whole columns.
        type: boolean
        optional: true

    -   name: no-wrap
        description: Keeps the cell content on a single line. Useful for cells in an `is-shrinking` column whose value would otherwise wrap. Also inherited from the column's header, which is preferred for whole columns.
        type: boolean
        optional: true

    -   name: pinned
        description: Overrides the pinning of the cell. By default the cell follows the `pinned` prop of its column's header, so this is only needed for spanning cells or when the table has no headers. Spanning cells (`colspan`) never derive pinning from their column.
        type: [ 'boolean', '"start"', '"end"' ]
        optional: true

    -   name: rowspan
        description: Number of rows the cell spans. Omit the covered cells in the following rows, like a spanning `<td rowspan>`. Not supported in tables with clickable rows, whose focusable row keeps a single-row box. Cells in the rows below a rowspan may not resolve their column's formatting or pinning; set `align` or `pinned` on them explicitly when needed.
        type: number
        optional: true

slots:
    -   name: default
        description: The slot for the cell content.

    -   name: content
        description: The slot for the cell content, use this one when you want to customize the cell design.
---

# Table cell

The table cell represents a single cell within the table. It holds individual pieces of data, ensuring information is displayed clearly and consistently across the table's layout.

::: render
render=../../code/components/table/cell/preview.vue
:::

::: warning
This component is best used within a [Row](../table/row).
:::

::: info Column formatting
`align`, `is-numeric` and `no-wrap` set on the column's [Header](./header) apply to every cell in that column. A cell's own `align` overrides the inherited value. Spanning cells (`colspan`) never inherit column formatting, and cells in the rows below a `rowspan` may resolve the wrong column, so set their formatting explicitly when it matters.
:::

<FrontmatterDocs/>

## Examples

::: example Basic || A basic table cell.
example=../../code/components/table/cell/basic.vue
:::

::: example Column || A column table cell.
example=../../code/components/table/cell/column.vue
:::

::: example Custom || A table cell with a custom design.
example=../../code/components/table/cell/content.vue
:::

::: example Pinned || A headerless table whose first and last cells pin themselves through the `pinned` override.
example=../../code/components/table/cell/pinned.vue
:::
