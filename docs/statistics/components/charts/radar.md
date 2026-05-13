---
outline: deep

props:
    -   name: series
        description: The data rings to render. Each entry holds one value per indicator.
        type: FluxStatisticsChartRadarSeries[]

    -   name: indicators
        description: The named axes of the radar chart. Order must match the order of values in each series.
        type: FluxStatisticsChartRadarIndicator[]

    -   name: advanced-options
        description: Escape-hatch for raw ECharts options merged on top of the Flux defaults.
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

::: example With icons || A radar chart whose rings carry icons that surface in the legend.
example=../../../code/statistics/components/charts/radar/with-icons.vue
:::

::: example Many axes || A radar chart with a wider scorecard spanning eight indicators.
example=../../../code/statistics/components/charts/radar/many-axes.vue
:::
