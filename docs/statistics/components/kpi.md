---
outline: deep

props:
    -   name: title
        description: The title of the KPI widget.
        type: string

    -   name: value
        description: The primary value displayed in the KPI widget.
        type: [ string, number ]

    -   name: change
        description: An optional change indicator shown below the value.
        type: FluxStatisticsChange
        optional: true

    -   name: footer
        description: An optional footer text shown below the change indicator.
        type: string
        optional: true

    -   name: icon
        description: An icon shown in the header of the widget.
        type: FluxIconName
        optional: true
---

# KPI

The KPI (Key Performance Indicator) widget displays a single prominent metric alongside an optional trend indicator and footer. It is compact by default and well suited for use in a [Statistics grid](./grid).

::: render
render=../../code/statistics/components/kpi/preview.vue
:::

<FrontmatterDocs/>

## Used components

- [Change](./change)
