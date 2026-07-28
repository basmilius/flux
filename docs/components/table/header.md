---
outline: deep

emits:
    -   name: resize
        description: Triggered when the column is resized through the resize handle, with the new width in pixels. Emits `null` when the width is reset. The header owns this event because the width belongs to the column the header defines, right next to the `width` prop that mirrors it.
        type: [ 'number | null' ]

    -   name: sort
        description: Triggered when the sorting type changes.
        type: [ 'ascending | descending | null' ]

props:
    -   name: align
        description: Horizontal alignment of the header content. Cells in the column without their own `align` inherit this value, so `align="end"` on the header aligns the whole column.
        type: [ '"start"', '"center"', '"end"' ]
        optional: true

    -   name: data-type
        description: The kind of data in the column. Switches the sort flyout icons to match. The options are alphabetical (`text`), numeric (`numeric`) or chronological (`date`). This only affects the sort flyout; pair it with `is-numeric` for tabular figures in the cells.
        type: [ '"text"', '"numeric"', '"date"' ]
        optional: true
        default: text

    -   name: is-numeric
        description: Renders every cell in the column with tabular figures. Column metadata only; the header label itself is unaffected.
        type: boolean
        optional: true

    -   name: is-resizable
        description: If the header renders a resize handle on its trailing edge. Dragging it, or resizing it with the keyboard, gives the column an explicit width; double-clicking the handle or pressing `Home` returns the column to its automatic width.
        type: boolean
        optional: true

    -   name: is-shrinking
        description: If the header will shrink to fit its cell group.
        type: boolean
        optional: true
        
    -   name: is-sortable
        description: If the table header will render a sorting flyout.
        type: boolean
        optional: true

    -   name: max-width
        description: The maximum width of the column in pixels. The column shrinks below this value when needed.
        type: number
        optional: true

    -   name: min-width
        description: The minimum width of the column in pixels. The column still grows to fill available space.
        type: number
        optional: true

    -   name: no-wrap
        description: Prevents the content of every cell in the column from wrapping. Column metadata only; the header label itself is unaffected.
        type: boolean
        optional: true

    -   name: pinned
        description: Pins the column while scrolling horizontally. Use `start` (or `true`) to pin it to the left edge and `end` to pin it to the right edge. Multiple leading or trailing columns can be pinned; they stack side by side. The cells in the column follow the header automatically.
        type: [ 'boolean', '"start"', '"end"' ]
        optional: true

    -   name: sort
        description: The current sorting that is applied to the header.
        type: [ '"ascending"', '"descending"' ]
        optional: true

    -   name: width
        description: Fixed column width in pixels. Takes precedence over `is-shrinking`, `min-width` and `max-width`.
        type: number
        optional: true

slots:
    -   name: default
        description: The content of the header.

requiredIcons:
    - arrow-down-1-9
    - arrow-down-a-z
    - arrow-down-short-wide
    - arrow-up-9-1
    - arrow-up-a-z
    - arrow-up-arrow-down
    - arrow-up-wide-short
    - circle-xmark
---

# Table header

The table header defines the label for a column within the table. It helps users understand the meaning of the data below it and provides structure and clarity to the table's content.

::: render
render=../../code/components/table/header/preview.vue
:::

::: warning
This component is best used within a [Table](../table).
:::

::: info Accessible sorting
When `is-sortable` is set, the sort trigger is reachable with the keyboard and opens the sort flyout like any other [Menu](../menu). Set `data-type` to `numeric` or `date` so the flyout shows ordering icons that match the column's data instead of the alphabetical default.
:::

::: info Column sizing
Headers define the width of their column. A column with `width` gets that exact width. A column with `is-shrinking` hugs its content. Otherwise the column shares the available space, optionally bounded by `min-width` and/or `max-width`. When the combined minimum widths exceed the table width, the table scrolls horizontally.
:::

::: info Resizable columns
`is-resizable` puts a resize handle on the trailing edge of the header. A column that has been resized behaves exactly like one with an explicit `width`, so the neighboring columns reflow around it and the table scrolls horizontally once the columns no longer fit.

The handle is a focusable separator, so resizing never needs a mouse: <kbd>Left</kbd> and <kbd>Right</kbd> resize by 12 pixels, hold <kbd>Shift</kbd> for 48, and <kbd>Home</kbd> resets the column. Double-clicking the handle resets it too. `min-width` and `max-width` bound every resize, with a floor of 48 pixels when no `min-width` is set.

Listen to `resize` to persist the width and bind it back through `width`; a width handed down that way replaces the dragged one. A `resize` event with `null` means the column went back to its automatic width, so the stored value can be dropped.
:::

::: info Column formatting
`align`, `is-numeric` and `no-wrap` on the header apply to every cell in the column, so there is no need to repeat them per cell. A cell's own `align` overrides the header's; `is-numeric` and `no-wrap` can only be turned on per cell, not off. Spanning cells (`colspan`) never inherit column formatting.
:::

<FrontmatterDocs/>

## Examples

::: example Basic || A basic table header.
example=../../code/components/table/header/basic.vue
:::

::: example Shrinking || A table header that shrinks to fit its cell group.
example=../../code/components/table/header/shrinking.vue
:::

::: example Sortable || A table header that can be sorted.
example=../../code/components/table/header/sortable.vue
:::

::: example Data type || Sortable headers whose flyout icons match the column's data type.
example=../../code/components/table/header/data-type.vue
:::

::: example Width || Columns with a fixed, minimum and maximum width.
example=../../code/components/table/header/width.vue
:::

::: example Resizable || Columns the user can resize, with the resulting width kept in the page.
example=../../code/components/table/header/resizable.vue
:::

## Used components

- [Flyout](../flyout)
- [Icon](../icon)
- [Separator](../separator)
- [Menu](../menu)
    - [Item](../menu/item)
    - [Group](../menu/group)
