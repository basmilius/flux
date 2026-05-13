---
outline: deep

props:
    -   name: series
        description: The gauge rings to render. Each entry produces a concentric ring with its own value and color.
        type: FluxStatisticsChartGaugeSeries[]

    -   name: tooltip
        description: Show a tooltip on hover. Disabled by default.
        type: boolean
        optional: true

    -   name: advanced-options
        description: Escape-hatch for raw ECharts options merged on top of the Flux defaults.
        type: EChartsOption
        optional: true
---

# Radial bar

The radial bar chart renders one or more percentage values as concentric circular rings. It is the circular counterpart of the [Meter](../meter) widget and works well as a single-value gauge or a small dashboard ring.

::: render
render=../../../code/statistics/components/charts/radial-bar/preview.vue
:::

::: tip
This component is best used inside a [Chart pane](../chart-pane).
:::

<FrontmatterDocs/>

## Examples

::: example Single value || A single radial ring for one percentage value.
example=../../../code/statistics/components/charts/radial-bar/single-value.vue
:::

::: example Multiple values || Multiple concentric radial bars for related metrics.
example=../../../code/statistics/components/charts/radial-bar/multiple-values.vue
:::

::: example Custom labels || A radial bar with a custom total label in the center.
example=../../../code/statistics/components/charts/radial-bar/with-label.vue
:::

::: example With icons || A radial bar whose rings carry icons that surface in the legend.
example=../../../code/statistics/components/charts/radial-bar/with-icons.vue
:::

::: example Two rings || A compact radial bar with two concentric rings.
example=../../../code/statistics/components/charts/radial-bar/two-rings.vue
:::

::: example With tooltip || Enable the hover tooltip by setting the `tooltip` prop.
example=../../../code/statistics/components/charts/radial-bar/with-tooltip.vue
:::
