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

# Treemap chart

The treemap chart visualizes proportional data as nested rectangles. Each tile's area is sized according to its value, making it well suited for showing the relative size of categories or hierarchical structures.

::: render
render=../../../code/statistics/components/charts/treemap/preview.vue
:::

::: tip
This component is best used inside a [Chart pane](../chart-pane).
:::

<FrontmatterDocs/>

## Examples

::: example Distributed || A single-series treemap with distributed colors.
example=../../../code/statistics/components/charts/treemap/distributed.vue
:::

::: example Custom colors || A treemap that uses a specific Flux color palette.
example=../../../code/statistics/components/charts/treemap/custom-colors.vue
:::

::: example Many categories || A treemap with a large number of small tiles.
example=../../../code/statistics/components/charts/treemap/many-categories.vue
:::
