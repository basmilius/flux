---
outline: deep

props:
    -   name: series
        description: The data series for the chart. Each series declares its own `type` (`line`, `bar`, or `area`) to combine chart types.
        type: FluxStatisticsChartMixedSeries[]

    -   name: labels
        description: X-axis category labels.
        type: string[]
        optional: true

    -   name: tooltip
        description: Show a tooltip on hover. Disabled by default.
        type: boolean
        optional: true

    -   name: x-axis-labels
        description: Show labels on the X-axis. Disabled by default.
        type: boolean
        optional: true

    -   name: y-axis-labels
        description: Show labels on the Y-axis. Disabled by default.
        type: boolean
        optional: true

    -   name: split-lines
        description: Show dashed split lines along value axes. Disabled by default.
        type: boolean
        optional: true

    -   name: advanced-options
        description: Escape-hatch for raw ECharts options merged on top of the Flux defaults.
        type: EChartsOption
        optional: true
---

# Mixed chart

The mixed chart combines multiple chart types in the same plot. Each series declares its own `type` (`line`, `bar`, or `area`), making it ideal for pairing a primary metric with a derived series such as volume against price, or actual against target.

::: render
render=../../../code/statistics/components/charts/mixed/preview.vue
:::

::: tip
Set `series[].type` on each series to mix chart types in a single plot.
:::

<FrontmatterDocs/>

## Examples

::: example Line and bar || A bar chart of revenue with an overlaid line for orders.
example=../../../code/statistics/components/charts/mixed/line-and-bar.vue
:::

::: example Area and line || An area chart of total users layered with a line for active users.
example=../../../code/statistics/components/charts/mixed/area-and-line.vue
:::

::: example Three series || A combination of bar, line, and area series in one chart.
example=../../../code/statistics/components/charts/mixed/three-series.vue
:::

::: example With icons || A mixed chart whose series carry icons that surface in the legend and tooltip.
example=../../../code/statistics/components/charts/mixed/with-icons.vue
:::

::: example Area with line || An area for open pipeline value layered with a line for closed-won deals.
example=../../../code/statistics/components/charts/mixed/area-with-line.vue
:::

::: example With tooltip || Enable the hover tooltip by setting the `tooltip` prop.
example=../../../code/statistics/components/charts/mixed/with-tooltip.vue
:::

::: example With axis labels || Show X/Y axis labels and dashed split lines.
example=../../../code/statistics/components/charts/mixed/with-axis-labels.vue
:::
