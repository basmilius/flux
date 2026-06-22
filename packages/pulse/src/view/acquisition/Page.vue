<template>
    <FluxApplicationContent layout="dashboard">
        <FluxApplicationSection :info="periodLabel">
            <FluxStatisticsGrid
                :gap="18"
                :md="3"
                :xs="1">
                <FluxStatisticsComparison
                    :current="totals.sessions"
                    current-label="This period"
                    :format="formatCompact"
                    icon="arrow-pointer"
                    :previous="previousTotals.sessions"
                    previous-label="Previous"
                    show-delta
                    title="Sessions"/>
                <FluxStatisticsComparison
                    :current="totals.revenue"
                    current-label="This period"
                    :format="formatCurrency"
                    icon="sack-dollar"
                    :previous="previousTotals.revenue"
                    previous-label="Previous"
                    show-delta
                    title="Revenue"/>
                <FluxStatisticsMeter
                    color="warning"
                    footer="Paid search & social ads"
                    icon="bolt"
                    sub-title="of all sessions"
                    title="Paid traffic share"
                    :value="paidShare"/>
            </FluxStatisticsGrid>
        </FluxApplicationSection>

        <FluxApplicationSection title="Acquisition channels">
            <FluxGrid>
                <FluxGridColumn
                    :lg="8"
                    :xs="12">
                    <FluxStatisticsChartPane
                        icon="chart-area"
                        title="Sessions by channel"
                        :aspect-ratio="2.4">
                        <FluxStatisticsAreaChart
                            :labels="labels"
                            :series="channelSeries"
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
                        title="Channel share"
                        :aspect-ratio="1.4">
                        <FluxStatisticsDonutChart :slices="channelSlices"/>
                        <template #legend>
                            <FluxStatisticsLegend/>
                        </template>
                    </FluxStatisticsChartPane>
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
                            icon="link"
                            title="Top referrers"/>
                        <FluxPane>
                            <FluxPaneBody>
                                <FluxStatisticsDetailsTable title="Source">
                                    <FluxStatisticsDetailsTableRow
                                        v-for="referrer of topReferrers"
                                        :key="referrer.domain"
                                        :label="referrer.domain"
                                        :value="formatCompact(referrer.sessions)"/>
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
                            icon="bullseye"
                            title="Conversions by channel"/>
                        <FluxPane>
                            <FluxPaneBody>
                                <FluxStatisticsPercentageBar :items="conversionItems"/>
                            </FluxPaneBody>
                        </FluxPane>
                    </FluxLayerPane>
                </FluxGridColumn>
            </FluxGrid>
        </FluxApplicationSection>

        <FluxApplicationSection
            info="UTM campaigns driving traffic"
            title="Campaigns">
            <FluxDataTable
                is-hoverable
                is-sticky
                :fill-columns="7"
                :items="visibleCampaigns"
                :limits="[10, 25, 50]"
                :page="page"
                :per-page="perPage"
                :total="filteredCampaigns.length"
                @limit="value => perPage = value"
                @navigate="value => page = value">
                <template #filter>
                    <FluxTableBar>
                        <FluxFilterBar
                            v-model="filterState"
                            v-model:search="search"
                            is-searchable
                            search-placeholder="Search campaigns…">
                            <FluxFilterOption
                                icon="circle-check"
                                label="Status"
                                name="status"
                                :options="statusOptions"/>
                            <FluxFilterOptions
                                icon="tag"
                                label="Medium"
                                name="medium"
                                :options="mediumOptions"/>
                        </FluxFilterBar>
                    </FluxTableBar>
                </template>

                <template #header>
                    <FluxTableHeader>Campaign</FluxTableHeader>
                    <FluxTableHeader is-shrinking>Status</FluxTableHeader>
                    <FluxTableHeader is-shrinking>Sessions</FluxTableHeader>
                    <FluxTableHeader is-shrinking>Cost</FluxTableHeader>
                    <FluxTableHeader is-shrinking>Conversions</FluxTableHeader>
                    <FluxTableHeader is-shrinking>Revenue</FluxTableHeader>
                    <FluxTableHeader is-shrinking>ROAS</FluxTableHeader>
                </template>

                <template #campaign="{item}">
                    <FluxTableCell content-direction="column">
                        <strong>{{ item.name }}</strong>
                        <small>{{ item.source }} · {{ item.medium }}</small>
                    </FluxTableCell>
                </template>

                <template #status="{item}">
                    <FluxTableCell>
                        <FluxBadge
                            :color="CAMPAIGN_STATUS[item.status].color"
                            :icon="CAMPAIGN_STATUS[item.status].icon"
                            :label="CAMPAIGN_STATUS[item.status].label"/>
                    </FluxTableCell>
                </template>

                <template #sessions="{item}">
                    <FluxTableCell>{{ formatNumber(item.sessions) }}</FluxTableCell>
                </template>

                <template #cost="{item}">
                    <FluxTableCell>{{ formatCurrency(item.cost) }}</FluxTableCell>
                </template>

                <template #conversions="{item}">
                    <FluxTableCell>{{ formatNumber(item.conversions) }}</FluxTableCell>
                </template>

                <template #revenue="{item}">
                    <FluxTableCell>{{ formatCurrency(item.revenue) }}</FluxTableCell>
                </template>

                <template #roas="{item}">
                    <FluxTableCell>
                        <FluxBadge
                            :color="item.revenue >= item.cost ? 'success' : 'danger'"
                            :label="roas(item.revenue, item.cost)"/>
                    </FluxTableCell>
                </template>
            </FluxDataTable>
        </FluxApplicationSection>

        <FluxApplicationSection title="Campaign economics">
            <FluxGrid>
                <FluxGridColumn
                    :lg="7"
                    :xs="12">
                    <FluxStatisticsChartPane
                        icon="chart-simple"
                        title="Spend vs. revenue"
                        :aspect-ratio="1.9">
                        <template #info>
                            <p>Each bubble is a campaign — bubble size reflects conversions.</p>
                        </template>
                        <FluxStatisticsBubbleChart
                            :series="bubbleSeries"
                            tooltip
                            x-axis-labels
                            y-axis-labels/>
                    </FluxStatisticsChartPane>
                </FluxGridColumn>

                <FluxGridColumn
                    :lg="5"
                    :xs="12">
                    <FluxStatisticsChartPane
                        icon="table-cells"
                        title="Sessions by source"
                        :aspect-ratio="1.6">
                        <FluxStatisticsTreemapChart
                            :nodes="sourceNodes"
                            tooltip/>
                    </FluxStatisticsChartPane>
                </FluxGridColumn>
            </FluxGrid>
        </FluxApplicationSection>
    </FluxApplicationContent>
