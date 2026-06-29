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

::: tip
Negative item values are clamped to `0`, so a malformed data point never renders as a reversed or overlapping segment.
:::

::: info
The bar exposes the ARIA `img` role with an `aria-label` summarizing each segment as a percentage and label, so the breakdown is available to assistive technologies without relying on the visual segments.
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
