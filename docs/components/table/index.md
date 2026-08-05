---
outline: deep

props:
    -   name: aria-rowcount
        description: The total number of rows, including rows that are not rendered. Useful when the table is virtualized or paginated.
        type: number
        optional: true

    -   name: caption-side
        description: The side where the caption should be placed.
        type: [ '"top"', '"bottom"' ]
        optional: true
        default: bottom

    -   name: is-cell-selectable
        description: Enables spreadsheet-style cell selection over the table body, so a rectangle of cells can be dragged with the pointer or walked with the arrow keys and copied as a grid. The table becomes a `grid` for assistive technology and its own tab stop. Cannot be combined with clickable rows, which claim the same keys.
        type: boolean
        optional: true
        default: false

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
While `is-loading` is set the table exposes `aria-busy` on the table element, so assistive technologies announce that the data is updating.
:::

## Copying data

The table is a CSS grid rather than a `<table>`, and a browser copying a grid of
elements hands over one line per cell with nothing marking where a row ends. The
table therefore writes the clipboard itself, tab-separated for a spreadsheet and
as real table markup for anything that reads HTML. What it copies follows how far
the selection reaches:

- **Across several rows** it copies those rows whole, with the column headers in
  front of them. A drag ends halfway through its first and last row, which would
  otherwise copy those two short of the rows in between.
- **Within one row** it copies the cells that were dragged over, without headers.
- **Within one cell** it stays out of the way, so dragging over a few words still
  copies those words.

Two attributes steer what ends up on the clipboard, and both work on any element
inside the table:

- `data-flux-copy-value` states the value a cell copies instead of the text it
  renders. [Cell](./cell) takes it as the `copy-value` prop.
- `data-flux-copy="none"` leaves something out. On a row or a cell it drops that
  row or cell entirely; inside a cell it only drops that subtree's text, so the
  cell still copies as an empty column and the columns stay aligned.

The table bar, the filler row and the sort and resize controls carry it already,
as do the selection and expand columns of the [Data table](../data-table).

::: tip Copying without a selection
The table instance exposes `copy(rows?)`, which writes the rows passed to it to
the clipboard. Called without arguments it copies the current cell selection when
there is one, and the whole table when there is not. The data table builds its
selection bar's `copy()` on top of it.
:::

## Cell selection

`is-cell-selectable` turns the body into a grid of selectable cells, the way a
spreadsheet behaves: drag a rectangle with the pointer, shift-click to extend it,
or walk it with the keyboard. The block is outlined as a whole, with the active
cell held a shade darker inside it.

The column headers are part of the grid, so clicking one selects that whole
column, header included, and shift-clicking a second extends it to a range of
columns. The sort button and the resize grip keep their own behavior.

Copying a rectangle hands over exactly that rectangle, so it pastes into a
spreadsheet in the shape it was selected. `Ctrl`/`Cmd` + `C` does it, and so does
the table instance's `copy()` when called without arguments, which is what a copy
button of your own would reach for. A rectangle taken from the body brings the
headers of the columns it covers along, unless it already holds them or stays
within a single row.

The table itself becomes the tab stop and names the active cell through
`aria-activedescendant`, which keeps a table of a thousand cells to one focusable
element. It reports itself as a `grid` while the mode is on, and its cells as
`gridcell`.

| Key | Does |
| --- | --- |
| `Arrow` keys | Move the active cell |
| `Shift` + arrow | Extend the rectangle |
| `Home` / `End` | First or last cell of the row |
| `Ctrl`/`Cmd` + `Home` / `End` | First or last cell of the table |
| `Ctrl`/`Cmd` + `A` | Select every cell |
| `Ctrl`/`Cmd` + `C` | Copy the rectangle |
| `Escape` | Clear the selection |

`Ctrl`/`Cmd` + `A` and `Ctrl`/`Cmd` + `Home` reach the header row too, since it is
row one of the grid. Tabbing in lands on the first data cell rather than a header.

The selection is also cleared by clicking outside the table, and by the instance's
`clearSelection()`. A copy button of your own placed outside the table still works:
the click is handled before the selection is dropped.

::: warning Not alongside clickable rows
Clickable rows own the roving tabindex, `Enter`, `Space` and the arrow keys, so
they cannot share a table with cell selection. On `FluxDataTable` that means no
`selection-mode` and no `row-click` listener; passing `is-cell-selectable`
anyway logs a warning and leaves the mode off. Selecting text inside the table is
off while the mode is on, since a text range and a cell rectangle would fight
over the same drag.
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

::: example Pinned columns || A wide table with multiple columns pinned to the left and right edges, and a footer built from spanning cells.
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

::: example Cell selection || A table whose cells are selected as a rectangle and copied as a grid, with the amounts pasting as their raw values.
example=../../code/components/table/cell-selection.vue
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
