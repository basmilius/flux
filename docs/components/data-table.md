---
outline: deep

emits:
    -   name: limit
        description: Triggered when the per-page limit is changed by the user.
        type: [ number ]

    -   name: navigate
        description: Triggered when the user navigates to a different page.
        type: [ number ]

    -   name: row-click
        description: Triggered when a row is activated by a click, or by pressing `Enter`/`Space` while the row is focused, with the row's item, the index of the clicked column and the original event. Activations from interactive elements within the row (buttons, links, inputs) are ignored. Not triggered when `selection-mode` is set, since there the row activation toggles the selection instead. The column index is the raw cell index (the selection and expand cells are counted), or `-1` when the row is activated by keyboard.
        type: [ "T", "number", "MouseEvent" ]

    -   name: update:selected
        description: Triggered when the selection changes. The payload type matches `selection-mode`, so it is a single id (or `null`) for `single` and an array of ids for `multiple`.
        type: [ "string | number | null | (string | number)[]" ]

    -   name: update:expanded
        description: Triggered when the set of expanded rows changes, with the array of expanded ids.
        type: [ "(string | number)[]" ]

    -   name: update:collapsed-groups
        description: Triggered when a group is collapsed or expanded, with the array of collapsed group ids.
        type: [ "(string | number)[]" ]

props:
    -   name: items
        description: The data to show in the table. This should already be the current page's data. Pagination is handled server-side. Pass the subset of items for the active page here.
        type: T[]

    -   name: is-filled
        description: Renders a filler row that stretches to the bottom of the table when the page has fewer items than `per-page`.
        type: boolean
        optional: true
        default: false

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
        description: If the table header, including the filter bar, sticks to the top while scrolling.
        type: boolean
        optional: true
        default: false

    -   name: limits
        description: The available options for the pagination limit.
        type: number[]

    -   name: page
        description: The currently active page, starting from 1. Used for slot bindings and the pagination bar display only; it does not slice the items array.
        type: number

    -   name: per-page
        description: The number of rows to show per page.
        type: number

    -   name: expand-mode
        description: How expandable rows behave. Use `multiple` to allow several rows open at once, or `single` to keep only one open. Requires `unique-key` and the `expandable` slot.
        type: "'single' | 'multiple'"
        optional: true
        default: multiple

    -   name: can-expand
        description: A predicate that decides whether a row shows its expand toggle. Return `false` to hide the toggle for rows without detail content. Requires the `expandable` slot.
        type: "(item: T) => boolean"
        optional: true

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
    -   name: empty
        description: Renders in place of the rows when there is no data and the table is not loading. Defaults to a centered message.

    -   name: loading
        description: Replaces the default spinner overlay while `is-loading` is set. Renders inside the table body on the table's column grid, typically with skeleton rows. Use `per-page` to render the expected number of rows. The regular rows are not rendered while this slot shows.
        type:
            page: number
            per-page: number
            total: number

    -   name: selection
        description: Renders as a full-width bar in place of the `filter` row while at least one row is selected, typically with the selection count and bulk actions. Requires `selection-mode`.
        type:
            selected: (string | number)[]
            count: number
            clear: () => void

    -   name: filter
        description: Renders above the table header, typically a `FluxFilterBar` for filtering the data set.
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
        description: Replaces the default pagination bar, useful when you want to render a custom paginator.
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
        description: Renders the header row for each group. Only used when `group-by` is set. Render a `FluxTableGroup` here, wiring `is-expanded` and `toggle` to make the group collapsible.
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
    - angle-right
    - arrow-down-1-9
    - arrow-down-a-z
    - arrow-down-short-wide
    - arrow-up-9-1
    - arrow-up-a-z
    - arrow-up-arrow-down
    - arrow-up-wide-short
    - check
    - circle-xmark
    - minus
---

# Data table

