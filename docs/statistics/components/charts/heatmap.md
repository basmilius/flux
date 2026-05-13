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
