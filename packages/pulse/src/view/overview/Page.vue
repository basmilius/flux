<template>
    <FluxApplicationContent layout="dashboard">
        <FluxApplicationSection>
            <FluxNoticeStack>
                <FluxNotice
                    color="info"
                    icon="rocket"
                    message="Welcome to Pulse — a demo product analytics workspace. All data is generated from a fixed seed and resets on reload."/>
                <FluxNotice
                    v-if="topAlert"
                    :color="topAlert.color"
                    :icon="topAlert.icon"
                    :message="topAlert.body"/>
            </FluxNoticeStack>
        </FluxApplicationSection>

        <FluxApplicationSection :info="periodLabel">
            <FluxStatisticsGrid
                :gap="18"
                :lg="6"
                :sm="2"
                :xs="1">
                <FluxStatisticsKpi
                    :change="trend(totals.visitors, previousTotals.visitors)"
                    footer="vs. previous period"
                    icon="users"
                    title="Visitors"
                    :value="formatCompact(totals.visitors)"/>
                <FluxStatisticsKpi
                    :change="trend(totals.sessions, previousTotals.sessions)"
                    footer="vs. previous period"
                    icon="arrow-pointer"
                    title="Sessions"
                    :value="formatCompact(totals.sessions)"/>
                <FluxStatisticsKpi
                    :change="trend(totals.pageviews, previousTotals.pageviews)"
                    footer="vs. previous period"
                    icon="eye"
                    title="Pageviews"
                    :value="formatCompact(totals.pageviews)"/>
                <FluxStatisticsKpi
                    :change="trend(totals.bounceRate, previousTotals.bounceRate, {invert: true})"
                    footer="vs. previous period"
                    icon="arrow-trend-down"
                    title="Bounce rate"
                    :value="formatRate(totals.bounceRate)"/>
                <FluxStatisticsKpi
                    :change="trend(totals.avgDuration, previousTotals.avgDuration)"
                    footer="per session"
                    icon="clock"
                    title="Avg. session"
                    :value="formatDuration(totals.avgDuration)"/>
                <FluxStatisticsKpi
                    :change="trend(totals.conversionRate, previousTotals.conversionRate)"
                    footer="vs. previous period"
                    icon="bullseye"
                    title="Conversion rate"
                    :value="formatRate(totals.conversionRate)"/>
            </FluxStatisticsGrid>
        </FluxApplicationSection>

        <FluxApplicationSection title="Traffic">
            <FluxGrid>
                <FluxGridColumn
                    :lg="8"
                    :xs="12">
                    <FluxStatisticsChartPane
                        icon="chart-area"
                        title="Visitors & sessions"
                        :aspect-ratio="2.4">
                        <template #info>
                            <p>Daily visitors and sessions across the selected period.</p>
                        </template>
                        <FluxStatisticsAreaChart
                            :labels="labels"
                            :series="trafficSeries"
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
                        title="Sessions by channel"
                        :aspect-ratio="1.4">
                        <FluxStatisticsDonutChart :slices="channelSlices"/>
                        <template #legend>
                            <FluxStatisticsLegend/>
                        </template>
                    </FluxStatisticsChartPane>
                </FluxGridColumn>
            </FluxGrid>
        </FluxApplicationSection>

        <FluxApplicationSection title="Trends">
            <FluxStatisticsGrid
                :gap="18"
                :md="3"
                :xs="1">
                <FluxStatisticsMetric
                    :footer="periodLabel"
                    icon="eye"
                    title="Pageviews"
                    :value="formatCompact(totals.pageviews)">
                    <FluxStatisticsSparkline
                        color="primary"
                        :series="[{data: pageviewsData}]"
                        variant="area"/>
                </FluxStatisticsMetric>

                <FluxStatisticsMetric
                    footer="new visitors"
                    icon="user-plus"
                    title="New visitors"
                    :value="formatCompact(totals.newVisitors)">
                    <FluxStatisticsSparkline
                        color="success"
                        :series="[{data: newVisitorsData}]"
                        variant="bar"/>
                </FluxStatisticsMetric>

                <FluxStatisticsMetric
                    footer="this period"
                    icon="sack-dollar"
                    title="Revenue"
                    :value="formatCurrency(totals.revenue)">
                    <FluxStatisticsChange v-bind="trend(totals.revenue, previousTotals.revenue)"/>
                    <FluxStatisticsSparkline
                        color="info"
                        :series="[{data: revenueData}]"
                        variant="line"/>
                </FluxStatisticsMetric>
            </FluxStatisticsGrid>
        </FluxApplicationSection>

        <FluxApplicationSection>
            <FluxGrid>
                <FluxGridColumn
                    :lg="7"
                    :xs="12">
                    <FluxLayerPane>
                        <FluxPaneHeader
                            icon="file-lines"
                            title="Top pages">
                            <template #after>
                                <FluxSecondaryButton
                                    icon-trailing="arrow-right"
                                    label="All pages"
                                    type="route"
                                    :to="{name: 'behavior'}"/>
                            </template>
                        </FluxPaneHeader>

                        <FluxPane>
                            <FluxItemStack>
                                <FluxItem
                                    v-for="page of topPages"
                                    :key="page.id">
                                    <FluxItemMedia
                                        is-center
                                        :size="36">
                                        <FluxBoxedIcon
                                            color="gray"
                                            name="file-lines"
                                            :size="36"/>
                                    </FluxItemMedia>
                                    <FluxItemContent is-center>
                                        <strong>{{ page.title }}</strong>
                                        <span class="path">{{ page.path }}</span>
                                    </FluxItemContent>
                                    <FluxItemActions is-center>
                                        <span class="metric">{{ formatCompact(page.pageviews) }}</span>
                                    </FluxItemActions>
                                </FluxItem>
                            </FluxItemStack>
                        </FluxPane>
                    </FluxLayerPane>
                </FluxGridColumn>

                <FluxGridColumn
                    :lg="5"
                    :xs="12">
                    <FluxLayerPane>
                        <FluxPaneHeader
                            icon="share-nodes"
                            title="Top channels">
                            <template #after>
                                <FluxSecondaryButton
                                    icon-trailing="arrow-right"
                                    label="Acquisition"
                                    type="route"
                                    :to="{name: 'acquisition'}"/>
                            </template>
                        </FluxPaneHeader>

                        <FluxPane>
                            <FluxItemStack>
                                <FluxItem
                                    v-for="entry of topChannels"
                                    :key="entry.channel">
                                    <FluxItemMedia
                                        is-center
                                        :size="36">
                                        <FluxBoxedIcon
                                            :color="CHANNEL[entry.channel].color"
                                            :name="CHANNEL[entry.channel].icon"
                                            :size="36"/>
                                    </FluxItemMedia>
                                    <FluxItemContent is-center>
                                        <strong>{{ CHANNEL[entry.channel].label }}</strong>
                                        <span class="path">{{ formatPercent(entry.share) }} of sessions</span>
                                    </FluxItemContent>
                                    <FluxItemActions is-center>
                                        <span class="metric">{{ formatCompact(entry.periodSessions) }}</span>
                                    </FluxItemActions>
                                </FluxItem>
                            </FluxItemStack>
                        </FluxPane>
                    </FluxLayerPane>
                </FluxGridColumn>
            </FluxGrid>
        </FluxApplicationSection>

        <FluxApplicationSection
            info="Where your visitors are based"
            title="Top countries">
            <FluxStatisticsPercentageBar :items="countryItems"/>
        </FluxApplicationSection>
    </FluxApplicationContent>
