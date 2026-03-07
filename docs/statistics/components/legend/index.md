---
outline: deep

slots:
    -   name: default
        description: The legend items.
---

# Legend

The statistics legend groups [Legend items](./item) together, providing a visual key that maps colors or icons to the data series displayed in a chart.

::: render
render=../../../code/statistics/components/legend/preview.vue
:::

::: tip
This component is best used within a [Chart pane](../chart-pane) via the `legend` slot.
:::

<FrontmatterDocs/>

## Examples

::: example Basic || A legend with two series using a color swatch.
example=../../../code/statistics/components/legend/basic.vue
:::

::: example With values || Legend items that include a percentage value alongside the label.
example=../../../code/statistics/components/legend/with-values.vue
:::

## Used components

- [Item](./item)
