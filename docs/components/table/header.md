---
outline: deep

emits:
    -   name: sort
        description: Triggered when the sorting type changes.
        type: [ 'ascending | descending | null' ]

props:
    -   name: align
        description: Horizontal alignment of the header content. Use `end` to match a numeric column.
        type: [ '"start"', '"center"', '"end"' ]
        optional: true

    -   name: data-type
        description: The kind of data in the column. Switches the sort flyout icons to match — alphabetical (`text`), numeric (`numeric`) or chronological (`date`).
        type: [ '"text"', '"numeric"', '"date"' ]
        optional: true
        default: text

    -   name: is-shrinking
        description: If the header will shrink to fit its cell group.
        type: boolean
        optional: true
        
    -   name: is-sortable
        description: If the table header will render a sorting flyout.
        type: boolean
        optional: true
        
    -   name: width
        description: The width of the column. Sits alongside flexible columns as a target width.
        type: number
        optional: true
        
    -   name: pinned
        description: Pins the header while scrolling horizontally. Use `start` (or `true`) to pin it to the left edge and `end` to pin it to the right edge. Multiple leading or trailing columns can be pinned; they stack side by side. Pin the same side on the matching cells.
        type: [ 'boolean', '"start"', '"end"' ]
        optional: true

    -   name: sort
        description: The current sorting that is applied to the header.
        type: [ '"ascending"', '"descending"' ]
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

The table header defines the label for a column within the table. It helps users understand the meaning of the data below it and provides structure and clarity to the table’s content.

::: render
render=../../code/components/table/header/preview.vue
:::

::: warning
This component is best used within a [Table](../table).
:::

::: info Accessible sorting
When `is-sortable` is set, the sort trigger is reachable with the keyboard and opens the sort flyout like any other [Menu](../menu). Set `data-type` to `numeric` or `date` so the flyout shows ordering icons that match the column's data instead of the alphabetical default.
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

::: example Width || A table header with a custom width.
example=../../code/components/table/header/width.vue
:::

## Used components

- [Flyout](../flyout)
- [Icon](../icon)
- [Separator](../separator)
- [Menu](../menu)
    - [Item](../menu/item)
    - [Group](../menu/group)
