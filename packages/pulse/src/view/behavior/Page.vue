<template>
    <FluxApplicationContent layout="dashboard">
        <FluxApplicationSection :info="periodLabel">
            <FluxStatisticsGrid
                :gap="18"
                :lg="4"
                :sm="2"
                :xs="1">
                <FluxStatisticsKpi
                    icon="eye"
                    title="Pageviews"
                    :value="formatCompact(totals.pageviews)"/>
                <FluxStatisticsKpi
                    icon="file-lines"
                    title="Pages / session"
                    :value="totals.pagesPerSession.toFixed(2)"/>
                <FluxStatisticsKpi
                    icon="clock"
                    title="Avg. time on page"
                    :value="formatDuration(avgTimeOnPage)"/>
                <FluxStatisticsKpi
                    icon="arrow-trend-down"
                    title="Bounce rate"
                    :value="formatRate(totals.bounceRate)"/>
            </FluxStatisticsGrid>
        </FluxApplicationSection>

        <FluxApplicationSection
            info="Most viewed pages this period"
            title="Top pages">
            <FluxDataTable
                is-hoverable
                is-sticky
                :fill-columns="7"
                :items="visiblePages"
                :limits="[10, 25, 50]"
                :page="page"
                :per-page="perPage"
                :total="filteredPages.length"
                @limit="value => perPage = value"
                @navigate="value => pageNumber = value">
                <template #filter>
                    <FluxTableBar>
                        <FluxFilterBar
                            v-model="filterState"
                            v-model:search="search"
                            is-searchable
                            search-placeholder="Search pages…">
                            <FluxFilterOption
                                icon="folder"
                                label="Section"
                                name="section"
                                :options="sectionOptions"/>
                        </FluxFilterBar>
                    </FluxTableBar>
                </template>

                <template #header>
                    <FluxTableHeader>Page</FluxTableHeader>
                    <FluxTableHeader is-shrinking>Section</FluxTableHeader>
                    <FluxTableHeader is-shrinking>Pageviews</FluxTableHeader>
                    <FluxTableHeader is-shrinking>Unique</FluxTableHeader>
                    <FluxTableHeader is-shrinking>Avg. time</FluxTableHeader>
                    <FluxTableHeader is-shrinking>Bounce</FluxTableHeader>
                    <FluxTableHeader is-shrinking/>
                </template>

                <template #page="{item}">
                    <FluxTableCell content-direction="column">
                        <strong>{{ item.title }}</strong>
                        <small>{{ item.path }}</small>
                    </FluxTableCell>
                </template>

                <template #section="{item}">
                    <FluxTableCell>
                        <FluxChip :label="item.section"/>
                    </FluxTableCell>
                </template>

                <template #pageviews="{item}">
                    <FluxTableCell>{{ formatNumber(item.pageviews) }}</FluxTableCell>
                </template>

                <template #unique="{item}">
                    <FluxTableCell>{{ formatNumber(item.uniqueViews) }}</FluxTableCell>
                </template>

                <template #avgtime="{item}">
                    <FluxTableCell>{{ formatDuration(item.avgSeconds) }}</FluxTableCell>
                </template>

                <template #bounce="{item}">
                    <FluxTableCell>{{ formatRate(item.bounceRate) }}</FluxTableCell>
                </template>

                <template #actions="{item}">
                    <FluxTableCell>
                        <FluxTableActions>
                            <FluxTooltip content="Details">
                                <FluxAction
                                    icon="eye"
                                    @click="selected = item"/>
                            </FluxTooltip>
                        </FluxTableActions>
                    </FluxTableCell>
                </template>
            </FluxDataTable>
        </FluxApplicationSection>

        <FluxApplicationSection>
            <FluxGrid>
                <FluxGridColumn
                    :lg="6"
                    :xs="12">
                    <FluxLayerPane>
                        <FluxPaneHeader
                            icon="folder"
                            title="Site structure"/>
                        <FluxPane>
                            <div class="tree">
                                <FluxTreeView
                                    :options="tree"
                                    @click="onTreeSelect"/>
                            </div>
                        </FluxPane>
                    </FluxLayerPane>
                </FluxGridColumn>

                <FluxGridColumn
                    :lg="6"
                    :xs="12">
                    <FluxStatisticsChartPane
                        icon="chart-bar"
                        title="Top events"
                        :aspect-ratio="1.7">
                        <FluxStatisticsBarChart
                            :labels="eventLabels"
                            :series="eventSeries"
                            tooltip/>
                    </FluxStatisticsChartPane>
                </FluxGridColumn>
            </FluxGrid>
        </FluxApplicationSection>

        <FluxApplicationSection title="Engagement">
            <FluxGrid>
                <FluxGridColumn
                    :lg="7"
                    :xs="12">
                    <FluxStatisticsChartPane
                        icon="chart-simple"
                        title="Time on page vs. pageviews"
                        :aspect-ratio="1.9">
                        <FluxStatisticsScatterChart
                            :series="scatterSeries"
                            tooltip
                            x-axis-labels
                            y-axis-labels/>
                    </FluxStatisticsChartPane>
                </FluxGridColumn>

                <FluxGridColumn
                    :lg="5"
                    :xs="12">
                    <FluxStatisticsChartPane
                        icon="gauge-high"
                        title="Scroll depth"
                        :aspect-ratio="1.6">
                        <FluxStatisticsRadialBar
                            :series="scrollSeries"
                            tooltip/>
                    </FluxStatisticsChartPane>
                </FluxGridColumn>
            </FluxGrid>
        </FluxApplicationSection>

        <FluxApplicationSection title="Entry & exit pages">
            <FluxGrid>
                <FluxGridColumn
                    :lg="6"
                    :xs="12">
                    <FluxLayerPane>
                        <FluxPaneHeader
                            icon="arrow-right"
                            title="Top entry pages"/>
                        <FluxPane>
                            <FluxPaneBody>
                                <FluxStatisticsPercentageBar :items="entryItems"/>
                            </FluxPaneBody>
                        </FluxPane>
                    </FluxLayerPane>
                </FluxGridColumn>

                <FluxGridColumn
                    :lg="6"
                    :xs="12">
                    <FluxLayerPane>
                        <FluxPaneHeader
                            icon="arrow-up-right-from-square"
                            title="Top exit pages"/>
                        <FluxPane>
                            <FluxPaneBody>
                                <FluxStatisticsPercentageBar :items="exitItems"/>
                            </FluxPaneBody>
                        </FluxPane>
                    </FluxLayerPane>
                </FluxGridColumn>
            </FluxGrid>
        </FluxApplicationSection>

        <FluxSlideOver
            is-closeable
            @close="selected = null">
            <FluxPane
                v-if="selected"
                class="detail">
                <FluxPaneHeader
                    icon="file-lines"
                    :subtitle="selected.path"
                    :title="selected.title"/>
                <FluxPaneBody>
                    <FluxStatisticsDetailsTable title="Metric">
                        <FluxStatisticsDetailsTableRow
                            label="Pageviews"
                            :value="formatNumber(selected.pageviews)"/>
                        <FluxStatisticsDetailsTableRow
                            label="Unique views"
                            :value="formatNumber(selected.uniqueViews)"/>
                        <FluxStatisticsDetailsTableRow
                            label="Entrances"
                            :value="formatNumber(selected.entrances)"/>
                        <FluxStatisticsDetailsTableRow
                            label="Avg. time on page"
                            :value="formatDuration(selected.avgSeconds)"/>
                        <FluxStatisticsDetailsTableRow
                            label="Bounce rate"
                            :value="formatRate(selected.bounceRate)"/>
                        <FluxStatisticsDetailsTableRow
                            label="Exit rate"
                            :value="formatRate(selected.exitRate)"/>
                    </FluxStatisticsDetailsTable>
                </FluxPaneBody>
                <FluxPaneFooter>
                    <FluxSecondaryButton
                        icon-leading="arrow-up-right-from-square"
                        label="Open page"
                        @click="onOpenPage()"/>
                    <FluxSpacer/>
                    <FluxPrimaryButton
                        icon-leading="check"
                        label="Done"
                        @click="selected = null"/>
                </FluxPaneFooter>
            </FluxPane>
        </FluxSlideOver>
    </FluxApplicationContent>
