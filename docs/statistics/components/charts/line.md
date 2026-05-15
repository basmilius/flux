---
outline: deep

props:
    -   name: series
        description: The data series for the chart.
        type: FluxStatisticsChartLineSeries[]

    -   name: labels
        description: X-axis category labels.
        type: string[]
        optional: true

    -   name: tooltip
        description: Show a tooltip on hover. Disabled by default.
        type: boolean
        optional: true

    -   name: x-axis-labels
        description: Show labels on the X-axis. Disabled by default.
        type: boolean
        optional: true

    -   name: y-axis-labels
        description: Show labels on the Y-axis. Disabled by default.
        type: boolean
        optional: true

    -   name: split-lines
        description: Show dashed split lines along value axes. Disabled by default.
        type: boolean
        optional: true

    -   name: advanced-options
        description: Escape-hatch for raw ECharts options merged on top of the Flux defaults.
        type: EChartsOption
        optional: true
---

# Line chart

The line chart renders a smooth line chart in sparkline mode, hiding axes and labels for a compact presentation.

::: render
render=../../../code/statistics/components/charts/line/preview.vue
:::

::: tip
This component is best used inside a [Chart pane](../chart-pane).
:::

<FrontmatterDocs/>

## Examples

::: example Single series || A single series line chart tracking one metric over time.
example=../../../code/statistics/components/charts/line/single-series.vue
:::

::: example With labels || A line chart with month names on the X-axis through the `labels` prop.
example=../../../code/statistics/components/charts/line/with-labels.vue
:::

::: example With icons || A line chart whose series carry icons that surface in the legend and tooltip.
example=../../../code/statistics/components/charts/line/with-icons.vue
:::

::: example With tooltip || Enable the hover tooltip by setting the `tooltip` prop.
example=../../../code/statistics/components/charts/line/with-tooltip.vue
:::

::: example With axis labels || Show X/Y axis labels and dashed split lines.
example=../../../code/statistics/components/charts/line/with-axis-labels.vue
:::
