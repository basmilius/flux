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
