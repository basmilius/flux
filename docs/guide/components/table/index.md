---
outline: deep

props:
    -   name: caption-side
        description: The side where the caption should be placed.
        type: [ '"top"', '"bottom"' ]
        optional: true
        default: bottom

    -   name: fill-columns
        description: The number of columns that should be filled.
        type: number
        optional: true

    -   name: is-bordered
        description: If borders should be applied to all sides of the table.
        type: boolean
        optional: true
        default: true

    -   name: is-hoverable
        description: If each row should be highlighted on hover.
        type: boolean
        optional: true

    -   name: is-loading
        description: If the table is in a loading state.
        type: boolean
        optional: true

    -   name: is-separated
        description: If a border should be added between each row.
        type: boolean
        optional: true
        default: true

    -   name: is-striped
        description: If alternated colors should be added to each row.
        type: boolean
        optional: true

slots:
    -   name: default
        description: The slot for the table content.

    -   name: colgroups
        description: The slot for the colgroups.

    -   name: caption
        description: The slot for the table caption.

    -   name: footer
        description: The slot for the table footer.

    -   name: header
        description: The slot for the table headers.

    -   name: pagination
        description: The slot for pagination.
---

# Table

Tables are a popular and effective way to display information in a clear and concise manner. They offer a structured way to present data, making it easy for users to scan through and locate the information they need. By using rows and columns to organize information, tables provide a systematic approach to displaying data that can help users identify patterns and insights.

::: render
render=../../../code/guide/components/table/preview.vue
:::

<FrontmatterDocs/>

## Examples

::: example Basic || A basic table.
example=../../../code/guide/components/table/basic.vue
:::

::: example Pane || A table inside a pane.
example=../../../code/guide/components/table/pane.vue
:::

::: example Caption || A table with an caption.
example=../../../code/guide/components/table/caption.vue
:::

::: example Sticky || A table with sticky headers.
example=../../../code/guide/components/table/sticky.vue
:::

::: example Actions || A table with actions.
example=../../../code/guide/components/table/actions.vue
:::

::: example Loading || A table with a loading state.
example=../../../code/guide/components/table/loading.vue
:::

::: example Hoverable || A table with rows that have a hoverable state.
example=../../../code/guide/components/table/hoverable.vue
:::

## Used components

- [Pane](../pane)
    - [Body](../pane/body)
- [Spinner](../spinner)
- [Table](../table)
    - [Cell](../table/cell)
    - [Row](../table/row)
