---
outline: deep

props:
    -   name: slices
        description: The pie slices to render.
        type: FluxStatisticsChartPieSlice[]

    -   name: tooltip
        description: Show a tooltip on hover. Disabled by default.
        type: boolean
        optional: true

    -   name: title
        description: The title shown at the top of the tooltip.
        type: string
        optional: true

    -   name: tooltip-value-formatter
        description: Formats the value of every tooltip entry. Receives the raw value and the tooltip item it belongs to, and returns the string to show.
        type: "(value: number | string, item: SharedTooltipItem) => string"
        optional: true

    -   name: advanced-options
        description: Escape-hatch for raw ECharts options merged on top of the Flux defaults.
        type: EChartsOption
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

::: example Few slices || A focused pie chart with three categorical slices.
example=../../../code/statistics/components/charts/pie/few-slices.vue
:::

::: example Minimal || A simple two-slice pie chart without a legend.
example=../../../code/statistics/components/charts/pie/minimal.vue
:::

::: example With tooltip || Enable the hover tooltip by setting the `tooltip` prop.
example=../../../code/statistics/components/charts/pie/with-tooltip.vue
:::
