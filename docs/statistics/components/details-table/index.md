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

<FrontmatterDocs/>

## Used components

- [Row](./row)
