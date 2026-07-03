---
outline: deep

props:
    -   name: series
        description: The data series for the sparkline.
        type: SparklineSeriesItem[]

    -   name: variant
        description: The visual style of the sparkline.
        type: "'line' | 'bar' | 'area'"
        default: "'line'"
        optional: true

    -   name: color
        description: A single color used for the sparkline. Accepts a FluxColor or a custom hex color.
        type: [ 'FluxColor', '`#${string}`' ]
        optional: true

    -   name: options
        description: Additional ECharts options to merge with the defaults.
        type: EChartsOption
        optional: true
---

# Sparkline

The sparkline is a generic mini-chart designed for inline use, for example next to a KPI value, inside a table cell, or in a tight dashboard slot. It supports `line`, `bar`, and `area` variants and a single explicit color.

::: render
render=../../code/statistics/components/sparkline/preview.vue
:::

<FrontmatterDocs/>

## Examples

::: example Line variant || A line sparkline showing a quick trend.
example=../../code/statistics/components/sparkline/line.vue
:::

::: example Bar variant || A bar sparkline emphasizing discrete values.
example=../../code/statistics/components/sparkline/bar.vue
:::

::: example Area variant || An area sparkline with a soft gradient fill.
example=../../code/statistics/components/sparkline/area.vue
:::

::: example Inside a metric || A sparkline displayed alongside a metric value.
example=../../code/statistics/components/sparkline/in-kpi.vue
:::
