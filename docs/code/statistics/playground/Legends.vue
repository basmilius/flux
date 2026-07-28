<template>
    <h2>Legend and legend scope</h2>
    <p>The legend is a component with behavior, not a caption. Wrap a chart and a legend in a <code>FluxStatisticsLegendScope</code> and the legend fills itself from whatever chart is inside the scope, which is exactly what a chart pane does for you in its <code>legend</code> slot. From then on the two are linked in both directions: hovering a legend item highlights its series in the chart, and hovering the chart highlights the item. The whole legend is a single tab stop with arrow keys inside it, so try it from the keyboard as well; focusing an item drives the same highlight the mouse does.</p>
    <p>Details to check: the dashed hairline between detailed items, the values in tabular figures so they line up in a column, and the hover surface behind an item, which is the one place in the package where a hover state has to read on a pane rather than on a control.</p>
    <div
        :class="$style.legends"
        data-prose-full>
        <FluxStatisticsChartPane
            :aspect-ratio="1.4"
            icon="chart-pie"
            title="Filled from the chart">
            <FluxStatisticsDonutChart
                :slices="sources"
                title="Sessions"
                tooltip/>

            <template #legend>
                <FluxStatisticsLegend/>
            </template>
        </FluxStatisticsChartPane>

        <FluxStatisticsChartPane
            :aspect-ratio="1.4"
            icon="chart-pie"
            title="Icons instead of swatches">
            <FluxStatisticsPieChart
                :slices="channels"
                tooltip/>

            <template #legend>
                <FluxStatisticsLegend/>
            </template>
        </FluxStatisticsChartPane>

        <FluxStatisticsBase
            icon="list"
            title="Written out by hand">
            <FluxFlex
                direction="vertical"
                :gap="18">
                <FluxStatisticsLegend>
                    <FluxStatisticsLegendItem
                        color="primary"
                        label="Electronics"
                        value="38%"/>
                    <FluxStatisticsLegendItem
                        color="info"
                        label="Clothing"
                        value="27%"/>
                    <FluxStatisticsLegendItem
                        color="success"
                        label="Books"
                        value="20%"/>
                    <FluxStatisticsLegendItem
                        color="warning"
                        label="Other"
                        value="15%"/>
                </FluxStatisticsLegend>

                <FluxStatisticsLegend variant="compact">
                    <FluxStatisticsLegendItem
                        color="primary"
                        icon="store"
                        label="Retail"/>
                    <FluxStatisticsLegendItem
                        color="info"
                        icon="truck"
                        label="Wholesale"/>
                    <FluxStatisticsLegendItem
                        color="success"
                        icon="cart-shopping"
                        label="Marketplace"/>
                </FluxStatisticsLegend>

                <FluxStatisticsLegend
                    direction="vertical"
                    variant="compact">
                    <FluxStatisticsLegendItem
                        color="primary"
                        label="Subscriptions"
                        value="€ 24,820"/>
                    <FluxStatisticsLegendItem
                        color="danger"
                        label="Refunds"
                        value="€ 1,240"/>
                </FluxStatisticsLegend>
            </FluxFlex>
        </FluxStatisticsBase>
    </div>
    <p>Now the case that decides a layout. Seventeen categories on the colorful palette, in a chart pane that puts a detailed legend beside the chart, gives the chart forty percent of the width and computes its height from the aspect ratio. The legend keeps growing past the chart, so the pane ends up sized by its list rather than by its chart, and the chart floats centered in the space that is left. The compact variant on the right is the answer when the list is that long: the pane drops it under the chart instead of beside it and the items wrap, at the cost of the values.</p>
    <div
        :class="$style.legendsWide"
        data-prose-full>
        <FluxStatisticsChartPane
            :aspect-ratio="1.2"
            icon="chart-pie"
            title="Seventeen categories, detailed legend">
            <FluxStatisticsDonutChart
                :slices="languages"
                title="Repositories"
                tooltip/>

            <template #legend>
                <FluxStatisticsLegend/>
            </template>
        </FluxStatisticsChartPane>

        <FluxStatisticsChartPane
            :aspect-ratio="1.2"
            icon="chart-pie"
            title="Seventeen categories, compact legend">
            <FluxStatisticsPolarAreaChart
                :slices="languages"
                tooltip/>

            <template #legend>
                <FluxPaneBody>
                    <FluxStatisticsLegend variant="compact"/>
                </FluxPaneBody>
            </template>
        </FluxStatisticsChartPane>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { FluxFlex, FluxPaneBody } from '@flux-ui/components';
    import { CHART_COLORFUL_COLORS, FluxStatisticsBase, FluxStatisticsChartPane, FluxStatisticsDonutChart, FluxStatisticsLegend, FluxStatisticsLegendItem, FluxStatisticsPieChart, FluxStatisticsPolarAreaChart } from '@flux-ui/statistics';
    import type { FluxStatisticsChartPieSlice } from '@flux-ui/types';

    const sources: FluxStatisticsChartPieSlice[] = [
        {label: 'Organic', value: 4820, formatted: '4,820'},
        {label: 'Direct', value: 3140, formatted: '3,140'},
        {label: 'Referral', value: 1860, formatted: '1,860'},
        {label: 'Social', value: 1240, formatted: '1,240'},
        {label: 'Paid', value: 720, formatted: '720'}
    ];

    const channels: FluxStatisticsChartPieSlice[] = [
        {icon: 'store', label: 'Retail', value: 44, formatted: '44%'},
        {icon: 'truck', label: 'Wholesale', value: 26, formatted: '26%'},
        {icon: 'cart-shopping', label: 'Marketplace', value: 18, formatted: '18%'},
        {icon: 'envelope', label: 'Direct sales', value: 12, formatted: '12%'}
    ];

    const languageNames = [
        'TypeScript', 'Vue', 'SCSS', 'PHP', 'Python', 'Go', 'Rust', 'Java',
        'Kotlin', 'Swift', 'Ruby', 'C', 'C++', 'Shell', 'SQL', 'Dart', 'Other'
    ];

    const languageValues = [420, 386, 312, 268, 224, 196, 172, 148, 126, 108, 92, 78, 66, 54, 42, 31, 24];

    const languages: FluxStatisticsChartPieSlice[] = languageNames.map((name, index) => ({
        color: CHART_COLORFUL_COLORS[index % CHART_COLORFUL_COLORS.length],
        label: name,
        value: languageValues[index],
        formatted: `${languageValues[index]}`
    }));
</script>

<style
    lang="scss"
    module>
    .legends,
    .legendsWide {
        display: grid;
        align-items: start;
        gap: 24px;
    }

    .legends {
        grid-template-columns: repeat(3, minmax(0, 1fr));
    }

    .legendsWide {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    @container playground (width < 1320px) {
        .legends {
            grid-template-columns: repeat(2, minmax(0, 1fr));
        }
    }

    @container playground (width < 1008px) {
        .legendsWide {
            grid-template-columns: minmax(0, 1fr);
        }
    }

    @container playground (width < 690px) {
        .legends {
            grid-template-columns: minmax(0, 1fr);
        }
    }
</style>
