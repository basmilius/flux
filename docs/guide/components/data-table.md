---
outline: deep

props:
    -   name: data-set
        description: The data to show in the table.
        type: T[]

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

    -   name: page
        description: The page that is currently shown, starting from 1.
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
    -   name: footer
        description: The footer of the data table.
        type:
            page: number
            per-page: number
            rows: T[]
            total: number

    -   name: header
        description: The header of the data table.
        type:
            page: number
            per-page: number
            rows: T[]
            total: number

    -   name: "[key: string]"
        description: A slot representing a cell for each visible row.
        type:
            index: number
            page: number
            per-page: number
            row: T
            rows: T[]
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
render=../../code/guide/components/data-table/preview.vue
:::

<FrontmatterDocs/>

## Examples

::: example File manager || A data table that is used for file management.
example=../../code/guide/components/data-table/file-manager.vue
:::

::: example Paginated || A data table that is split into pages.
example=../../code/guide/components/data-table/paginated.vue
:::

## Used components

- [Table](./table)
    - [Actions](./table/actions)
    - [Column](./table/column)
    - [Header](./table/header)
    - [Row](./table/row)
