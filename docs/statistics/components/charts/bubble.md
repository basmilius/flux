---
outline: deep

props:
    -   name: series
        description: The data series for the chart. Each point's `size` controls the marker radius.
        type: FluxStatisticsChartBubbleSeries[]

    -   name: tooltip
        description: Show a tooltip on hover. Disabled by default.
        type: boolean
        optional: true

    -   name: advanced-options
        description: Escape-hatch for raw ECharts options merged on top of the Flux defaults.
        type: EChartsOption
        optional: true
---

# Bubble chart

The bubble chart extends a scatter chart with a third numeric dimension encoded in the radius of each marker. It is ideal for visualizing three-variable relationships such as price, volume, and market cap.

::: render
render=../../../code/statistics/components/charts/bubble/preview.vue
:::

::: tip
This component is best used inside a [Chart pane](../chart-pane).
:::

<FrontmatterDocs/>

## Examples

::: example Three dimensions || A bubble chart visualizing three variables at once.
example=../../../code/statistics/components/charts/bubble/three-dimensions.vue
:::

::: example Multiple series || Two grouped bubble series for category comparison.
example=../../../code/statistics/components/charts/bubble/multi-series.vue
:::

::: example Compact || A more compact bubble chart with smaller markers.
example=../../../code/statistics/components/charts/bubble/compact.vue
:::

::: example With icons || A bubble chart whose series carry icons in the legend.
example=../../../code/statistics/components/charts/bubble/with-icons.vue
:::

::: example Dense || A bubble chart with many randomly distributed points.
example=../../../code/statistics/components/charts/bubble/dense.vue
:::

::: example With tooltip || Enable the hover tooltip by setting the `tooltip` prop.
example=../../../code/statistics/components/charts/bubble/with-tooltip.vue
:::
