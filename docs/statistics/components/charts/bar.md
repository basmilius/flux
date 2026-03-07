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

# Bar chart

The bar chart renders vertical grouped bars with rounded corners. It supports multiple series and shared tooltips.

::: render
render=../../../code/statistics/components/charts/bar/preview.vue
:::

::: tip
This component is best used inside a [Chart pane](../chart-pane).
:::

<FrontmatterDocs/>
