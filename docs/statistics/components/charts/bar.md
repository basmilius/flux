---
outline: deep

props:
    -   name: series
        description: The data series for the chart.
        type: FluxStatisticsChartBarSeries[]

    -   name: labels
        description: X-axis category labels.
        type: string[]
        optional: true

    -   name: tooltip
        description: Show a tooltip on hover. Disabled by default.
        type: boolean
        optional: true

    -   name: advanced-options
        description: Escape-hatch for raw ECharts options merged on top of the Flux defaults.
        type: EChartsOption
        optional: true
---

# Bar chart

The bar chart renders vertical grouped bars with rounded corners. It supports multiple series and shared tooltips.

::: render
render=../../../code/statistics/components/charts/bar/preview.vue
:::

::: tip
This component is best used inside a [Chart pane](../chart-pane).
:::

<FrontmatterDocs/>

## Examples

::: example Multiple series || A grouped bar chart comparing two data series side by side.
example=../../../code/statistics/components/charts/bar/multi-series.vue
:::

::: example Single series || A single series bar chart with a fixed color.
example=../../../code/statistics/components/charts/bar/single-series.vue
:::

::: example Horizontal || A horizontal bar chart configured through `advancedOptions`.
example=../../../code/statistics/components/charts/bar/horizontal.vue
:::

::: example With tooltip || Enable the hover tooltip by setting the `tooltip` prop.
example=../../../code/statistics/components/charts/bar/with-tooltip.vue
:::