</template>

<script
    lang="ts"
    setup>
    import { FluxApplicationContent, FluxApplicationSection } from '@flux-ui/application';
    import { FluxAction, FluxChip, FluxDataTable, FluxFilterBar, FluxFilterOption, FluxGrid, FluxGridColumn, FluxLayerPane, FluxPane, FluxPaneBody, FluxPaneFooter, FluxPaneHeader, FluxPrimaryButton, FluxSecondaryButton, FluxSlideOver, FluxSpacer, FluxTableActions, FluxTableBar, FluxTableCell, FluxTableHeader, FluxTooltip, FluxTreeView, showSnackbar } from '@flux-ui/components';
    import { FluxStatisticsBarChart, FluxStatisticsChartPane, FluxStatisticsDetailsTable, FluxStatisticsDetailsTableRow, FluxStatisticsGrid, FluxStatisticsKpi, FluxStatisticsPercentageBar, FluxStatisticsRadialBar, FluxStatisticsScatterChart } from '@flux-ui/statistics';
    import type { FluxFilterState, FluxStatisticsChartBarSeries, FluxStatisticsChartGaugeSeries, FluxStatisticsChartScatterSeries, FluxStatisticsPercentageBarItemObject, FluxTreeViewOption } from '@flux-ui/types';
    import { computed, ref } from 'vue';
    import { defineTitle } from '@/composable';
    import { useAnalyticsStore } from '@/store';
    import type { PageStat } from '@/types';
    import { formatCompact, formatDuration, formatNumber, formatRate, paletteColor } from '@/util';

    defineTitle('arrow-pointer', 'Behavior');

    const {totals, periodLabel, pages, events} = useAnalyticsStore();

    const pageNumber = ref(1);
    const perPage = ref(10);
    const search = ref('');
    const filterState = ref<FluxFilterState>({section: null});
    const selected = ref<PageStat | null>(null);

    const page = computed(() => pageNumber.value);

    const sectionOptions = computed(() => [...new Set(pages.value.map(entry => entry.section))].sort().map(section => ({label: section, value: section})));

    const avgTimeOnPage = computed(() => {
        const totalViews = pages.value.reduce((acc, entry) => acc + entry.pageviews, 0);
        if (totalViews === 0) {
            return 0;
        }
        return pages.value.reduce((acc, entry) => acc + entry.avgSeconds * entry.pageviews, 0) / totalViews;
    });

    const filteredPages = computed(() => pages.value.filter(entry => {
        const {section} = filterState.value;
        const matchesSection = section === null || section === undefined || entry.section === section;
        const matchesSearch = search.value === '' || entry.title.toLowerCase().includes(search.value.toLowerCase()) || entry.path.toLowerCase().includes(search.value.toLowerCase());
        return matchesSection && matchesSearch;
    }));

    const visiblePages = computed(() => filteredPages.value.slice((pageNumber.value - 1) * perPage.value, pageNumber.value * perPage.value));

    const tree = computed<FluxTreeViewOption[]>(() => {
        const sections = new Map<string, PageStat[]>();

        for (const entry of pages.value) {
            const list = sections.get(entry.section) ?? [];
            list.push(entry);
            sections.set(entry.section, list);
        }

        return [...sections.entries()].map(([section, list]) => ({
            id: `section-${section}`,
            label: section,
            icon: 'folder',
            children: list.map(entry => ({id: entry.id, label: entry.title, icon: 'file-lines'}))
        }));
    });

    const eventLabels = computed(() => events.value.slice(0, 8).map(entry => entry.name));
    const eventSeries = computed<FluxStatisticsChartBarSeries[]>(() => [
        {name: 'Events', color: 'var(--primary-400)', data: events.value.slice(0, 8).map(entry => entry.count)}
    ]);

    const scatterSeries = computed<FluxStatisticsChartScatterSeries[]>(() => [{
        name: 'Pages',
        color: 'var(--primary-400)',
        data: pages.value.map(entry => ({x: entry.avgSeconds, y: entry.pageviews}))
    }]);

    const scrollSeries = computed<FluxStatisticsChartGaugeSeries[]>(() => [
        {name: '25%', value: 94, color: 'var(--primary-400)'},
        {name: '50%', value: 76, color: 'var(--info-400)'},
        {name: '75%', value: 52, color: 'var(--warning-400)'},
        {name: '100%', value: 31, color: 'var(--success-400)'}
    ]);

    const entryItems = computed<FluxStatisticsPercentageBarItemObject[]>(() => [...pages.value]
        .sort((a, b) => b.entrances - a.entrances)
        .slice(0, 6)
        .map((entry, index) => ({label: entry.title, value: entry.entrances, color: paletteColor(index), displayValue: formatCompact(entry.entrances)})));

    const exitItems = computed<FluxStatisticsPercentageBarItemObject[]>(() => [...pages.value]
        .map(entry => ({page: entry, exits: Math.round(entry.pageviews * entry.exitRate)}))
        .sort((a, b) => b.exits - a.exits)
        .slice(0, 6)
        .map((entry, index) => ({label: entry.page.title, value: entry.exits, color: paletteColor(index), displayValue: formatCompact(entry.exits)})));

    function onTreeSelect(option: FluxTreeViewOption): void {
        const match = pages.value.find(entry => entry.id === option.id);
        if (match) {
            selected.value = match;
        }
    }

    function onOpenPage(): void {
        showSnackbar({icon: 'arrow-up-right-from-square', message: `Opening “${selected.value?.path}” is not available in this demo.`});
    }
</script>

<style scoped>
    .tree {
        padding: 12px;
    }

    .detail {
        width: min(450px, 100dvw - 30px);
    }
</style>
