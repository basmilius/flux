<script setup>
    import { FluxPane, FluxTable, FluxTableRow, FluxTableCell, FluxTableHeader } from '@flux-ui/components';
</script>

# Chart colors

A chart has a color problem of its own. A button needs to stand out against the surface behind it, but a series needs to stay apart from the other series as well, and it has to keep doing that when the theme flips. Flux Statistics therefore has its own token layer on top of the [design tokens](../../guide/introduction/design-tokens), plus one fixed palette for charts that need more categories than the themed set covers.

## Chart tokens

Every token is declared once and takes its own value per theme, the same way the rest of Flux works.

<FluxPane>
    <FluxTable>
        <template #header>
            <FluxTableRow>
                <FluxTableHeader>Token</FluxTableHeader>
                <FluxTableHeader>What it is</FluxTableHeader>
            </FluxTableRow>
        </template>
        <FluxTableRow>
            <FluxTableCell><p><kbd>--chart-1</kbd> … <kbd>--chart-8</kbd></p></FluxTableCell>
            <FluxTableCell>The series colors, ordered by prominence.</FluxTableCell>
        </FluxTableRow>
        <FluxTableRow>
            <FluxTableCell><p><kbd>--chart-ramp-1</kbd> … <kbd>--chart-ramp-4</kbd></p></FluxTableCell>
            <FluxTableCell>A sequential ramp, light to dark, for heatmaps and choropleths.</FluxTableCell>
        </FluxTableRow>
        <FluxTableRow>
            <FluxTableCell><p><kbd>--chart-colorful-1</kbd> … <kbd>--chart-colorful-17</kbd></p></FluxTableCell>
            <FluxTableCell>The categorical set, for more categories than eight.</FluxTableCell>
        </FluxTableRow>
        <FluxTableRow>
            <FluxTableCell><kbd>--chart-positive</kbd></FluxTableCell>
            <FluxTableCell>Growth, gain, an upward change.</FluxTableCell>
        </FluxTableRow>
        <FluxTableRow>
            <FluxTableCell><kbd>--chart-negative</kbd></FluxTableCell>
            <FluxTableCell>Loss, decline, a downward change.</FluxTableCell>
        </FluxTableRow>
        <FluxTableRow>
            <FluxTableCell><kbd>--chart-grid</kbd></FluxTableCell>
            <FluxTableCell>Axis and grid lines.</FluxTableCell>
        </FluxTableRow>
        <FluxTableRow>
            <FluxTableCell><kbd>--chart-label</kbd></FluxTableCell>
            <FluxTableCell>Axis labels, ticks and legend text.</FluxTableCell>
        </FluxTableRow>
        <FluxTableRow>
            <FluxTableCell><kbd>--chart-on-fill</kbd></FluxTableCell>
            <FluxTableCell>Text drawn on top of a filled series, as in a treemap.</FluxTableCell>
        </FluxTableRow>
    </FluxTable>
</FluxPane>

The order of the eight is the order in which to spend them. `--chart-1` carries the most contrast against the chart surface and each next one steps down, so a two-series chart separates without anyone picking colors by hand, and an eight-series chart still separates at the bottom of the list.

Both themes get their own values instead of a mirrored scale. A series color has to hold its contrast against the chart surface it is actually drawn on, and in dark mode that is not the same problem as in light.

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
