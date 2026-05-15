---
outline: deep

props:
    -   name: series
        description: The data series. Each point holds `min`, `q1`, `median`, `q3`, and `max` values.
        type: FluxStatisticsChartBoxPlotSeries[]

    -   name: labels
        description: X-axis category labels. If omitted, the `label` field on each point is used.
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

# Box plot chart

The box plot summarizes the statistical distribution of a dataset using the five-number summary: minimum, lower quartile, median, upper quartile, and maximum. It is the preferred chart type for showing spread, skewness, and outliers across categories.

::: render
render=../../../code/statistics/components/charts/box-plot/preview.vue
:::

::: tip
This component is best used inside a [Chart pane](../chart-pane).
:::

<FrontmatterDocs/>

## Examples

::: example Basic || A box plot comparing distributions across several categories.
example=../../../code/statistics/components/charts/box-plot/basic.vue
:::

::: example Multi category || A wider box plot with more categories on the X axis.
example=../../../code/statistics/components/charts/box-plot/multi-category.vue
:::

::: example Tight distribution || A box plot showing tightly clustered distributions.
example=../../../code/statistics/components/charts/box-plot/tight-distribution.vue
:::

::: example Wide spread || A box plot with wide whiskers showing large variance per route.
example=../../../code/statistics/components/charts/box-plot/wide-spread.vue
:::

::: example Single category || A focused single-category box plot.
example=../../../code/statistics/components/charts/box-plot/single-category.vue
:::

::: example With tooltip || Enable the hover tooltip listing min, quartiles, and max.
example=../../../code/statistics/components/charts/box-plot/with-tooltip.vue
:::

::: example With axis labels || Show X/Y axis labels and dashed split lines.
example=../../../code/statistics/components/charts/box-plot/with-axis-labels.vue
:::
