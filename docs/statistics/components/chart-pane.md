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

    -   name: legend
        description: An optional legend shown below the chart.

    -   name: toolbar
        description: An optional toolbar shown at the bottom of the pane.
---

# Chart pane

The chart pane wraps a chart in a structured widget with a title, optional icon, and slots for a legend and toolbar. It controls the dimensions of the chart area through aspect ratio and min/max height constraints.

::: render
render=../../code/statistics/components/chart-pane/preview.vue
:::

<FrontmatterDocs/>

## Examples

::: example Basic || A chart pane with an area chart, legend, and icon.
example=../../code/statistics/components/chart-pane/basic.vue
:::

::: example With toolbar || A chart pane with an action button in the toolbar slot.
example=../../code/statistics/components/chart-pane/with-toolbar.vue
:::

## Used components

- [Charts](./charts/)
- [Legend](./legend/)
