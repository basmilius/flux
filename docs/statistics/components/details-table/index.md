---
outline: deep

props:
    -   name: title
        description: The title shown above the rows.
        type: string

slots:
    -   name: default
        description: The rows of the details table.
---

# Details table

The details table displays a structured list of label–value pairs under a heading. It is suitable for summarizing the attributes or properties of an entity alongside a chart or metric.

::: render
render=../../../code/statistics/components/details-table/preview.vue
:::

::: info
The table is built from plain elements but exposes semantic ARIA table roles: the wrapper is a `table` labelled by its `title` (announced as the `caption`), and the rows are grouped in a `rowgroup` so assistive technologies present it as a real table.
:::

<FrontmatterDocs/>

## Examples

::: example Standalone || A details table used without a pane wrapper.
example=../../../code/statistics/components/details-table/standalone.vue
:::

## Used components

- [Row](./row)
