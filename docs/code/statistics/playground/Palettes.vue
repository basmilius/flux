<template>
    <h2>Chart colors</h2>
    <p>The package ships two palettes and the choice between them is a product decision, so both are here on the same data. <code>CHART_COLORS</code> is eight tokens ordered by prominence: <code>--chart-1</code> holds the most contrast against the chart surface and each next one steps down, which is why a two-series chart separates without anyone picking a color. <code>CHART_COLORFUL_COLORS</code> is seventeen hues at a single lightness, evenly spaced around the wheel, for the cases where eight is not enough.</p>
    <p>The strip below is the raw token layer. Every value is declared once and resolves per theme, so switching the site is the real test: the colorful hues lift their lightness in dark mode instead of mirroring, and the four ramp stops have to stay ordered without the darkest one disappearing into the pane.</p>
    <div
        :class="$style.tokens"
        data-prose-full>
        <div
            v-for="group of tokenGroups"
            :key="group.title"
            :class="$style.tokenGroup">
            <span :class="$style.tokenGroupTitle">{{ group.title }}</span>

            <div :class="$style.tokenRow">
                <div
                    v-for="token of group.tokens"
                    :key="token"
                    :class="$style.token">
                    <span
                        :class="$style.tokenColor"
                        :style="{background: `var(--${token})`}"/>
                    <span :class="$style.tokenLabel">{{ token.replace('chart-', '') }}</span>
                </div>
            </div>
        </div>
    </div>
    <p>Twelve categories in one donut, drawn twice. On the left the eight cycle, so the ninth slice starts again at <code>--chart-1</code> and four pairs of slices share a color; the legend is the only way to tell them apart. On the right every category has a hue of its own. The trade is visible in the same pair: contrast ordering gives the first slices a clear hierarchy, hue spacing gives twelve equal voices.</p>
    <div
        :class="$style.palettePair"
        data-prose-full>
        <FluxStatisticsChartPane
            :aspect-ratio="1.3"
            icon="chart-pie"
            title="CHART_COLORS, twelve categories">
            <FluxStatisticsDonutChart
                :slices="defaultSlices"
                tooltip/>

            <template #legend>
                <FluxStatisticsLegend/>
            </template>
        </FluxStatisticsChartPane>

        <FluxStatisticsChartPane
            :aspect-ratio="1.3"
            icon="chart-pie"
            title="CHART_COLORFUL_COLORS, twelve categories">
            <FluxStatisticsDonutChart
                :slices="colorfulSlices"
                tooltip/>

            <template #legend>
                <FluxStatisticsLegend/>
            </template>
        </FluxStatisticsChartPane>
    </div>
    <p>The same comparison on lines, which is the harder case. A donut gives every color a large filled area; a line gives it two pixels. Equal lightness is exactly what makes a thin mark hard to place, so if the colorful set is going to fail anywhere it is here, and the six lines on the left should stay easier to follow than the six on the right even though they carry less hue separation.</p>
    <div
        :class="$style.palettePair"
        data-prose-full>
        <FluxStatisticsChartPane
            :aspect-ratio="1.8"
            icon="chart-line"
            title="CHART_COLORS, six series">
            <FluxStatisticsLineChart
                :labels="months"
                :series="defaultSeries"
                split-lines
                tooltip
                x-axis-labels
                y-axis-labels/>

            <template #legend>
                <FluxStatisticsLegend variant="compact"/>
            </template>
        </FluxStatisticsChartPane>

        <FluxStatisticsChartPane
            :aspect-ratio="1.8"
            icon="chart-line"
            title="CHART_COLORFUL_COLORS, six series">
            <FluxStatisticsLineChart
                :labels="months"
                :series="colorfulSeries"
                split-lines
                tooltip
                x-axis-labels
                y-axis-labels/>

            <template #legend>
                <FluxStatisticsLegend variant="compact"/>
            </template>
        </FluxStatisticsChartPane>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { CHART_COLORFUL_COLORS, CHART_COLORS, FluxStatisticsChartPane, FluxStatisticsDonutChart, FluxStatisticsLegend, FluxStatisticsLineChart } from '@flux-ui/statistics';
    import type { FluxStatisticsChartColor, FluxStatisticsChartLineSeries, FluxStatisticsChartPieSlice } from '@flux-ui/types';

    const tokenGroups = [
        {title: 'Series', tokens: Array.from({length: 8}, (_, index) => `chart-${index + 1}`)},
        {title: 'Ramp', tokens: Array.from({length: 4}, (_, index) => `chart-ramp-${index + 1}`)},
        {title: 'Colorful', tokens: Array.from({length: 17}, (_, index) => `chart-colorful-${index + 1}`)},
        {title: 'Roles', tokens: ['chart-positive', 'chart-negative', 'chart-grid', 'chart-label']}
    ];

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const countries = [
        {label: 'Netherlands', value: 4820},
        {label: 'Germany', value: 4310},
        {label: 'Belgium', value: 3760},
        {label: 'France', value: 3240},
        {label: 'Spain', value: 2880},
        {label: 'Italy', value: 2510},
        {label: 'Sweden', value: 2130},
        {label: 'Denmark', value: 1840},
        {label: 'Poland', value: 1520},
        {label: 'Portugal', value: 1260},
        {label: 'Ireland', value: 980},
        {label: 'Austria', value: 740}
    ];

    const regions: FluxStatisticsChartLineSeries[] = [
        {name: 'North', data: [42, 48, 45, 53, 58, 61, 57, 64, 68, 72, 69, 76]},
        {name: 'South', data: [31, 34, 39, 36, 42, 45, 48, 44, 51, 55, 58, 54]},
        {name: 'East', data: [22, 26, 24, 29, 33, 31, 36, 39, 37, 42, 45, 48]},
        {name: 'West', data: [58, 54, 61, 65, 62, 68, 71, 67, 74, 78, 75, 81]},
        {name: 'Central', data: [15, 18, 21, 19, 24, 27, 25, 30, 33, 31, 36, 39]},
        {name: 'Islands', data: [8, 11, 9, 14, 12, 17, 15, 20, 18, 23, 21, 26]}
    ];

    const defaultSlices = buildSlices(CHART_COLORS);
    const colorfulSlices = buildSlices(CHART_COLORFUL_COLORS);
    const defaultSeries = buildSeries(CHART_COLORS);
    const colorfulSeries = buildSeries(CHART_COLORFUL_COLORS);

    function buildSlices(palette: readonly FluxStatisticsChartColor[]): FluxStatisticsChartPieSlice[] {
        return countries.map((country, index) => ({
            ...country,
            color: palette[index % palette.length]
        }));
    }

    function buildSeries(palette: readonly FluxStatisticsChartColor[]): FluxStatisticsChartLineSeries[] {
        return regions.map((region, index) => ({
            ...region,
            color: palette[index % palette.length]
        }));
    }
</script>

<style
    lang="scss"
    module>
    .tokens {
        display: flex;
        flex-flow: column;
        gap: 18px;
    }

    .tokenGroup {
        display: flex;
        flex-flow: column;
        gap: 9px;
    }

    .tokenGroupTitle {
        color: var(--foreground-secondary);
        font-size: 13px;
        font-weight: 600;
    }

    .tokenRow {
        display: flex;
        flex-flow: row wrap;
        gap: 9px;
    }

    .token {
        display: flex;
        width: 90px;
        flex-flow: column;
        gap: 6px;
    }

    .tokenColor {
        display: block;
        height: 42px;
        border: 1px solid var(--surface-stroke);
        border-radius: var(--radius);
    }

    .tokenLabel {
        color: var(--foreground-secondary);
        font-size: 11px;
        font-variant-numeric: tabular-nums;
    }

    .palettePair {
        display: grid;
        align-items: start;
        gap: 24px;
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    @container playground (width < 1008px) {
        .palettePair {
            grid-template-columns: minmax(0, 1fr);
        }
    }
</style>
