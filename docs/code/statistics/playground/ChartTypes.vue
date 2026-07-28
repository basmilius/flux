<template>
    <h2>Chart types</h2>
    <p>All fifteen chart components, each on data that actually suits it. That matters more than it sounds: a candlestick needs open, high, low and close, a box plot needs a distribution with a real spread, and a heatmap needs a full matrix. Feed any of them a flat array of pretty numbers and the chart looks broken when the component is fine. Every chart here has its tooltip on, so hover across the row and check the tooltip surface as well: it is a translucent copy of the pane with a blur behind it, and it has to stay readable over a dense chart in both themes.</p>
    <p>The things to judge across the grid are the parts that are not the series: the dashed grid lines on <code>--chart-grid</code>, the axis labels on <code>--chart-label</code>, and the order in which the palette is spent. <code>--chart-1</code> carries the most contrast and each next one steps down, so a two-series chart should separate without any effort while the radar and the bubble chart, which overlap their fills, are where the ordering gets tested.</p>
    <p>The last tile is <code>FluxStatisticsChart</code>, the component every wrapper above is built on, handed a stacked bar written straight against ECharts. It is the escape hatch for a chart the package does not wrap, and it is worth having on this page because it proves that the theme still reaches it: the colors in those raw options are <code>var(--chart-*)</code> references, resolved against the element before the chart is drawn, so the tile follows the theme switch like every other one here.</p>
    <div
        :class="$style.charts"
        data-prose-full>
        <FluxStatisticsChartPane
            :aspect-ratio="1.9"
            icon="chart-area"
            title="Area">
            <FluxStatisticsAreaChart
                :labels="months"
                :series="areaSeries"
                split-lines
                tooltip
                x-axis-labels
                y-axis-labels/>
        </FluxStatisticsChartPane>

        <FluxStatisticsChartPane
            :aspect-ratio="1.9"
            icon="chart-line"
            title="Line">
            <FluxStatisticsLineChart
                :labels="months"
                :series="lineSeries"
                split-lines
                tooltip
                x-axis-labels
                y-axis-labels/>
        </FluxStatisticsChartPane>

        <FluxStatisticsChartPane
            :aspect-ratio="1.9"
            icon="chart-bar"
            title="Bar">
            <FluxStatisticsBarChart
                :labels="channels"
                :series="barSeries"
                split-lines
                tooltip
                x-axis-labels
                y-axis-labels/>
        </FluxStatisticsChartPane>

        <FluxStatisticsChartPane
            :aspect-ratio="1.9"
            icon="chart-line"
            title="Mixed">
            <FluxStatisticsMixedChart
                :labels="months"
                :series="mixedSeries"
                split-lines
                tooltip
                x-axis-labels
                y-axis-labels/>
        </FluxStatisticsChartPane>

        <FluxStatisticsChartPane
            :aspect-ratio="1.9"
            icon="chart-bar"
            title="Box plot">
            <FluxStatisticsBoxPlotChart
                :labels="services"
                :series="boxPlotSeries"
                split-lines
                tooltip
                x-axis-labels
                y-axis-labels/>
        </FluxStatisticsChartPane>

        <FluxStatisticsChartPane
            :aspect-ratio="1.9"
            icon="circle"
            title="Bubble">
            <FluxStatisticsBubbleChart
                :series="bubbleSeries"
                split-lines
                tooltip
                x-axis-labels
                y-axis-labels/>
        </FluxStatisticsChartPane>

        <FluxStatisticsChartPane
            :aspect-ratio="1.9"
            icon="chart-bar"
            title="Candlestick">
            <FluxStatisticsCandlestickChart
                :labels="sessions"
                :series="candlestickSeries"
                split-lines
                tooltip
                x-axis-labels
                y-axis-labels/>
        </FluxStatisticsChartPane>

        <FluxStatisticsChartPane
            :aspect-ratio="1.9"
            icon="circle"
            title="Scatter">
            <FluxStatisticsScatterChart
                :series="scatterSeries"
                split-lines
                tooltip
                x-axis-labels
                y-axis-labels/>
        </FluxStatisticsChartPane>

        <FluxStatisticsChartPane
            :aspect-ratio="1.9"
            icon="grid-2"
            title="Heatmap">
            <FluxStatisticsHeatmapChart
                :series="heatmapSeries"
                tooltip
                x-axis-labels
                :x-labels="hours"
                y-axis-labels
                :y-labels="weekdays"/>
        </FluxStatisticsChartPane>

        <FluxStatisticsChartPane
            :aspect-ratio="1.5"
            icon="chart-pie"
            title="Donut">
            <FluxStatisticsDonutChart
                :slices="sources"
                title="Sessions"
                tooltip/>
        </FluxStatisticsChartPane>

        <FluxStatisticsChartPane
            :aspect-ratio="1.5"
            icon="chart-pie"
            title="Pie">
            <FluxStatisticsPieChart
                :slices="devices"
                tooltip/>
        </FluxStatisticsChartPane>

        <FluxStatisticsChartPane
            :aspect-ratio="1.5"
            icon="chart-pie"
            title="Polar area">
            <FluxStatisticsPolarAreaChart
                :slices="segments"
                tooltip/>
        </FluxStatisticsChartPane>

        <FluxStatisticsChartPane
            :aspect-ratio="1.5"
            icon="compass"
            title="Radar">
            <FluxStatisticsRadarChart
                :indicators="indicators"
                :series="radarSeries"
                tooltip/>
        </FluxStatisticsChartPane>

        <FluxStatisticsChartPane
            :aspect-ratio="1.5"
            icon="gauge-high"
            title="Radial bar">
            <FluxStatisticsRadialBar
                :series="quotaSeries"
                tooltip/>
        </FluxStatisticsChartPane>

        <FluxStatisticsChartPane
            :aspect-ratio="1.5"
            icon="rectangle-history"
            title="Treemap">
            <FluxStatisticsTreemapChart
                :nodes="storage"
                tooltip/>
        </FluxStatisticsChartPane>

        <FluxStatisticsChartPane
            :aspect-ratio="1.9"
            icon="screwdriver-wrench"
            title="Raw options, stacked bar">
            <template #info>
                Stacking is not a prop on any of the wrappers, so this one is written straight against ECharts.
            </template>

            <FluxStatisticsChart :options="stackedOptions"/>
        </FluxStatisticsChartPane>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { type EChartsOption, FluxStatisticsAreaChart, FluxStatisticsBarChart, FluxStatisticsBoxPlotChart, FluxStatisticsBubbleChart, FluxStatisticsCandlestickChart, FluxStatisticsChart, FluxStatisticsChartPane, FluxStatisticsDonutChart, FluxStatisticsHeatmapChart, FluxStatisticsLineChart, FluxStatisticsMixedChart, FluxStatisticsPieChart, FluxStatisticsPolarAreaChart, FluxStatisticsRadarChart, FluxStatisticsRadialBar, FluxStatisticsScatterChart, FluxStatisticsTreemapChart } from '@flux-ui/statistics';
    import type { FluxStatisticsChartAreaSeries, FluxStatisticsChartBarSeries, FluxStatisticsChartBoxPlotSeries, FluxStatisticsChartBubbleSeries, FluxStatisticsChartCandlestickSeries, FluxStatisticsChartGaugeSeries, FluxStatisticsChartHeatmapPoint, FluxStatisticsChartHeatmapSeries, FluxStatisticsChartLineSeries, FluxStatisticsChartMixedSeries, FluxStatisticsChartPieSlice, FluxStatisticsChartRadarIndicator, FluxStatisticsChartRadarSeries, FluxStatisticsChartScatterSeries, FluxStatisticsChartTreemapNode } from '@flux-ui/types';

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const channels = ['Direct', 'Search', 'Social', 'E-mail', 'Referral', 'Paid'];
    const services = ['Gateway', 'Database', 'Cache', 'Worker', 'Search'];
    const sessions = ['Mar 3', 'Mar 4', 'Mar 5', 'Mar 6', 'Mar 7', 'Mar 10', 'Mar 11', 'Mar 12', 'Mar 13', 'Mar 14'];
    const hours = ['08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'];
    const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    // A punchcard is a product of two shapes: how busy the day is and how busy the hour is.
    const weekdayLoad = [0.92, 1, 0.96, 1, 0.78, 0.34, 0.18];
    const hourLoad = [42, 78, 61, 88, 95, 64, 33, 15];

    const areaSeries: FluxStatisticsChartAreaSeries[] = [{
        name: 'Revenue',
        data: [42100, 51800, 47600, 63200, 58400, 71900, 66500, 82300, 74800, 93100, 86200, 104600]
    }];

    const lineSeries: FluxStatisticsChartLineSeries[] = [
        {
            name: 'p50',
            data: [82, 78, 84, 76, 71, 74, 69, 72, 66, 63, 68, 61]
        },
        {
            name: 'p95',
            data: [214, 226, 241, 198, 187, 209, 176, 194, 168, 159, 181, 152]
        }
    ];

    const barSeries: FluxStatisticsChartBarSeries[] = [{
        name: 'Sessions',
        data: [18400, 26300, 11200, 8600, 5400, 14100]
    }];

    const mixedSeries: FluxStatisticsChartMixedSeries[] = [
        {
            name: 'Shipped',
            type: 'bar',
            data: [420, 518, 476, 632, 584, 719, 665, 823, 748, 931, 862, 1046]
        },
        {
            name: 'Target',
            type: 'line',
            data: [500, 500, 550, 550, 600, 600, 700, 700, 800, 800, 900, 900]
        }
    ];

    const boxPlotSeries: FluxStatisticsChartBoxPlotSeries[] = [{
        name: 'Response time',
        data: [
            {min: 54, q1: 66, median: 82, q3: 88, max: 120},
            {min: 22, q1: 30, median: 38, q3: 44, max: 60},
            {min: 4, q1: 6, median: 8, q3: 12, max: 18},
            {min: 110, q1: 130, median: 152, q3: 168, max: 210},
            {min: 38, q1: 52, median: 64, q3: 78, max: 96}
        ]
    }];

    const bubbleSeries: FluxStatisticsChartBubbleSeries[] = [
        {
            name: 'Brand',
            data: [
                {x: 1200, y: 2.4, size: 18},
                {x: 2600, y: 3.1, size: 26},
                {x: 4100, y: 2.8, size: 34},
                {x: 5800, y: 4.2, size: 22},
                {x: 7300, y: 3.6, size: 40}
            ]
        },
        {
            name: 'Performance',
            data: [
                {x: 900, y: 1.6, size: 14},
                {x: 2100, y: 2.2, size: 20},
                {x: 3800, y: 1.9, size: 28},
                {x: 5200, y: 2.9, size: 16},
                {x: 6900, y: 2.4, size: 32}
            ]
        }
    ];

    const candlestickSeries: FluxStatisticsChartCandlestickSeries[] = [{
        name: 'FLUX',
        data: [
            {open: 102, close: 105, low: 100, high: 108},
            {open: 105, close: 109, low: 103, high: 110},
            {open: 109, close: 107, low: 106, high: 112},
            {open: 107, close: 112, low: 105, high: 114},
            {open: 112, close: 115, low: 110, high: 116},
            {open: 115, close: 111, low: 109, high: 118},
            {open: 111, close: 118, low: 110, high: 119},
            {open: 118, close: 116, low: 114, high: 122},
            {open: 116, close: 121, low: 115, high: 123},
            {open: 121, close: 126, low: 119, high: 128}
        ]
    }];

    const scatterSeries: FluxStatisticsChartScatterSeries[] = [
        {
            name: 'Marketing',
            data: [
                {x: 380, y: 1.2}, {x: 620, y: 1.6}, {x: 910, y: 2.1}, {x: 1240, y: 2.4},
                {x: 1580, y: 3.2}, {x: 1860, y: 3.4}, {x: 2210, y: 4.1}, {x: 2540, y: 4.6}
            ]
        },
        {
            name: 'Documentation',
            data: [
                {x: 210, y: 0.8}, {x: 430, y: 1.1}, {x: 680, y: 1.3}, {x: 940, y: 1.7},
                {x: 1180, y: 1.9}, {x: 1460, y: 2.4}, {x: 1720, y: 2.6}, {x: 2020, y: 3.1}
            ]
        }
    ];

    const heatmapData: FluxStatisticsChartHeatmapPoint[] = weekdays.flatMap((weekday, weekdayIndex) =>
        hours.map((hour, hourIndex) => ({
            x: hour,
            y: weekday,
            value: Math.round(hourLoad[hourIndex] * weekdayLoad[weekdayIndex])
        }))
    );

    const heatmapSeries: FluxStatisticsChartHeatmapSeries[] = [{
        name: 'Sessions',
        data: heatmapData
    }];

    const sources: FluxStatisticsChartPieSlice[] = [
        {label: 'Organic', value: 4820, formatted: '4,820'},
        {label: 'Direct', value: 3140, formatted: '3,140'},
        {label: 'Referral', value: 1860, formatted: '1,860'},
        {label: 'Social', value: 1240, formatted: '1,240'},
        {label: 'Paid', value: 720, formatted: '720'}
    ];

    const devices: FluxStatisticsChartPieSlice[] = [
        {label: 'Mobile', value: 58},
        {label: 'Desktop', value: 31},
        {label: 'Tablet', value: 8},
        {label: 'Other', value: 3}
    ];

    const segments: FluxStatisticsChartPieSlice[] = [
        {label: 'Retail', value: 44},
        {label: 'Wholesale', value: 55},
        {label: 'Marketplace', value: 13},
        {label: 'Subscriptions', value: 33},
        {label: 'Services', value: 22}
    ];

    const radarSeries: FluxStatisticsChartRadarSeries[] = [
        {name: 'This quarter', values: [82, 65, 73, 91, 70, 88]},
        {name: 'Last quarter', values: [70, 60, 64, 80, 65, 75]}
    ];

    const indicators: FluxStatisticsChartRadarIndicator[] = [
        {name: 'Speed', max: 100},
        {name: 'Quality', max: 100},
        {name: 'Volume', max: 100},
        {name: 'Accuracy', max: 100},
        {name: 'Focus', max: 100},
        {name: 'Support', max: 100}
    ];

    const quotaSeries: FluxStatisticsChartGaugeSeries[] = [
        {name: 'Storage', value: 74},
        {name: 'Bandwidth', value: 52},
        {name: 'Seats', value: 38}
    ];

    const quarters = ['Q1', 'Q2', 'Q3', 'Q4'];

    const stackedOptions: EChartsOption = {
        grid: {left: 21, right: 21, top: 21, bottom: 21, containLabel: true},
        xAxis: {
            type: 'category',
            data: quarters,
            axisLabel: {color: 'var(--chart-label)'},
            axisLine: {show: false},
            axisTick: {show: false}
        },
        yAxis: {
            type: 'value',
            axisLabel: {color: 'var(--chart-label)'},
            axisLine: {show: false},
            axisTick: {show: false},
            splitLine: {lineStyle: {type: 'dashed', color: 'var(--chart-grid)'}}
        },
        series: [
            {type: 'bar', name: 'Retail', stack: 'revenue', data: [4200, 5100, 4800, 6300], itemStyle: {color: 'var(--chart-1)'}},
            {type: 'bar', name: 'Wholesale', stack: 'revenue', data: [2600, 2900, 3400, 3100], itemStyle: {color: 'var(--chart-2)'}},
            {type: 'bar', name: 'Marketplace', stack: 'revenue', data: [1400, 1800, 1600, 2200], itemStyle: {color: 'var(--chart-3)'}},
            {type: 'bar', name: 'Services', stack: 'revenue', data: [800, 950, 1100, 1250], itemStyle: {color: 'var(--chart-4)'}}
        ]
    };

    const storage: FluxStatisticsChartTreemapNode[] = [
        {
            name: 'Media',
            children: [
                {name: 'Video', value: 780},
                {name: 'Photos', value: 540},
                {name: 'Audio', value: 210}
            ]
        },
        {
            name: 'Documents',
            children: [
                {name: 'Reports', value: 320},
                {name: 'Invoices', value: 180}
            ]
        },
        {name: 'Backups', value: 460},
        {name: 'Applications', value: 150},
        {name: 'System', value: 90}
    ];
</script>

<style
    lang="scss"
    module>
    .charts {
        display: grid;
        align-items: start;
        gap: 24px;
        grid-template-columns: repeat(3, minmax(0, 1fr));
    }

    @container playground (width < 1320px) {
        .charts {
            grid-template-columns: repeat(2, minmax(0, 1fr));
        }
    }

    @container playground (width < 690px) {
        .charts {
            grid-template-columns: minmax(0, 1fr);
        }
    }
</style>
