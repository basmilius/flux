---
outline: deep

emits:
    -   name: limit
        description: Triggered when the per-page limit is changed by the user.
        type: [ number ]

    -   name: navigate
        description: Triggered when the user navigates to a different page.
        type: [ number ]

    -   name: update:selected
        description: Triggered when the selection changes. The payload type matches `selection-mode` — a single id (or `null`) for `single`, an array of ids for `multiple`.
        type: [ "string | number | null | (string | number)[]" ]

    -   name: update:expanded
        description: Triggered when the set of expanded rows changes, with the array of expanded ids.
        type: [ "(string | number)[]" ]

    -   name: update:collapsed-groups
        description: Triggered when a group is collapsed or expanded, with the array of collapsed group ids.
        type: [ "(string | number)[]" ]

props:
    -   name: items
        description: The data to show in the table. This should already be the current page's data — pagination is handled server-side. Pass the subset of items for the active page here.
        type: T[]

    -   name: fill-columns
        description: The number of columns to render placeholder cells for when the page has fewer items than `per-page`.
        type: number
        optional: true

    -   name: group-by
        description: An accessor that returns the group id for each item. When set, rows are grouped and the `group` slot is rendered as the header for each group.
        type: "(item: T) => string | number"
        optional: true

    -   name: is-hoverable
        description: Enable a hover state for each row.
        type: boolean
        optional: true

    -   name: is-loading
        description: Show that the data table is loading.
        type: boolean
        optional: true

    -   name: is-sticky
        description: If the table headers stick to the top while scrolling.
        type: boolean
        optional: true
        default: false

    -   name: limits
        description: The available options for the pagination limit.
        type: number[]

    -   name: page
        description: The currently active page, starting from 1. Used for slot bindings and the pagination bar display only — it does not slice the items array.
        type: number

    -   name: per-page
        description: The number of rows to show per page.
        type: number

    -   name: expand-mode
        description: How expandable rows behave. Use `multiple` to allow several rows open at once, or `single` to keep only one open. Requires `unique-key` and the `expandable` slot.
        type: "'single' | 'multiple'"
        optional: true
        default: multiple

    -   name: selection-mode
        description: Enables row selection. Use `single` for at most one selected row, or `multiple` for an array of selected rows. Requires `unique-key` to be set.
        type: "'single' | 'multiple'"
        optional: true

    -   name: total
        description: The total number of items in the data set.
        type: number

    -   name: unique-key
        description: The unique key for each row.
        type: string
        optional: true

slots:
    -   name: colgroups
        description: A slot to render `<colgroup>` elements that control column sizing.

    -   name: filter
        description: Renders above the table header — typically a `FluxFilterBar` for filtering the data set.
        type:
            page: number
            per-page: number
            items: T[]
            total: number

    -   name: footer
        description: The footer of the data table.
        type:
            page: number
            per-page: number
            items: T[]
            total: number

    -   name: header
        description: The header of the data table.
        type:
            page: number
            per-page: number
            items: T[]
            total: number

    -   name: pagination
        description: Replaces the default pagination bar — useful when you want to render a custom paginator.
        type:
            page: number
            per-page: number
            items: T[]
            total: number

    -   name: expandable
        description: When provided, each row gets an expand toggle and this slot renders the expanded detail content spanning the full table width. Requires `unique-key`.
        type:
            index: number
            item: T
            is-expanded: boolean
            toggle: () => void

    -   name: group
        description: Renders the header row for each group. Only used when `group-by` is set — render a `FluxTableGroup` here, wiring `is-expanded` and `toggle` to make the group collapsible.
        type:
            id: string | number
            index: number
            items: T[]
            is-expanded: boolean
            toggle: () => void

    -   name: "[key: string]"
        description: A slot representing a cell for each visible row.
        type:
            index: number
            page: number
            per-page: number
            item: T
            items: T[]
            total: number
            is-selected: boolean

requiredIcons:
    - arrow-down-a-z
    - arrow-up-a-z
    - arrow-up-arrow-down
    - check
    - chevron-right
    - circle-xmark
    - minus
---

# Data table

Data tables are a powerful tool for organizing and presenting large sets of data in a structured and easy-to-read format. Like traditional tables, data tables use rows and columns to organize data, but they also offer additional functionality and features that are specifically designed for working with large datasets.

One of the key benefits of using data tables is their ability to handle large amounts of data, making them an ideal choice for applications that require data visualization and analysis. Data tables often include advanced sorting and filtering capabilities, allowing users to quickly search and analyze data based on specific criteria.

::: render
render=../code/components/data-table/preview.vue
:::

<FrontmatterDocs/>

::: info Server-side pagination
The data table does **not** paginate `items` internally. The `items` prop should contain only the rows for the currently active page, fetched from your server or API. The `page` and `per-page` props are used to drive the pagination bar and are exposed through slot bindings so you can display them, but the component never slices or filters the `items` array itself.
:::

## Examples

::: example File manager || A data table that is used for file management.
example=../code/components/data-table/file-manager.vue
:::

::: example Paginated || A data table that is split into pages.
example=../code/components/data-table/paginated.vue
:::

::: example Selectable rows || A data table where multiple rows can be selected via checkboxes.
example=../code/components/data-table/selection.vue
:::

::: example Expandable rows || A data table where each row can be expanded to reveal detail content.
example=../code/components/data-table/expandable.vue
:::

::: example Grouped rows || A data table whose rows are grouped under collapsible headers.
example=../code/components/data-table/grouped.vue
:::

::: example Static groups || A data table whose rows are grouped under plain, non-collapsible headers.
example=../code/components/data-table/grouped-static.vue
:::

## Used components

- [Table](./table)
    - [Actions](./table/actions)
    - [Cell](./table/cell)
    - [Group](./table/group)
    - [Header](./table/header)
    - [Row](./table/row)
