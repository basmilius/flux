# Chart colors

A chart has a colour problem of its own. A button needs to stand out against the surface behind it, but a series needs to stay apart from the other series as well, and it has to keep doing that when the theme flips. Flux Statistics therefore has its own token layer on top of the [design tokens](../../guide/introduction/design-tokens), plus one fixed palette for charts that need more categories than the themed set covers.

## Chart tokens

Every token is declared once and takes its own value per theme, the same way the rest of Flux works.

| Token | What it is |
|---|---|
| `--chart-1` … `--chart-8` | The series colors, ordered by prominence |
| `--chart-ramp-1` … `--chart-ramp-4` | A sequential ramp, light to dark, for heatmaps and choropleths |
| `--chart-colorful-1` … `--chart-colorful-17` | The categorical set, for more categories than eight |
| `--chart-positive` | Growth, gain, an upward change |
| `--chart-negative` | Loss, decline, a downward change |
| `--chart-grid` | Axis and grid lines |
| `--chart-label` | Axis labels, ticks and legend text |
| `--chart-on-fill` | Text drawn on top of a filled series, as in a treemap |

The order of the eight is the order in which to spend them. `--chart-1` carries the most contrast against the chart surface and each next one steps down, so a two-series chart separates without anyone picking colors by hand, and an eight-series chart still separates at the bottom of the list.

Both themes get their own values instead of a mirrored scale. A series colour has to hold its contrast against the chart surface it is actually drawn on, and in dark mode that is not the same problem as in light.

## CHART_COLORS

The default cycle, in the order a chart assigns them to series that carry no `color` of their own.

```ts
import { CHART_COLORS } from '@flux-ui/statistics';

// ['var(--chart-1)', 'var(--chart-2)', 'var(--chart-3)', 'var(--chart-4)',
//  'var(--chart-5)', 'var(--chart-6)', 'var(--chart-7)', 'var(--chart-8)']
```

A chart cycles through this list, so a ninth series starts again at `--chart-1`.

## CHART_COLORFUL_COLORS

Seventeen hues at one lightness, evenly spaced around the wheel, for a chart with more categories than the themed set covers. Where `CHART_COLORS` separates by contrast, this one separates by hue.

```ts
import { CHART_COLORFUL_COLORS } from '@flux-ui/statistics';

// ['var(--chart-colorful-1)', … 'var(--chart-colorful-17)']
```

These are tokens, not fixed hex values, so they take their own lightness per theme and every one of them clears its contrast target against the chart surface. The [color palette](../../internals/data/color) in `@flux-ui/internals` still exports fixed hexes, but those are values a user picks in a color input, not colors a chart draws with.

## Usage

```vue
<template>
    <FluxStatisticsBarChart
        :data="chartData"
        :colors="CHART_COLORFUL_COLORS"/>
</template>

<script
    setup
    lang="ts">
    import { CHART_COLORFUL_COLORS } from '@flux-ui/statistics';
</script>
```
