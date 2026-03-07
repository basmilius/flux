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

# Area chart

The area chart renders a smooth area chart with a gradient fill. It uses sparkline mode by default, hiding axes and labels to present a clean, compact visualization.

::: render
render=../../../code/statistics/components/charts/area/preview.vue
:::

::: tip
This component is best used inside a [Chart pane](../chart-pane).
:::

<FrontmatterDocs/>
