---
outline: deep

props:
    -   name: slices
        description: The polar slices to render. Each slice sweeps the same angle but its radius scales with `value`.
        type: FluxStatisticsChartPieSlice[]

    -   name: tooltip
        description: Show a tooltip on hover. Disabled by default.
        type: boolean
        optional: true

    -   name: advanced-options
        description: Escape-hatch for raw ECharts options merged on top of the Flux defaults.
        type: EChartsOption
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

::: example With icons || A polar area chart whose slices carry icons that surface in the legend and tooltip.
example=../../../code/statistics/components/charts/polar-area/with-icons.vue
:::

::: example Few segments || A focused polar area chart with three segments.
example=../../../code/statistics/components/charts/polar-area/few-segments.vue
:::

::: example With tooltip || Enable the hover tooltip by setting the `tooltip` prop.
example=../../../code/statistics/components/charts/polar-area/with-tooltip.vue
:::
