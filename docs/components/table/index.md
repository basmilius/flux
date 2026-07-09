---
outline: deep

props:
    -   name: caption-side
        description: The side where the caption should be placed.
        type: [ '"top"', '"bottom"' ]
        optional: true
        default: bottom

    -   name: is-filled
        description: Renders a filler row that stretches to the bottom of the table, so the column dividers reach the bottom on full-height tables.
        type: boolean
        optional: true
        default: false

    -   name: is-hoverable
        description: If each row should be highlighted on hover.
        type: boolean
        optional: true

    -   name: is-loading
        description: If the table is in a loading state.
        type: boolean
        optional: true

    -   name: is-sticky
        description: If the table header, including a table bar in the header, sticks to the top while scrolling.
        type: boolean
        optional: true
        default: false

slots:
    -   name: default
        description: The slot for the table content.

    -   name: caption
        description: The slot for the table caption.

    -   name: empty
        description: Renders a full-width row that stretches to the remaining height of the table, typically for an empty state. The content is vertically centered.

    -   name: footer
        description: The slot for the table footer.

    -   name: header
        description: The slot for the table headers.

    -   name: loading
        description: Replaces the default spinner overlay while `is-loading` is set. Renders inside the table body on the table's column grid, so skeleton rows built from `FluxTableRow` and `FluxTableCell` align with the columns. The regular rows are not rendered while this slot shows.

    -   name: pagination
        description: The slot for pagination.
---

# Table

The table presents data in rows and columns, giving users a structured way to scan and compare information. It is the low-level building block behind the [Data table](../data-table) and can be composed by hand for full control over headers, cells, groups and rows.

::: render
render=../../code/components/table/preview.vue
:::

::: info Accessible loading
While `is-loading` is set the table exposes `aria-busy` on the underlying `<table>`, so assistive technologies announce that the data is updating.
:::

<FrontmatterDocs/>

## Examples

::: example Basic || A basic table.
example=../../code/components/table/basic.vue
:::

::: example Pane || A table inside a pane.
example=../../code/components/table/pane.vue
:::

::: example Caption || A table with an caption.
example=../../code/components/table/caption.vue
:::

::: example Caption on top || A table whose caption renders above the table instead of below it.
example=../../code/components/table/caption-top.vue
:::

::: example Sticky || A table with sticky headers.
example=../../code/components/table/sticky.vue
:::

::: example Sticky with bar || A table where the bar and headers stick together.
example=../../code/components/table/sticky-bar.vue
:::

::: example Pinned columns || A wide table with multiple columns pinned to the left and right edges.
example=../../code/components/table/pinned-columns.vue
:::

::: example Column sizing || Columns mixing a fixed width, a min/max range and a shrinking column.
example=../../code/components/table/column-sizing.vue
:::

::: example Numeric alignment || Right-aligned numeric columns with sortable numeric headers.
example=../../code/components/table/numeric.vue
:::

::: example Spanning cells || Section rows whose single cell spans every column.
example=../../code/components/table/spanning.vue
:::

::: example Spanning rows || A first column whose cell spans every row of its track through `rowspan`.
example=../../code/components/table/rowspan.vue
:::

::: example Footer totals || Line items with a footer that sums the amounts across spanning cells.
example=../../code/components/table/invoice.vue
:::

::: example Grouped rows || Rows organized under collapsible groups.
example=../../code/components/table/groups.vue
:::

::: example Sticky groups || Collapsible groups whose column header sticks while scrolling.
example=../../code/components/table/sticky-groups.vue
:::

::: example Stacked content || Cells that stack a primary and secondary line of content.
example=../../code/components/table/stacked.vue
:::

::: example Wrapping rows || A wrapping column whose siblings stay aligned and on a single line.
example=../../code/components/table/wrapping.vue
:::

::: example Consistent height || A short table that keeps a fixed height with filler rows.
example=../../code/components/table/fill.vue
:::

::: example Actions || A table with actions.
example=../../code/components/table/actions.vue
:::

::: example Loading || A table with a loading state.
example=../../code/components/table/loading.vue
:::

::: example Skeleton loading || A table whose `loading` slot replaces the spinner with skeleton rows.
example=../../code/components/table/loading-skeleton.vue
:::

::: example Hoverable || A table with rows that have a hoverable state.
example=../../code/components/table/hoverable.vue
:::

## Used components

- [Pane](../pane)
    - [Body](../pane/body)
- [Spinner](../spinner)
- [Table](../table)
    - [Cell](../table/cell)
    - [Row](../table/row)
