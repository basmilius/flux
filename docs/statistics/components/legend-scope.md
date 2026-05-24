---
outline: deep

slots:
    -   name: default
        description: The components that should share a single legend context.
---

# Legend scope

The legend scope is a renderless wrapper that provides a shared chart legend context to its children. It lets you pair any chart or statistics component with a `FluxStatisticsLegend` outside of a `FluxStatisticsChartPane`, while still benefiting from bidirectional hover synchronization between the data visualization and its legend.

`FluxStatisticsChartPane` uses this wrapper internally, so any direct usage of the scope mirrors the same behavior.

::: render
render=../../code/statistics/components/legend-scope/preview.vue
:::

<FrontmatterDocs/>

## Examples

::: example With a donut chart || A donut chart paired with a statistics legend in a custom layout, sharing hover state through the scope.
example=../../code/statistics/components/legend-scope/with-donut.vue
:::

::: example With a pie chart || A pie chart with icons paired with a statistics legend outside of a chart pane.
example=../../code/statistics/components/legend-scope/with-pie.vue
:::

## Used components

- [Charts](./charts/)
- [Legend](./legend/)
- [Percentage bar](./percentage-bar)
