---
outline: deep

props:
    -   name: slices
        description: The donut slices to render.
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

# Donut chart

The donut chart renders a hollow pie chart. Tooltips and the legend are hidden by default; use a [Legend](../legend/) to display series labels alongside the chart.

::: render
render=../../../code/statistics/components/charts/donut/preview.vue
:::

::: tip
This component is best used inside a [Chart pane](../chart-pane).
:::

<FrontmatterDocs/>

## Examples

::: example In a chart pane || A donut chart inside a chart pane with matching colors and a legend.
example=../../../code/statistics/components/charts/donut/in-chart-pane.vue
:::

::: example With icons || A donut chart whose slices carry icons that surface in the legend and tooltip.
example=../../../code/statistics/components/charts/donut/with-icons.vue
:::

::: example Minimal || A focused two-slice donut chart without a legend.
example=../../../code/statistics/components/charts/donut/minimal.vue
:::

::: example With tooltip || Enable the hover tooltip by setting the `tooltip` prop.
example=../../../code/statistics/components/charts/donut/with-tooltip.vue
:::
