---
outline: deep

props:
    -   name: series
        description: The data series for the chart, compatible with the ECharts series format.
        type: EChartsOption['series']

    -   name: aspect-ratio
        description: The aspect ratio of the chart.
        type: number
        optional: true

    -   name: options
        description: Additional ECharts options to merge with the defaults.
        type: EChartsOption
        optional: true
---

# Radar chart

The radar chart compares multiple variables across one or more series on a circular grid. It is well suited for showing the shape of a feature set, skill profile, or scorecard.

::: render
render=../../../code/statistics/components/charts/radar/preview.vue
:::

::: tip
This component is best used inside a [Chart pane](../chart-pane) to provide a consistent header.
:::

<FrontmatterDocs/>

## Examples

::: example Single series || A single series radar chart showing one profile.
example=../../../code/statistics/components/charts/radar/single-series.vue
:::

::: example Multiple series || Two profiles overlaid on the same radar chart for comparison.
example=../../../code/statistics/components/charts/radar/multi-series.vue
:::

::: example With fill || A radar chart with a more pronounced filled area.
example=../../../code/statistics/components/charts/radar/with-fill.vue
:::
