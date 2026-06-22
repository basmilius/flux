<template>
    <FluxApplicationContent layout="dashboard">
        <FluxApplicationSection>
            <FluxNotice
                color="primary"
                icon="bolt"
                message="Live view — active users and events update every couple of seconds."/>
        </FluxApplicationSection>

        <FluxApplicationSection>
            <FluxStatisticsGrid
                :gap="18"
                :lg="4"
                :sm="2"
                :xs="1">
                <FluxStatisticsKpi
                    icon="users"
                    title="Active users"
                    :value="formatNumber(activeUsers)"/>
                <FluxStatisticsKpi
                    icon="eye"
                    title="Pageviews / min"
                    :value="formatNumber(pageviewsPerMinute)"/>
                <FluxStatisticsKpi
                    icon="globe"
                    title="Active countries"
                    :value="formatNumber(activeCountries.length)"/>
                <FluxStatisticsKpi
                    icon="file-lines"
                    title="Top active page"
                    :value="topPage"/>
            </FluxStatisticsGrid>
        </FluxApplicationSection>

        <FluxApplicationSection title="Pageviews per minute">
            <FluxStatisticsChartPane
                icon="chart-bar"
                title="Last 30 minutes"
                :aspect-ratio="3.4">
                <FluxStatisticsBarChart
                    :labels="minuteLabels"
                    :series="perMinuteSeries"
                    tooltip/>
            </FluxStatisticsChartPane>
        </FluxApplicationSection>

        <FluxApplicationSection>
            <FluxGrid>
                <FluxGridColumn
                    :lg="7"
                    :xs="12">
                    <FluxLayerPane>
                        <FluxPaneHeader
                            icon="file-lines"
                            title="Active pages"/>
                        <FluxPane>
                            <FluxItemStack>
                                <FluxItem
                                    v-for="page of activePages"
                                    :key="page.path">
                                    <FluxItemContent is-center>
                                        <strong>{{ page.title }}</strong>
                                        <span class="muted">{{ page.path }}</span>
                                    </FluxItemContent>
                                    <FluxItemActions is-center>
                                        <FluxBadge
                                            color="primary"
                                            :label="`${page.users}`"/>
                                    </FluxItemActions>
                                </FluxItem>
                            </FluxItemStack>
                        </FluxPane>
                    </FluxLayerPane>
                </FluxGridColumn>

                <FluxGridColumn
                    :lg="5"
                    :xs="12">
                    <FluxStatisticsChartPane
                        icon="chart-pie"
                        title="Active by source"
                        :aspect-ratio="1.4">
                        <FluxStatisticsDonutChart :slices="sourceSlices"/>
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
                            icon="bolt"
                            title="Live events"/>
                        <FluxPane>
                            <FluxPaneBody>
                                <FluxTimeline>
                                    <FluxTimelineItem
                                        v-for="event of liveEvents"
                                        :key="event.id"
                                        :color="EVENT[event.event].color"
                                        :icon="EVENT[event.event].icon"
                                        :title="EVENT[event.event].label"
                                        :when="`${event.secondsAgo}s ago`">
                                        {{ event.page }} · {{ event.country }} · {{ DEVICE[event.device].label }}
                                    </FluxTimelineItem>
                                </FluxTimeline>
                            </FluxPaneBody>
                        </FluxPane>
                    </FluxLayerPane>
                </FluxGridColumn>

                <FluxGridColumn
                    :lg="6"
                    :xs="12">
                    <FluxLayerPane>
                        <FluxPaneHeader
                            icon="globe"
                            title="Active by country"/>
                        <FluxPane>
                            <FluxPaneBody>
                                <FluxStatisticsDetailsTable title="Country">
                                    <FluxStatisticsDetailsTableRow
                                        v-for="country of activeCountries"
                                        :key="country.code"
                                        :label="country.name"
                                        :value="`${country.users}`"/>
                                </FluxStatisticsDetailsTable>
                            </FluxPaneBody>
                        </FluxPane>
                    </FluxLayerPane>
                </FluxGridColumn>
            </FluxGrid>
        </FluxApplicationSection>
    </FluxApplicationContent>
</template>

<script
    lang="ts"
    setup>
    import { FluxApplicationContent, FluxApplicationSection } from '@flux-ui/application';
    import { FluxBadge, FluxGrid, FluxGridColumn, FluxItem, FluxItemActions, FluxItemContent, FluxItemStack, FluxLayerPane, FluxNotice, FluxPane, FluxPaneBody, FluxPaneHeader, FluxTimeline, FluxTimelineItem } from '@flux-ui/components';
    import { FluxStatisticsBarChart, FluxStatisticsChartPane, FluxStatisticsDetailsTable, FluxStatisticsDetailsTableRow, FluxStatisticsDonutChart, FluxStatisticsGrid, FluxStatisticsKpi, FluxStatisticsLegend } from '@flux-ui/statistics';
    import type { FluxStatisticsChartBarSeries, FluxStatisticsChartPieSlice } from '@flux-ui/types';
    import { computed, onMounted, onUnmounted } from 'vue';
    import { defineTitle } from '@/composable';
    import { useRealtimeStore } from '@/store';
    import { CHANNEL, DEVICE, EVENT, formatNumber } from '@/util';

    defineTitle('bolt', 'Realtime');

    const {activeUsers, perMinute, liveEvents, activePages, activeCountries, activeSources, start, stop} = useRealtimeStore();

    onMounted(() => start());
    onUnmounted(() => stop());

    const pageviewsPerMinute = computed(() => perMinute.value.length === 0 ? 0 : Math.round(perMinute.value.reduce((acc, value) => acc + value, 0) / perMinute.value.length));
    const topPage = computed(() => activePages.value[0]?.title ?? '—');

    const minuteLabels = computed(() => perMinute.value.map((_, index) => index === perMinute.value.length - 1 ? 'now' : `-${perMinute.value.length - 1 - index}`));

    const perMinuteSeries = computed<FluxStatisticsChartBarSeries[]>(() => [
        {name: 'Pageviews', color: 'var(--primary-400)', data: perMinute.value}
    ]);

    const sourceSlices = computed<FluxStatisticsChartPieSlice[]>(() => activeSources.value.map(source => ({
        label: CHANNEL[source.channel].label,
        value: source.users,
        color: `var(--${CHANNEL[source.channel].color}-400)`
    })));
</script>

<style scoped>
    .muted {
        font-variant-numeric: tabular-nums;
        color: var(--gray-500);
    }
</style>
