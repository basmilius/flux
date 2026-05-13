---
outline: deep

props:
    -   name: series
        description: The data series for the chart.
        type: FluxStatisticsChartScatterSeries[]

    -   name: tooltip
        description: Show a tooltip on hover. Disabled by default.
        type: boolean
        optional: true

    -   name: advanced-options
        description: Escape-hatch for raw ECharts options merged on top of the Flux defaults.
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

::: example Clustered || A scatter chart with three visually distinct clusters.
example=../../../code/statistics/components/charts/scatter/clustered.vue
:::

::: example With icons || A scatter chart whose series carry icons in the legend.
example=../../../code/statistics/components/charts/scatter/with-icons.vue
:::

::: example With tooltip || Enable the hover tooltip by setting the `tooltip` prop.
example=../../../code/statistics/components/charts/scatter/with-tooltip.vue
:::