</template>

<script
    lang="ts"
    setup>
    import { FluxApplicationContent, FluxApplicationSection } from '@flux-ui/application';
    import { FluxBadge, FluxDataTable, FluxFilterBar, FluxFilterOption, FluxFilterOptions, FluxGrid, FluxGridColumn, FluxLayerPane, FluxPane, FluxPaneBody, FluxPaneHeader, FluxTableBar, FluxTableCell, FluxTableHeader } from '@flux-ui/components';
    import { FluxStatisticsAreaChart, FluxStatisticsBubbleChart, FluxStatisticsChartPane, FluxStatisticsComparison, FluxStatisticsDetailsTable, FluxStatisticsDetailsTableRow, FluxStatisticsDonutChart, FluxStatisticsGrid, FluxStatisticsLegend, FluxStatisticsMeter, FluxStatisticsPercentageBar, FluxStatisticsTreemapChart } from '@flux-ui/statistics';
    import type { FluxFilterOptionItem, FluxFilterState, FluxStatisticsChartAreaSeries, FluxStatisticsChartBubbleSeries, FluxStatisticsChartPieSlice, FluxStatisticsChartTreemapNode, FluxStatisticsPercentageBarItemObject } from '@flux-ui/types';
    import { computed, ref } from 'vue';
    import { defineTitle } from '@/composable';
    import { useAnalyticsStore } from '@/store';
    import { CAMPAIGN_STATUS, CHANNEL, formatCompact, formatCurrency, formatNumber, paletteColor } from '@/util';

    defineTitle('share-nodes', 'Acquisition');

    const {totals, previousTotals, labels, periodLabel, channelPeriod, referrers, campaigns} = useAnalyticsStore();

    const page = ref(1);
    const perPage = ref(10);
    const search = ref('');
    const filterState = ref<FluxFilterState>({status: null, medium: []});

    const statusOptions: FluxFilterOptionItem[] = [
        {label: 'Active', value: 'active', icon: 'circle-check'},
        {label: 'Paused', value: 'paused', icon: 'pause'},
        {label: 'Ended', value: 'ended', icon: 'circle-minus'}
    ];

    const mediumOptions = computed(() => [...new Set(campaigns.value.map(campaign => campaign.medium))].sort().map(medium => ({label: medium, value: medium})));

    const totalChannelSessions = computed(() => channelPeriod.value.reduce((acc, entry) => acc + entry.periodSessions, 0));
    const paidShare = computed(() => {
        const paid = channelPeriod.value.find(entry => entry.channel === 'paid');
        return totalChannelSessions.value === 0 || !paid ? 0 : paid.periodSessions / totalChannelSessions.value;
    });

    const channelSeries = computed<FluxStatisticsChartAreaSeries[]>(() => channelPeriod.value.slice(0, 5).map(entry => ({
        name: CHANNEL[entry.channel].label,
        color: `var(--${CHANNEL[entry.channel].color}-400)`,
        data: entry.periodDaily
    })));

    const channelSlices = computed<FluxStatisticsChartPieSlice[]>(() => channelPeriod.value.map(entry => ({
        label: CHANNEL[entry.channel].label,
        value: entry.periodSessions,
        color: `var(--${CHANNEL[entry.channel].color}-400)`
    })));

    const topReferrers = computed(() => referrers.value.slice(0, 8));

    const conversionItems = computed<FluxStatisticsPercentageBarItemObject[]>(() => channelPeriod.value.map(entry => ({
        label: CHANNEL[entry.channel].label,
        value: Math.round(entry.periodSessions * entry.conversionRate),
        color: `var(--${CHANNEL[entry.channel].color}-400)`,
        displayValue: formatNumber(Math.round(entry.periodSessions * entry.conversionRate))
    })));

    const filteredCampaigns = computed(() => campaigns.value.filter(campaign => {
        const {status, medium} = filterState.value;
        const matchesStatus = status === null || status === undefined || campaign.status === status;
        const matchesMedium = !Array.isArray(medium) || medium.length === 0 || medium.includes(campaign.medium);
        const matchesSearch = search.value === '' || campaign.name.toLowerCase().includes(search.value.toLowerCase());
        return matchesStatus && matchesMedium && matchesSearch;
    }));

    const visibleCampaigns = computed(() => filteredCampaigns.value.slice((page.value - 1) * perPage.value, page.value * perPage.value));

    const bubbleSeries = computed<FluxStatisticsChartBubbleSeries[]>(() => [{
        name: 'Campaigns',
        color: 'var(--primary-400)',
        data: campaigns.value.map(campaign => ({
            x: campaign.cost,
            y: campaign.revenue,
            size: Math.max(6, Math.round(campaign.conversions / 12))
        }))
    }]);

    const sourceNodes = computed<FluxStatisticsChartTreemapNode[]>(() => {
        const bySource = new Map<string, number>();

        for (const campaign of campaigns.value) {
            bySource.set(campaign.source, (bySource.get(campaign.source) ?? 0) + campaign.sessions);
        }

        return [...bySource.entries()]
            .sort((a, b) => b[1] - a[1])
            .map(([name, value], index) => ({name, value, color: paletteColor(index)}));
    });

    function roas(revenue: number, cost: number): string {
        return cost === 0 ? '—' : `${(revenue / cost).toFixed(1)}×`;
    }
</script>
