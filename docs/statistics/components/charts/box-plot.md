---
outline: deep

props:
    -   name: series
        description: The data series. Each data point must contain `x` (label) and `y` as `[min, q1, median, q3, max]`.
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

# Box plot chart

The box plot summarizes the statistical distribution of a dataset using the five-number summary: minimum, lower quartile, median, upper quartile, and maximum. It is the preferred chart type for showing spread, skewness, and outliers across categories.

::: render
render=../../../code/statistics/components/charts/box-plot/preview.vue
:::

::: tip
This component is best used inside a [Chart pane](../chart-pane).
:::

<FrontmatterDocs/>

## Examples

::: example Basic || A box plot comparing distributions across several categories.
example=../../../code/statistics/components/charts/box-plot/basic.vue
:::

::: example Multi category || A wider box plot with more categories on the X axis.
example=../../../code/statistics/components/charts/box-plot/multi-category.vue
:::

::: example Tight distribution || A box plot showing tightly clustered distributions.
example=../../../code/statistics/components/charts/box-plot/tight-distribution.vue
:::
