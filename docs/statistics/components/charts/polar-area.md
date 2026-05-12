---
outline: deep

props:
    -   name: series
        description: An array of numeric values for each polar segment.
        type: number[]

    -   name: aspect-ratio
        description: The aspect ratio of the chart.
        type: number
        optional: true

    -   name: options
        description: Additional ApexCharts options to merge with the defaults. Use `labels` to label each segment.
        type: ApexOptions
        optional: true
---

# Polar area chart

The polar area chart is a variation of the pie chart where each segment has the same angle but a different radius based on its value. It places more emphasis on magnitude than a regular pie or donut.

::: render
render=../../../code/statistics/components/charts/polar-area/preview.vue
:::

::: tip
This component is best used inside a [Chart pane](../chart-pane).
:::

<FrontmatterDocs/>

## Examples

::: example Basic || A simple polar area chart with five segments.
example=../../../code/statistics/components/charts/polar-area/basic.vue
:::

::: example Custom colors || A polar area chart with explicit segment colors.
example=../../../code/statistics/components/charts/polar-area/custom-colors.vue
:::

::: example Many segments || A polar area chart with a larger set of segments.
example=../../../code/statistics/components/charts/polar-area/many-segments.vue
:::
