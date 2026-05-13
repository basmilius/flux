---
outline: deep

props:
    -   name: series
        description: The data series for the chart.
        type: FluxStatisticsChartAreaSeries[]

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

# Area chart

The area chart renders a smooth area chart with a gradient fill. It uses sparkline mode by default, hiding axes and labels to present a clean, compact visualization.

::: render
render=../../../code/statistics/components/charts/area/preview.vue
:::

::: tip
This component is best used inside a [Chart pane](../chart-pane).
:::

<FrontmatterDocs/>

## Examples

::: example Multiple series || Comparing two data series in a single area chart.
example=../../../code/statistics/components/charts/area/multi-series.vue
:::

::: example Single series || A single area series for tracking cumulative growth.
example=../../../code/statistics/components/charts/area/single-series.vue
:::

::: example With icons || An area chart whose series carry icons that surface in the legend and tooltip.
example=../../../code/statistics/components/charts/area/with-icons.vue
:::

::: example With tooltip || Enable the hover tooltip by setting the `tooltip` prop.
example=../../../code/statistics/components/charts/area/with-tooltip.vue
:::
