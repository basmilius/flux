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

# Pie chart

The pie chart renders a standard pie chart. Tooltips and the legend are hidden by default; use a [Legend](../legend/) to display series labels alongside the chart.

::: render
render=../../../code/statistics/components/charts/pie/preview.vue
:::

::: tip
This component is best used inside a [Chart pane](../chart-pane).
:::

<FrontmatterDocs/>

## Examples

::: example In a chart pane || A pie chart inside a chart pane with matching colors and a legend.
example=../../../code/statistics/components/charts/pie/in-chart-pane.vue
:::
