---
outline: deep

props:
    -   name: series
        description: The data series for the heatmap. Each point holds named `x`, `y`, and `value` fields.
        type: FluxStatisticsChartHeatmapSeries[]

    -   name: x-labels
        description: Category labels for the X-axis.
        type: string[]
        optional: true

    -   name: y-labels
        description: Category labels for the Y-axis.
        type: string[]
        optional: true

    -   name: advanced-options
        description: Escape-hatch for raw ECharts options merged on top of the Flux defaults. Use for custom `visualMap` ranges.
        type: EChartsOption
        optional: true
---

# Heatmap chart

The heatmap chart visualizes a two-dimensional matrix of values as a grid of colored tiles. It works well for activity calendars, density maps, and any data with two categorical axes and a single numeric value.

::: render
render=../../../code/statistics/components/charts/heatmap/preview.vue
:::

::: tip
This component is best used inside a [Chart pane](../chart-pane).
:::

<FrontmatterDocs/>

## Examples

::: example Activity calendar || A weekly activity heatmap that resembles a contribution graph.
example=../../../code/statistics/components/charts/heatmap/activity-calendar.vue
:::

::: example Single series || A simpler one-series heatmap with custom color ranges.
example=../../../code/statistics/components/charts/heatmap/single-series.vue
:::

::: example Custom colors || A heatmap configured with a custom color scale.
example=../../../code/statistics/components/charts/heatmap/custom-colors.vue
:::

::: example Cohort retention || A retention heatmap that fades as cohorts decay over time.
example=../../../code/statistics/components/charts/heatmap/sparse.vue
:::

::: example Punchcard || A weekly punchcard heatmap highlighting peak working hours.
example=../../../code/statistics/components/charts/heatmap/punchcard.vue
:::
