---
outline: deep

props:
    -   name: series
        description: The data series. Each data point must contain `x` (label) and `y` as `[start, end]` timestamps.
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

# Range bar chart

The range bar chart renders horizontal bars that span a start and end value. It is the foundation for timeline and Gantt-style visualizations, and supports grouped rows for multi-resource schedules.

::: render
render=../../../code/statistics/components/charts/range-bar/preview.vue
:::

::: tip
This component is best used inside a [Chart pane](../chart-pane).
:::

<FrontmatterDocs/>

## Examples

::: example Timeline || A project timeline grouped by category.
example=../../../code/statistics/components/charts/range-bar/timeline.vue
:::

::: example Gantt style || A Gantt-style schedule with sequential tasks.
example=../../../code/statistics/components/charts/range-bar/gantt-style.vue
:::

::: example Resource planning || A range bar chart used as a small resource planner.
example=../../../code/statistics/components/charts/range-bar/resource-planning.vue
:::
