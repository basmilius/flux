---
outline: deep

props:
    -   name: series
        description: The OHLC data series. Each point holds named `open`, `close`, `low`, and `high` values.
        type: FluxStatisticsChartCandlestickSeries[]

    -   name: labels
        description: X-axis category labels (typically dates). If omitted, the `label` field on each point is used.
        type: string[]
        optional: true

    -   name: advanced-options
        description: Escape-hatch for raw ECharts options merged on top of the Flux defaults.
        type: EChartsOption
        optional: true
---

# Candlestick chart

The candlestick chart renders OHLC (open, high, low, close) data points using a green-on-success / red-on-danger color scheme. It is purpose-built for financial price data, but works equally well for any range-over-time series.

::: render
render=../../../code/statistics/components/charts/candlestick/preview.vue
:::

::: tip
This component is best used inside a [Chart pane](../chart-pane).
:::

<FrontmatterDocs/>

## Examples

::: example OHLC || A typical candlestick chart with daily OHLC values.
example=../../../code/statistics/components/charts/candlestick/ohlc.vue
:::

::: example Short range || A short-range candlestick chart for intraday data.
example=../../../code/statistics/components/charts/candlestick/short-range.vue
:::

::: example Volatile || A candlestick chart showing a more volatile price series.
example=../../../code/statistics/components/charts/candlestick/volatile.vue
:::

::: example Bull run || A predominantly green candlestick series trending upward.
example=../../../code/statistics/components/charts/candlestick/bull-run.vue
:::

::: example Custom colors || A candlestick chart with branded up and down colors.
example=../../../code/statistics/components/charts/candlestick/custom-colors.vue
:::
