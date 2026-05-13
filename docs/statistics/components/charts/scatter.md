---
outline: deep

props:
    -   name: series
        description: The data series for the chart, compatible with the ECharts series format.
        type: EChartsOption['series']

    -   name: aspect-ratio
        description: The aspect ratio of the chart.
        type: number
        optional: true

    -   name: options
        description: Additional ECharts options to merge with the defaults.
        type: EChartsOption
        optional: true
---

# Scatter chart

The scatter chart plots discrete data points on a two-dimensional grid. It is the preferred chart type for visualizing correlations between two numeric variables.

::: render
render=../../../code/statistics/components/charts/scatter/preview.vue
:::

::: tip
This component is best used inside a [Chart pane](../chart-pane).
:::

<FrontmatterDocs/>

## Examples

::: example Correlation || A scatter chart highlighting the correlation between two variables.
example=../../../code/statistics/components/charts/scatter/correlation.vue
:::

::: example Multiple series || Two overlapping scatter series distinguished by color.
example=../../../code/statistics/components/charts/scatter/multi-series.vue
:::

::: example With markers || A scatter chart with larger, hollow markers for sparse data.
example=../../../code/statistics/components/charts/scatter/with-markers.vue
:::
