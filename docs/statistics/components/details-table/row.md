---
outline: deep

props:
    -   name: label
        description: The label of the row.
        type: string

    -   name: value
        description: The value of the row.
        type: string
---

# Details table row

A single row in a [Details table](./index), displaying a label and its corresponding value.

::: render
render=../../../code/statistics/components/details-table/row/preview.vue
:::

::: tip
This component is best used within a [Details table](./index).
:::

::: info
The row exposes the ARIA `row` role; its label is a `rowheader` and its value is a `cell`, so the pair is announced as a labelled table row.
:::

<FrontmatterDocs/>

## Snippet

::: code-group

<<< @/code/statistics/components/details-table/row/preview.vue [FluxStatisticsDetailsTableRow.vue]

:::
