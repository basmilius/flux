---
outline: deep

props:
    -   name: title
        description: The title of the metric widget.
        type: string

    -   name: value
        description: The primary value displayed in the metric widget.
        type: [ string, number ]
        optional: true

    -   name: change
        description: An optional change indicator shown in the footer area.
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

    -   name: label
        description: A secondary label shown above the value.
        type: string
        optional: true

slots:
    -   name: default
        description: Custom content rendered in the body of the widget, below the value.
---

# Metric

The metric widget is a larger statistics widget that displays a title, label, value, and an optional trend indicator. The default slot can be used to embed additional content such as a chart.

::: render
render=../../code/statistics/components/metric/preview.vue
:::

<FrontmatterDocs/>

## Used components

- [Change](./change)