</template>

<script
    lang="ts"
    setup>
    import { FluxApplicationContent, FluxApplicationSection } from '@flux-ui/application';
    import { FluxBoxedIcon, FluxGrid, FluxGridColumn, FluxItem, FluxItemActions, FluxItemContent, FluxItemMedia, FluxItemStack, FluxLayerPane, FluxNotice, FluxNoticeStack, FluxPane, FluxPaneHeader, FluxSecondaryButton } from '@flux-ui/components';
    import { FluxStatisticsAreaChart, FluxStatisticsChange, FluxStatisticsChartPane, FluxStatisticsDonutChart, FluxStatisticsGrid, FluxStatisticsKpi, FluxStatisticsLegend, FluxStatisticsMetric, FluxStatisticsSparkline } from '@flux-ui/statistics';
    import type { FluxColor, FluxIconName, FluxStatisticsChartAreaSeries, FluxStatisticsChartPieSlice, FluxStatisticsPercentageBarItemObject } from '@flux-ui/types';
    import { computed } from 'vue';
    import { defineTitle } from '@/composable';
    import { useAnalyticsStore } from '@/store';
    import type { AlertType } from '@/types';
    import { CHANNEL, formatCompact, formatCurrency, formatDuration, formatPercent, formatRate, paletteColor, trend } from '@/util';

    defineTitle('grid-2', 'Overview');

    const ALERT_META: Record<AlertType, { color: FluxColor; icon: FluxIconName }> = {
        spike: {color: 'success', icon: 'arrow-trend-up'},
        drop: {color: 'danger', icon: 'arrow-trend-down'},
        goal: {color: 'primary', icon: 'bullseye'},
        anomaly: {color: 'warning', icon: 'triangle-exclamation'},
        system: {color: 'info', icon: 'circle-info'}
    };

    const {current, totals, previousTotals, labels, periodLabel, channelPeriod, pages, countries, alerts} = useAnalyticsStore();

    const topAlert = computed(() => {
        const alert = alerts.value.find(entry => !entry.read) ?? alerts.value[0];
        return alert ? {body: alert.body, ...ALERT_META[alert.type]} : null;
    });

    const pageviewsData = computed(() => current.value.map(metric => metric.pageviews));
    const newVisitorsData = computed(() => current.value.map(metric => metric.newVisitors));
    const revenueData = computed(() => current.value.map(metric => metric.revenue));

    const trafficSeries = computed<FluxStatisticsChartAreaSeries[]>(() => [
        {name: 'Visitors', color: 'var(--primary-400)', data: current.value.map(metric => metric.visitors)},
        {name: 'Sessions', color: 'var(--info-400)', data: current.value.map(metric => metric.sessions)}
    ]);

    const channelSlices = computed<FluxStatisticsChartPieSlice[]>(() => channelPeriod.value.map(entry => ({
        label: CHANNEL[entry.channel].label,
        value: entry.periodSessions,
        color: `var(--${CHANNEL[entry.channel].color}-400)`
    })));

    const totalChannelSessions = computed(() => channelPeriod.value.reduce((acc, entry) => acc + entry.periodSessions, 0));

    const topChannels = computed(() => channelPeriod.value.slice(0, 5).map(entry => ({
        ...entry,
        share: totalChannelSessions.value === 0 ? 0 : (entry.periodSessions / totalChannelSessions.value) * 100
    })));

    const topPages = computed(() => pages.value.slice(0, 6));

    const countryItems = computed<FluxStatisticsPercentageBarItemObject[]>(() => countries.value.slice(0, 6).map((country, index) => ({
        label: country.name,
        value: country.sessions,
        color: paletteColor(index),
        displayValue: formatCompact(country.sessions)
    })));
</script>

<style scoped>
    .path {
        font-variant-numeric: tabular-nums;
        color: var(--gray-500);
    }

    .metric {
        font-weight: 600;
        font-variant-numeric: tabular-nums;
        color: var(--foreground);
    }
</style>
