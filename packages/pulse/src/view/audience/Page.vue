<template>
    <FluxApplicationContent layout="dashboard">
        <FluxApplicationSection :info="periodLabel">
            <FluxStatisticsGrid
                :gap="18"
                :lg="4"
                :sm="2"
                :xs="1">
                <FluxStatisticsKpi
                    :change="trend(totals.visitors, previousTotals.visitors)"
                    footer="unique visitors"
                    icon="users"
                    title="Visitors"
                    :value="formatCompact(totals.visitors)"/>
                <FluxStatisticsKpi
                    :change="trend(totals.newVisitors, previousTotals.newVisitors)"
                    footer="of all visitors"
                    icon="user-plus"
                    title="New visitors"
                    :value="formatRate(newShare)"/>
                <FluxStatisticsKpi
                    footer="of all visitors"
                    icon="arrows-rotate"
                    title="Returning"
                    :value="formatRate(1 - newShare)"/>
                <FluxStatisticsKpi
                    :change="trend(totals.pagesPerSession, previousTotals.pagesPerSession)"
                    footer="per session"
                    icon="eye"
                    title="Pages / session"
                    :value="totals.pagesPerSession.toFixed(2)"/>
            </FluxStatisticsGrid>
        </FluxApplicationSection>

        <FluxApplicationSection title="Audience over time">
            <FluxGrid>
                <FluxGridColumn
                    :lg="8"
                    :xs="12">
                    <FluxStatisticsChartPane
                        icon="chart-area"
                        title="New vs. returning visitors"
                        :aspect-ratio="2.4">
                        <FluxStatisticsAreaChart
                            :labels="labels"
                            :series="visitorSeries"
                            tooltip/>
                        <template #legend>
                            <FluxStatisticsLegend/>
                        </template>
                    </FluxStatisticsChartPane>
                </FluxGridColumn>

                <FluxGridColumn
                    :lg="4"
                    :xs="12">
                    <FluxStatisticsChartPane
                        icon="chart-pie"
                        title="Visitor type"
                        :aspect-ratio="1.4">
                        <FluxStatisticsDonutChart :slices="visitorTypeSlices"/>
                        <template #legend>
                            <FluxStatisticsLegend/>
                        </template>
                    </FluxStatisticsChartPane>
                </FluxGridColumn>
            </FluxGrid>
        </FluxApplicationSection>

        <FluxApplicationSection title="Demographics">
            <FluxGrid>
                <FluxGridColumn
                    :lg="6"
                    :xs="12">
                    <FluxStatisticsChartPane
                        icon="chart-bar"
                        title="Age"
                        :aspect-ratio="2.2">
                        <FluxStatisticsBarChart
                            :labels="ageLabels"
                            :series="ageSeries"
                            tooltip/>
                    </FluxStatisticsChartPane>
                </FluxGridColumn>

                <FluxGridColumn
                    :lg="6"
                    :xs="12">
                    <FluxStatisticsChartPane
                        icon="chart-pie"
                        title="Gender"
                        :aspect-ratio="2.2">
                        <FluxStatisticsPolarAreaChart
                            :slices="genderSlices"
                            tooltip/>
                        <template #legend>
                            <FluxStatisticsLegend/>
                        </template>
                    </FluxStatisticsChartPane>
                </FluxGridColumn>
            </FluxGrid>
        </FluxApplicationSection>

        <FluxApplicationSection title="Technology">
            <FluxGrid>
                <FluxGridColumn
                    :lg="5"
                    :xs="12">
                    <FluxStatisticsChartPane
                        icon="chart-pie"
                        title="Devices"
                        :aspect-ratio="1.4">
                        <FluxStatisticsDonutChart :slices="deviceSlices"/>
                        <template #legend>
                            <FluxStatisticsLegend/>
                        </template>
                    </FluxStatisticsChartPane>
                </FluxGridColumn>

                <FluxGridColumn
                    :lg="7"
                    :xs="12">
                    <FluxLayerPane>
                        <FluxPaneHeader
                            icon="globe"
                            title="Browsers"/>
                        <FluxPane>
                            <FluxPaneBody>
                                <FluxStatisticsPercentageBar :items="browserItems"/>
                            </FluxPaneBody>
                        </FluxPane>
                    </FluxLayerPane>
                </FluxGridColumn>
            </FluxGrid>
        </FluxApplicationSection>

        <FluxApplicationSection>
            <FluxGrid>
                <FluxGridColumn
                    :lg="6"
                    :xs="12">
                    <FluxLayerPane>
                        <FluxPaneHeader
                            icon="desktop"
                            title="Operating systems"/>
                        <FluxPane>
                            <FluxPaneBody>
                                <FluxStatisticsDetailsTable title="OS">
                                    <FluxStatisticsDetailsTableRow
                                        v-for="entry of operatingSystems"
                                        :key="entry.name"
                                        :label="entry.name"
                                        :value="formatCompact(entry.value)"/>
                                </FluxStatisticsDetailsTable>
                            </FluxPaneBody>
                        </FluxPane>
                    </FluxLayerPane>
                </FluxGridColumn>

                <FluxGridColumn
                    :lg="6"
                    :xs="12">
                    <FluxLayerPane>
                        <FluxPaneHeader
                            icon="comments"
                            title="Languages"/>
                        <FluxPane>
                            <FluxPaneBody>
                                <FluxStatisticsDetailsTable title="Language">
                                    <FluxStatisticsDetailsTableRow
                                        v-for="entry of languages"
                                        :key="entry.name"
                                        :label="entry.name"
                                        :value="formatCompact(entry.value)"/>
                                </FluxStatisticsDetailsTable>
                            </FluxPaneBody>
                        </FluxPane>
                    </FluxLayerPane>
                </FluxGridColumn>
            </FluxGrid>
        </FluxApplicationSection>

        <FluxApplicationSection title="Engagement">
            <FluxGrid>
                <FluxGridColumn
                    :lg="6"
                    :xs="12">
                    <FluxStatisticsChartPane
                        icon="chart-simple"
                        title="Engagement profile"
                        :aspect-ratio="1.8">
                        <FluxStatisticsRadarChart
                            :indicators="radarIndicators"
                            :series="radarSeries"
                            tooltip/>
                        <template #legend>
                            <FluxStatisticsLegend/>
                        </template>
                    </FluxStatisticsChartPane>
                </FluxGridColumn>

                <FluxGridColumn
                    :lg="6"
                    :xs="12">
                    <FluxStatisticsChartPane
                        icon="chart-simple"
                        title="Session duration by device"
                        :aspect-ratio="1.8">
                        <FluxStatisticsBoxPlotChart
                            :labels="deviceLabels"
                            :series="durationSeries"
                            tooltip/>
                    </FluxStatisticsChartPane>
                </FluxGridColumn>
            </FluxGrid>
        </FluxApplicationSection>

        <FluxApplicationSection
            info="Sessions by weekday and hour"
            title="When your audience is active">
            <FluxStatisticsChartPane
                icon="table-cells"
                title="Activity heatmap"
                :aspect-ratio="3">
                <FluxStatisticsHeatmapChart
                    :series="heatmapSeries"
                    tooltip
                    :x-labels="hourLabels"
                    :y-labels="weekdays"/>
            </FluxStatisticsChartPane>
        </FluxApplicationSection>
    </FluxApplicationContent>
