---
outline: deep

props:
    -   name: series
        description: The percentage values to render, between 0 and 100. Use an array for multiple concentric rings.
        type: number[]

    -   name: aspect-ratio
        description: The aspect ratio of the chart.
        type: number
        optional: true

    -   name: options
        description: Additional ApexCharts options to merge with the defaults. Use `labels` to label each ring.
        type: ApexOptions
        optional: true
---

# Radial bar

The radial bar chart renders one or more percentage values as concentric circular rings. It is the circular counterpart of the [Meter](../meter) widget and works well as a single-value gauge or a small dashboard ring.

::: render
render=../../../code/statistics/components/charts/radial-bar/preview.vue
:::

::: tip
This component is best used inside a [Chart pane](../chart-pane).
:::

<FrontmatterDocs/>

## Examples

::: example Single value || A single radial ring for one percentage value.
example=../../../code/statistics/components/charts/radial-bar/single-value.vue
:::

::: example Multiple values || Multiple concentric radial bars for related metrics.
example=../../../code/statistics/components/charts/radial-bar/multiple-values.vue
:::

::: example Custom labels || A radial bar with a custom total label in the center.
example=../../../code/statistics/components/charts/radial-bar/with-label.vue
:::
