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

## Examples

::: example Simple || A metric widget without any content in the default slot.
example=../../code/statistics/components/metric/simple.vue
:::

::: example With a breakdown || A metric widget using the default slot to display a breakdown of values.
example=../../code/statistics/components/metric/with-sparkline.vue
:::

::: example With a meter || A metric widget embedding a blocks meter in the default slot.
example=../../code/statistics/components/metric/with-meter.vue
:::

## Used components

- [Change](./change)
