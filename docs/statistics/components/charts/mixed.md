---
outline: deep

props:
    -   name: series
        description: The data series for the chart. Each series may declare its own `type` (`line`, `bar`, or `area`) to combine chart types.
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
