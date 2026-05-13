---
outline: deep

props:
    -   name: nodes
        description: The (optionally nested) tiles to render.
        type: FluxStatisticsChartTreemapNode[]

    -   name: advanced-options
        description: Escape-hatch for raw ECharts options merged on top of the Flux defaults.
        type: EChartsOption
        optional: true
---

# Treemap chart

The treemap chart visualizes proportional data as nested rectangles. Each tile's area is sized according to its value, making it well suited for showing the relative size of categories or hierarchical structures.

::: render
render=../../../code/statistics/components/charts/treemap/preview.vue
:::

::: tip
This component is best used inside a [Chart pane](../chart-pane).
:::

<FrontmatterDocs/>

## Examples

::: example Distributed || A single-series treemap with distributed colors.
example=../../../code/statistics/components/charts/treemap/distributed.vue
:::

::: example Custom colors || A treemap that uses a specific Flux color palette.
example=../../../code/statistics/components/charts/treemap/custom-colors.vue
:::

::: example Many categories || A treemap with a large number of small tiles.
example=../../../code/statistics/components/charts/treemap/many-categories.vue
:::

::: example Nested || A two-level treemap showing parent categories and their children.
example=../../../code/statistics/components/charts/treemap/nested.vue
:::

::: example Two categories || A simple two-tile split for a high-level breakdown.
example=../../../code/statistics/components/charts/treemap/two-categories.vue
:::
