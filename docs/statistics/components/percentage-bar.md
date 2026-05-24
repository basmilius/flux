---
outline: deep

props:
    -   name: items
        description: The items of the percentage bar.
        type: FluxStatisticsPercentageBarItemObject[]
---

# Percentage bar

The percentage bar visualizes the proportional breakdown of a collection of items as a single horizontal segmented bar. Each segment can carry an optional icon and label, and integrates with the statistics legend context to provide bidirectional hover synchronization when wrapped in a `FluxStatisticsLegendScope`.

::: render
render=../../code/statistics/components/percentage-bar/preview.vue
:::

<FrontmatterDocs/>

## Examples

::: example Scoped with legend || A percentage bar wrapped in a legend scope together with a statistics legend, demonstrating bidirectional hover sync.
example=../../code/statistics/components/percentage-bar/scoped.vue
:::

## Used components

- [Legend](./legend/)
- [Legend scope](./legend-scope)
- [Tooltip](../../components/tooltip)
- [Icon](../../components/icon)
