---
outline: deep

emits:
    -   name: row-click
        description: Triggered when the row is activated by a click, or by pressing `Enter`/`Space` while the row is focused. Clicks and key presses that originate from an interactive element within the row (buttons, links, inputs) are ignored. The first argument is the index of the clicked cell (`cellIndex` of the `<td>`), or `-1` when the row is activated by keyboard.
        type: [ number, MouseEvent ]

props:
    -   name: is-clickable
        description: Makes the row interactive by showing a pointer cursor and making it focusable so it can be activated with `Enter`/`Space`. Pair it with a `row-click` listener.
        type: boolean
        optional: true

    -   name: is-selected
        description: Marks the row as selected, applying the selected styling.
        type: boolean
        optional: true

slots:
    -   name: default
        description: The content of the table row.
---

# Table row

The table row groups multiple cells together to form a single row of data. It organizes related information into a horizontal sequence, making it easy to scan and compare values across columns.

::: render
render=../../code/components/table/row/preview.vue
:::

::: warning
This component is best used within a [Table](../table).
:::

<FrontmatterDocs/>

## Examples

::: example Basic || A basic table row.
example=../../code/components/table/row/basic.vue
:::

::: example Clickable || A clickable row that emits `row-click`, while ignoring clicks on the button inside a cell.
example=../../code/components/table/row/clickable.vue
:::
