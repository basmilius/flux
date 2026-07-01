---
outline: deep

props:
    -   name: align
        description: Horizontal alignment of the cell content. Use `end` for numeric columns.
        type: [ '"start"', '"center"', '"end"' ]
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
        description: Renders the cell content with tabular (monospaced) figures. Use for numeric columns so digits align vertically. Combine with `align` set to `end` for right-aligned numbers.
        type: boolean
        optional: true

    -   name: no-wrap
        description: Keeps the cell content on a single line. Useful for cells in an `is-shrinking` column whose value would otherwise wrap.
        type: boolean
        optional: true

    -   name: pinned
        description: Pins the cell while scrolling horizontally. Use `start` (or `true`) to pin it to the left edge and `end` to pin it to the right edge. Multiple leading or trailing columns can be pinned; they stack side by side. Pin the same side on the matching header.
        type: [ 'boolean', '"start"', '"end"' ]
        optional: true

slots:
    -   name: default
        description: The slot for the cell content.

    -   name: content
        description: The slot for the cell content, use this one when you want to customize the cell design.
---

# Table cell

The table cell represents a single cell within the table. It holds individual pieces of data, ensuring information is displayed clearly and consistently across the table’s layout.

::: render
render=../../code/components/table/cell/preview.vue
:::

::: warning
This component is best used within a [Row](../table/row).
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
