<template>
    <h2>Empty and thin data</h2>
    <p>Two states a demo never has and production always does: no rows at all, and exactly one row. The empty state is a component of its own rather than a chart drawing nothing, which is what lets it carry a title, a description and an action. It still has to fill the frame the chart would have taken, so the pane keeps its height and the page does not reflow when the first record arrives.</p>
    <p>One data point is where axis code usually breaks. A category axis with a single tick has to decide whether to center it or hug the edge, a value axis with a single value has no range to scale against, and a series of nothing but zeros has no maximum at all. Read every tile below asking one question: is this the honest picture of the data, or is it an empty canvas? A line with one point has no segment to draw and no symbol to show, which is the case worth watching hardest.</p>
    <p>The parts that are not charts get the same treatment at the end of the grid: a meter at zero and at one, a percentage bar whose values are all zero and therefore has nothing to divide, and one where a single segment takes 98.5 percent while the other two still have to be findable next to it.</p>
    <div
        :class="$style.thin"
        data-prose-full>
        <FluxStatisticsChartPane
            :aspect-ratio="2"
            icon="chart-line"
            title="Nothing recorded yet">
            <FluxStatisticsEmpty
                description="Once you record your first sale, the revenue chart appears here."
                icon="chart-line"
                title="No data yet">
                <FluxSecondaryButton
                    icon-leading="plus"
                    label="Import data"/>
            </FluxStatisticsEmpty>
        </FluxStatisticsChartPane>

        <FluxStatisticsChartPane
            :aspect-ratio="2"
            icon="filter"
            title="Nothing matches the filter">
            <FluxStatisticsEmpty
                description="No orders in this period match the selected channels."
                icon="magnifying-glass"
                title="No results"/>
        </FluxStatisticsChartPane>

        <FluxStatisticsChartPane
            :aspect-ratio="2"
            icon="wifi-slash"
            title="Empty without a description">
            <FluxStatisticsEmpty
                icon="wifi-slash"
                title="Metrics unavailable"/>
        </FluxStatisticsChartPane>

        <FluxStatisticsChartPane
            :aspect-ratio="2"
            icon="chart-line"
            title="One point, line">
            <FluxStatisticsLineChart
                :labels="['Mar']"
                :series="[{name: 'Revenue', data: [4820]}]"
                split-lines
                tooltip
                x-axis-labels
                y-axis-labels/>
        </FluxStatisticsChartPane>

        <FluxStatisticsChartPane
            :aspect-ratio="2"
            icon="chart-area"
            title="One point, area">
            <FluxStatisticsAreaChart
                :labels="['Mar']"
                :series="[{name: 'Revenue', data: [4820]}]"
                split-lines
                tooltip
                x-axis-labels
                y-axis-labels/>
        </FluxStatisticsChartPane>

        <FluxStatisticsChartPane
            :aspect-ratio="2"
            icon="chart-bar"
            title="One point, bar">
            <FluxStatisticsBarChart
                :labels="['Mar']"
                :series="[{name: 'Revenue', data: [4820]}]"
                split-lines
                tooltip
                x-axis-labels
                y-axis-labels/>
        </FluxStatisticsChartPane>

        <FluxStatisticsChartPane
            :aspect-ratio="2"
            icon="chart-line"
            title="Two points, line">
            <FluxStatisticsLineChart
                :labels="['Feb', 'Mar']"
                :series="[{name: 'Revenue', data: [3960, 4820]}]"
                split-lines
                tooltip
                x-axis-labels
                y-axis-labels/>
        </FluxStatisticsChartPane>

        <FluxStatisticsChartPane
            :aspect-ratio="2"
            icon="chart-bar"
            title="Every value zero">
            <FluxStatisticsBarChart
                :labels="months"
                :series="[{name: 'Revenue', data: [0, 0, 0, 0, 0, 0]}]"
                split-lines
                tooltip
                x-axis-labels
                y-axis-labels/>
        </FluxStatisticsChartPane>

        <FluxStatisticsChartPane
            :aspect-ratio="2"
            icon="chart-line"
            title="One value repeated">
            <FluxStatisticsLineChart
                :labels="months"
                :series="[{name: 'Uptime', data: [100, 100, 100, 100, 100, 100]}]"
                split-lines
                tooltip
                x-axis-labels
                y-axis-labels/>
        </FluxStatisticsChartPane>

        <FluxStatisticsChartPane
            :aspect-ratio="1.6"
            icon="chart-pie"
            title="One slice">
            <FluxStatisticsDonutChart
                :slices="[{label: 'Direct', value: 100}]"
                title="Sessions"
                tooltip/>

            <template #legend>
                <FluxStatisticsLegend/>
            </template>
        </FluxStatisticsChartPane>

        <FluxStatisticsChartPane
            :aspect-ratio="1.6"
            icon="circle"
            title="One point, scatter">
            <FluxStatisticsScatterChart
                :series="[{name: 'Session', data: [{x: 1200, y: 2.4}]}]"
                split-lines
                tooltip
                x-axis-labels
                y-axis-labels/>
        </FluxStatisticsChartPane>

        <FluxStatisticsChartPane
            :aspect-ratio="1.6"
            icon="gauge-high"
            title="Radial bar at zero">
            <FluxStatisticsRadialBar
                :series="[{name: 'Used', value: 0}]"
                tooltip/>
        </FluxStatisticsChartPane>

        <FluxStatisticsMetric
            icon="chart-line"
            label="Sparkline with one point"
            title="Signups"
            value="82">
            <FluxStatisticsSparkline
                color="primary"
                :series="[{name: 'Signups', data: [82]}]"/>
        </FluxStatisticsMetric>

        <FluxStatisticsMetric
            icon="chart-line"
            label="Sparkline with two points"
            title="Signups"
            value="82">
            <FluxStatisticsSparkline
                color="primary"
                :series="[{name: 'Signups', data: [64, 82]}]"/>
        </FluxStatisticsMetric>

        <FluxStatisticsMetric
            icon="chart-bar"
            label="Sparkline of nothing but zeros"
            title="Signups"
            value="0">
            <FluxStatisticsSparkline
                color="primary"
                :series="[{name: 'Signups', data: [0, 0, 0, 0, 0, 0]}]"
                variant="bar"/>
        </FluxStatisticsMetric>

        <FluxStatisticsBase
            icon="gauge"
            title="Meters at the ends">
            <FluxFlex
                direction="vertical"
                :gap="18">
                <FluxStatisticsMeter
                    color="danger"
                    tip="of 500 GB"
                    title="Nothing used"
                    :value="0"/>

                <FluxStatisticsMeter
                    color="success"
                    tip="of 500 GB"
                    title="Completely used"
                    :value="1"/>

                <FluxStatisticsMeter
                    color="primary"
                    tip="of 40"
                    title="Blocks at zero"
                    :value="0"
                    variant="blocks"/>
            </FluxFlex>
        </FluxStatisticsBase>

        <FluxStatisticsBase
            icon="chart-bar"
            title="Percentage bars at their limits">
            <FluxFlex
                direction="vertical"
                :gap="18">
                <FluxStatisticsPercentageBar :items="[{color: 'primary', label: 'Direct', value: 1, displayValue: '100%'}]"/>
                <FluxStatisticsPercentageBar :items="emptyShare"/>
                <FluxStatisticsPercentageBar :items="lopsidedShare"/>
            </FluxFlex>
        </FluxStatisticsBase>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { FluxFlex, FluxSecondaryButton } from '@flux-ui/components';
    import { FluxStatisticsAreaChart, FluxStatisticsBarChart, FluxStatisticsBase, FluxStatisticsChartPane, FluxStatisticsDonutChart, FluxStatisticsEmpty, FluxStatisticsLegend, FluxStatisticsLineChart, FluxStatisticsMeter, FluxStatisticsMetric, FluxStatisticsPercentageBar, FluxStatisticsRadialBar, FluxStatisticsScatterChart, FluxStatisticsSparkline } from '@flux-ui/statistics';
    import type { FluxStatisticsPercentageBarItemObject } from '@flux-ui/types';

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

    const emptyShare: FluxStatisticsPercentageBarItemObject[] = [
        {color: 'primary', label: 'Direct', value: 0, displayValue: '0%'},
        {color: 'info', label: 'Search', value: 0, displayValue: '0%'},
        {color: 'success', label: 'Social', value: 0, displayValue: '0%'}
    ];

    const lopsidedShare: FluxStatisticsPercentageBarItemObject[] = [
        {color: 'primary', label: 'Direct', value: 0.985, displayValue: '98.5%'},
        {color: 'info', label: 'Search', value: 0.01, displayValue: '1%'},
        {color: 'success', label: 'Social', value: 0.005, displayValue: '0.5%'}
    ];
</script>

<style
    lang="scss"
    module>
    .thin {
        display: grid;
        align-items: start;
        gap: 24px;
        grid-template-columns: repeat(3, minmax(0, 1fr));
    }

    @container playground (width < 1320px) {
        .thin {
            grid-template-columns: repeat(2, minmax(0, 1fr));
        }
    }

    @container playground (width < 690px) {
        .thin {
            grid-template-columns: minmax(0, 1fr);
        }
    }
</style>
