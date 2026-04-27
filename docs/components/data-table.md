---
outline: deep

emits:
    -   name: limit
        description: Triggered when the per-page limit is changed by the user.
        type: [ number ]

    -   name: navigate
        description: Triggered when the user navigates to a different page.
        type: [ number ]

props:
    -   name: items
        description: The data to show in the table. This should already be the current page's data — pagination is handled server-side. Pass the subset of items for the active page here.
        type: T[]

    -   name: fill-columns
        description: The number of columns to render placeholder cells for when the page has fewer items than `per-page`.
        type: number
        optional: true

    -   name: is-bordered
        description: Show borders between cells.
        type: boolean
        optional: true

    -   name: is-hoverable
        description: Enable a hover state for each row.
        type: boolean
        optional: true

    -   name: is-loading
        description: Show that the data table is loading.
        type: boolean
        optional: true

    -   name: is-separated
        description: Show borders between rows.
        type: boolean
        optional: true

    -   name: is-striped
        description: Show alternating backgrounds for each row.
        type: boolean
        optional: true

    -   name: limits
        description: The available options for the pagination limit.
        type: number[]

    -   name: page
        description: The currently active page, starting from 1. Used for slot bindings and the pagination bar display only — it does not slice the items array.
        type: number

    -   name: per-page
        description: The number of rows to show per page.
        type: number

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

    -   name: "[key: string]"
        description: A slot representing a cell for each visible row.
        type:
            index: number
            page: number
            per-page: number
            item: T
            items: T[]
            total: number

requiredIcons:
    - arrow-down-a-z
    - arrow-up-a-z
    - arrow-up-arrow-down
    - circle-xmark
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

## Used components

- [Table](./table)
    - [Actions](./table/actions)
    - [Column](./table/column)
    - [Header](./table/header)
    - [Row](./table/row)
