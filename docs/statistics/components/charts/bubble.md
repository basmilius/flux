---
outline: deep

props:
    -   name: series
        description: The data series for the chart, compatible with the ApexCharts series format.
        type: ApexOptions['series']

    -   name: aspect-ratio
        description: The aspect ratio of the chart.
        type: number
        optional: true

    -   name: options
        description: Additional ApexCharts options to merge with the defaults.
        type: ApexOptions
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
