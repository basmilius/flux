---
outline: deep

props:
    -   name: title
        description: The title shown in the header of the pane.
        type: string
        optional: true

    -   name: icon
        description: An icon shown in the header of the pane.
        type: FluxIconName
        optional: true

    -   name: aspect-ratio
        description: The aspect ratio of the chart area.
        type: number
        optional: true

    -   name: max-height
        description: The maximum height of the chart area in pixels.
        type: number
        optional: true

    -   name: min-height
        description: The minimum height of the chart area in pixels.
        type: number
        optional: true

slots:
    -   name: default
        description: The chart component to display.

    -   name: info
        description: Extra explanation about the chart, shown in a tooltip next to the title.

    -   name: legend
        description: An optional legend shown below the chart.

    -   name: toolbar
        description: An optional toolbar shown at the bottom of the pane.

requiredIcons:
    - circle-info
---

# Chart pane

The chart pane wraps a chart in a structured widget with a title, optional icon, and slots for a legend and toolbar. It controls the dimensions of the chart area through aspect ratio and min/max height constraints.

::: render
render=../../code/statistics/components/chart-pane/preview.vue
:::

<FrontmatterDocs/>

## Loading

`is-loading` covers the pane with a centered spinner over a blurred backdrop and marks the pane `aria-busy`. It is a layer on top of the chart, not a replacement for it, which gives it two properties that matter for a dashboard:

- The chart keeps its place, so nothing moves when the data arrives. Reserve the box with `aspect-ratio` or `min-height` and the pane holds the same height whether it is loading or not.
- A chart that is already showing data and reloads keeps that data visible underneath instead of flashing empty. ECharts is never torn down and rebuilt, so it never has to initialize on a hidden or zero-size container.

::: warning
`is-loading` is not declared on the chart pane itself. It reaches the shared statistics pane underneath through attribute fallthrough, which is why it works but does not show up in the props above and is not type checked. The same holds for [KPI](./kpi), [Metric](./metric) and [Comparison](./comparison): they are built on the same pane, so they take `is-loading` on the exact same terms.
:::

## Examples

::: example Basic || A chart pane with an area chart, legend, and icon.
example=../../code/statistics/components/chart-pane/basic.vue
:::

::: example Loading || The pane is covered while it reloads, without losing the chart that is already there.
example=../../code/statistics/components/chart-pane/loading.vue
:::

::: example With toolbar || A chart pane with an action button in the toolbar slot.
example=../../code/statistics/components/chart-pane/with-toolbar.vue
:::

## Used components

- [Charts](./charts/)
- [Legend](./legend/)