The data table organizes large sets of data into rows and columns, layering sorting, filtering, pagination, selection, grouping and expandable rows on top of a plain [Table](./table). It is built for server-driven data, so you feed it one page of rows at a time.

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

::: example Custom pagination || A data table whose `pagination` slot renders a compact pager instead of the default bar.
example=../code/components/data-table/pagination-slot.vue
:::

::: example Clickable rows || A data table that emits `row-click` per row, while ignoring clicks on the action button inside a cell. Focused rows can be walked with the arrow keys and activated with `Enter`/`Space`.
example=../code/components/data-table/clickable.vue
:::

::: example Selectable rows || A data table where multiple rows can be selected via checkboxes.
example=../code/components/data-table/selection.vue
:::

::: example Single selection || A data table where at most one row can be selected.
example=../code/components/data-table/selection-single.vue
:::

::: example Selection toolbar || A bar with bulk actions that takes the place of the filter bar while rows are selected.
example=../code/components/data-table/selection-toolbar.vue
:::

::: example Sortable columns || A data table whose columns drive a single, coordinated client-side sort.
example=../code/components/data-table/sortable.vue
:::

::: example Filtering and search || A data table with a filter bar, client-side filtering, pagination and selection.
example=../code/components/data-table/filterable.vue
:::

::: example Rich cells and row actions || A data table with avatars, badges, progress bars and a per-row actions menu.
example=../code/components/data-table/rich.vue
:::

::: example Expandable rows || A data table where each row can be expanded to reveal detail content.
example=../code/components/data-table/expandable.vue
:::

::: example Single expansion || A data table where opening a row collapses the previously opened one.
example=../code/components/data-table/expand-single.vue
:::

::: example Conditional expansion || A data table where only rows with detail content show an expand toggle.
example=../code/components/data-table/expand-conditional.vue
:::

::: example Grouped rows || A data table whose rows are grouped under collapsible headers.
example=../code/components/data-table/grouped.vue
:::

::: example Static groups || A data table whose rows are grouped under plain, non-collapsible headers.
example=../code/components/data-table/grouped-static.vue
:::

::: example Wide table || A wide data table with multiple pinned columns on the left and right edges.
example=../code/components/data-table/wide.vue
:::

::: example Pinned with selection || A data table where pinning the first column keeps the selection column pinned alongside it.
example=../code/components/data-table/pinned.vue
:::

::: example Column sizing || Headers mixing a fixed width, a min/max range and a shrinking column.
example=../code/components/data-table/column-sizing.vue
:::

::: example Numeric columns || Right-aligned numeric columns with sortable numeric and date headers.
example=../code/components/data-table/numeric.vue
:::

::: example Summary footer || A footer row that sums the page across spanning cells.
example=../code/components/data-table/footer.vue
:::

::: example Fixed-width columns || A weekly timesheet with fixed-width day columns and a total.
example=../code/components/data-table/timesheet.vue
:::

::: example Stacked cells || Cells that stack a primary and secondary line of content.
example=../code/components/data-table/stacked.vue
:::

::: example Wrapping content || A wrapping subject column whose meta columns stay on a single line.
example=../code/components/data-table/wrapping.vue
:::

::: example Consistent height || A partial page that keeps a fixed height with filler rows.
example=../code/components/data-table/fill.vue
:::

::: example Sticky header || A long list whose header and bar stick while scrolling.
example=../code/components/data-table/sticky.vue
:::

::: example Sticky groups || Grouped rows whose header sticks while scrolling through the groups.
example=../code/components/data-table/sticky-groups.vue
:::

::: example Skeleton loading || A data table whose `loading` slot replaces the spinner with skeleton rows.
example=../code/components/data-table/skeleton.vue
:::

::: example Empty || A data table that shows a custom message when there is no data.
example=../code/components/data-table/empty.vue
:::

## Used components

- [Table](./table)
    - [Actions](./table/actions)
    - [Cell](./table/cell)
    - [Group](./table/group)
    - [Header](./table/header)
    - [Row](./table/row)