</template>

<script
    lang="ts"
    setup>
    import { FluxApplicationContent, FluxApplicationSection } from '@flux-ui/application';
    import { FluxGrid, FluxGridColumn, FluxLayerPane, FluxPane, FluxPaneBody, FluxPaneHeader } from '@flux-ui/components';
    import { FluxStatisticsAreaChart, FluxStatisticsBarChart, FluxStatisticsBoxPlotChart, FluxStatisticsChartPane, FluxStatisticsDetailsTable, FluxStatisticsDetailsTableRow, FluxStatisticsDonutChart, FluxStatisticsGrid, FluxStatisticsHeatmapChart, FluxStatisticsKpi, FluxStatisticsLegend, FluxStatisticsPercentageBar, FluxStatisticsPolarAreaChart, FluxStatisticsRadarChart } from '@flux-ui/statistics';
    import type { FluxStatisticsChartAreaSeries, FluxStatisticsChartBarSeries, FluxStatisticsChartBoxPlotSeries, FluxStatisticsChartHeatmapSeries, FluxStatisticsChartPieSlice, FluxStatisticsChartRadarIndicator, FluxStatisticsChartRadarSeries, FluxStatisticsPercentageBarItemObject } from '@flux-ui/types';
    import { computed } from 'vue';
    import { defineTitle } from '@/composable';
    import { useAnalyticsStore } from '@/store';
    import { DEVICE, formatCompact, formatRate, paletteColor, trend } from '@/util';

    defineTitle('users', 'Audience');

    const {current, totals, previousTotals, labels, periodLabel, devices, browsers, operatingSystems, languages, ageGroups, genders, heatmap} = useAnalyticsStore();

    const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const hourLabels = Array.from({length: 24}, (_, hour) => `${hour}`);

    const newShare = computed(() => totals.value.visitors === 0 ? 0 : totals.value.newVisitors / totals.value.visitors);

    const visitorSeries = computed<FluxStatisticsChartAreaSeries[]>(() => [
        {name: 'New', color: 'var(--primary-400)', data: current.value.map(metric => metric.newVisitors)},
        {name: 'Returning', color: 'var(--info-400)', data: current.value.map(metric => Math.max(0, metric.visitors - metric.newVisitors))}
    ]);

    const visitorTypeSlices = computed<FluxStatisticsChartPieSlice[]>(() => [
        {label: 'New', value: totals.value.newVisitors, color: 'var(--primary-400)'},
        {label: 'Returning', value: totals.value.returningVisitors, color: 'var(--info-400)'}
    ]);

    const ageLabels = computed(() => ageGroups.value.map(entry => entry.name));
    const ageSeries = computed<FluxStatisticsChartBarSeries[]>(() => [
        {name: 'Share', color: 'var(--primary-400)', data: ageGroups.value.map(entry => entry.value)}
    ]);

    const genderSlices = computed<FluxStatisticsChartPieSlice[]>(() => genders.value.map((entry, index) => ({
        label: entry.name,
        value: entry.value,
        color: paletteColor(index)
    })));

    const deviceSlices = computed<FluxStatisticsChartPieSlice[]>(() => devices.value.map(entry => ({
        label: DEVICE[entry.device].label,
        value: entry.sessions,
        color: `var(--${DEVICE[entry.device].color}-400)`
    })));

    const browserItems = computed<FluxStatisticsPercentageBarItemObject[]>(() => browsers.value.map((entry, index) => ({
        label: entry.name,
        value: entry.value,
        color: paletteColor(index),
        displayValue: formatCompact(entry.value)
    })));

    const radarIndicators: FluxStatisticsChartRadarIndicator[] = [
        {name: 'Pages / session', max: 100},
        {name: 'Session length', max: 100},
        {name: 'Scroll depth', max: 100},
        {name: 'Conversion', max: 100},
        {name: 'Interaction', max: 100},
        {name: 'Return rate', max: 100}
    ];

    const radarSeries: FluxStatisticsChartRadarSeries[] = [
        {name: 'Desktop', color: 'var(--primary-400)', values: [78, 84, 71, 62, 80, 58]},
        {name: 'Mobile', color: 'var(--info-300)', values: [54, 49, 66, 41, 73, 47]}
    ];

    const deviceLabels = computed(() => devices.value.map(entry => DEVICE[entry.device].label));
    const durationSeries = computed<FluxStatisticsChartBoxPlotSeries[]>(() => [{
        name: 'Seconds',
        color: 'var(--primary-400)',
        data: devices.value.map(entry => {
            const median = entry.avgSeconds;
            return {
                label: DEVICE[entry.device].label,
                min: Math.round(median * 0.3),
                q1: Math.round(median * 0.62),
                median,
                q3: Math.round(median * 1.5),
                max: Math.round(median * 2.4)
            };
        })
    }]);

    const heatmapSeries = computed<FluxStatisticsChartHeatmapSeries[]>(() => [{
        name: 'Sessions',
        data: heatmap.value.map(cell => ({x: `${cell.hour}`, y: cell.weekday, value: cell.value}))
    }]);
</script>
