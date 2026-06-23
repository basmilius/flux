<template>
    <FluxApplicationContent layout="dashboard">
        <FluxApplicationSection>
            <FluxNoticeStack>
                <FluxNotice
                    color="info"
                    icon="rocket"
                    message="Welcome to Nimbus — a demo agency workspace. Everything you change resets on reload."/>
                <FluxNotice
                    v-if="overdueInvoices > 0"
                    color="warning"
                    icon="triangle-exclamation"
                    :message="`${overdueInvoices} invoice(s) are overdue and need attention.`"/>
            </FluxNoticeStack>
        </FluxApplicationSection>

        <FluxApplicationSection>
            <FluxStatisticsGrid
                :gap="18"
                :lg="5"
                :sm="2"
                :xs="1">
                <FluxStatisticsKpi
                    :change="{color: 'success', icon: 'arrow-trend-up', value: '+2'}"
                    footer="vs. last month"
                    icon="diagram-project"
                    title="Active projects"
                    :value="activeProjects"/>

                <FluxStatisticsKpi
                    :change="{color: 'gray', icon: 'arrow-trend-up', value: '+14'}"
                    footer="across all projects"
                    icon="list-check"
                    title="Open tasks"
                    :value="openTasks"/>

                <FluxStatisticsKpi
                    :change="{color: 'success', icon: 'arrow-trend-up', value: '+12.7%'}"
                    footer="open opportunities"
                    icon="sack-dollar"
                    title="Pipeline"
                    :value="pipelineValue"/>

                <FluxStatisticsKpi
                    :change="{color: 'warning', icon: 'arrow-trend-down', value: '-4.2%'}"
                    footer="awaiting payment"
                    icon="file-invoice-dollar"
                    title="Outstanding"
                    :value="outstandingValue"/>

                <FluxStatisticsKpi
                    :change="{color: 'success', icon: 'arrow-trend-up', value: '+3.1%'}"
                    footer="average completion"
                    icon="gauge-high"
                    title="Avg. progress"
                    :value="`${avgProgress}%`"/>
            </FluxStatisticsGrid>
        </FluxApplicationSection>

        <FluxApplicationSection>
            <FluxGrid>
                <FluxGridColumn
                    :lg="8"
                    :xs="12">
                    <FluxStatisticsChartPane
                        icon="chart-area"
                        title="Revenue trend"
                        :aspect-ratio="2.4">
                        <template #info>
                            <p>Invoiced revenue across the last twelve months.</p>
                        </template>
                        <FluxStatisticsAreaChart
                            :labels="months"
                            :series="revenueSeries"
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
                        title="Tasks by status"
                        :aspect-ratio="1.4">
                        <FluxStatisticsDonutChart :slices="taskSlices"/>
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
                    footer="last 12 weeks"
                    icon="sack-dollar"
                    title="Revenue"
                    :value="totalBudget">
                    <FluxStatisticsSparkline
                        color="primary"
                        :series="[{data: sparkRevenue}]"
                        variant="area"/>
                </FluxStatisticsMetric>

                <FluxStatisticsMetric
                    footer="tasks completed"
                    icon="list-check"
                    title="Throughput"
                    :value="`${doneCount} done`">
                    <FluxStatisticsSparkline
                        color="success"
                        :series="[{data: sparkTasks}]"
                        variant="bar"/>
                </FluxStatisticsMetric>

                <FluxStatisticsMetric
                    footer="open opportunities"
                    icon="sack-dollar"
                    title="Pipeline"
                    :value="pipelineValue">
                    <FluxStatisticsChange
                        color="success"
                        icon="arrow-trend-up"
                        value="+12.7%"/>
                    <FluxStatisticsSparkline
                        color="info"
                        :series="[{data: sparkPipeline}]"
                        variant="line"/>
                </FluxStatisticsMetric>
            </FluxStatisticsGrid>
        </FluxApplicationSection>

        <FluxApplicationSection title="Jump back in">
            <FluxScroller
                direction="horizontal"
                has-fade>
                <FluxFlex :gap="12">
                    <FluxFlexItem
                        v-for="project of projects"
                        :key="project.id"
                        style="min-width: 246px">
                        <FluxClickablePane
                            type="route"
                            :to="{name: 'project', params: {id: project.id}}">
                            <FluxItem>
                                <FluxItemMedia
                                    is-center
                                    :size="36">
                                    <FluxBoxedIcon
                                        :color="project.color"
                                        :name="project.icon"
                                        :size="36"/>
                                </FluxItemMedia>
                                <FluxItemContent is-center>
                                    <strong>{{ project.name }}</strong>
                                    <span>{{ project.progress }}% complete</span>
                                </FluxItemContent>
                            </FluxItem>
                        </FluxClickablePane>
                    </FluxFlexItem>
                </FluxFlex>
            </FluxScroller>
        </FluxApplicationSection>

        <FluxApplicationSection>
            <FluxGrid>
                <FluxGridColumn
                    :lg="7"
                    :xs="12">
                    <FluxLayerPane>
                        <FluxPaneHeader
                            icon="diagram-project"
                            title="Active projects">
                            <template #after>
                                <FluxSecondaryButton
                                    icon-trailing="arrow-right"
                                    label="View all"
                                    type="route"
                                    :to="{name: 'projects'}"/>
                            </template>
                        </FluxPaneHeader>

                        <FluxClickablePane
                            v-for="project of topProjects"
                            :key="project.id"
                            type="route"
                            variant="flat"
                            :to="{name: 'project', params: {id: project.id}}">
                            <FluxItem>
                                <FluxItemMedia
                                    is-center
                                    :size="40">
                                    <FluxBoxedIcon
                                        :color="project.color"
                                        :name="project.icon"
                                        :size="40"/>
                                </FluxItemMedia>

                                <FluxItemContent is-center>
                                    <strong>{{ project.name }}</strong>
                                    <span>{{ clientName(project.clientId) }}</span>
                                </FluxItemContent>

                                <FluxItemActions is-center>
                                    <StatusBadge :meta="PROJECT_STATUS[project.status]"/>
                                    <FluxText
                                        color="muted"
                                        tabular>{{ project.progress }}%</FluxText>
                                </FluxItemActions>
                            </FluxItem>
                        </FluxClickablePane>
                    </FluxLayerPane>
                </FluxGridColumn>

                <FluxGridColumn
                    :lg="5"
                    :xs="12">
                    <FluxLayerPane>
                        <FluxPaneHeader
                            icon="calendar-days"
                            title="Upcoming">
                            <template #after>
                                <FluxSecondaryButton
                                    icon-trailing="arrow-right"
                                    label="Calendar"
                                    type="route"
                                    :to="{name: 'calendar'}"/>
                            </template>
                        </FluxPaneHeader>

                        <FluxPane>
                            <FluxItemStack>
                                <FluxItem
                                    v-for="event of upcomingEvents"
                                    :key="event.id">
                                    <FluxItemMedia
                                        is-center
                                        :size="40">
                                        <FluxBoxedIcon
                                            :color="event.color"
                                            name="calendar"
                                            :size="40"/>
                                    </FluxItemMedia>

                                    <FluxItemContent is-center>
                                        <strong>{{ event.title }}</strong>
                                        <span>{{ event.date.toFormat('cccc, LLL d · HH:mm') }}</span>
                                    </FluxItemContent>
                                </FluxItem>
                            </FluxItemStack>
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
                            icon="comments"
                            title="Recent activity">
                            <template #after>
                                <FluxSecondaryButton
                                    icon-trailing="arrow-right"
                                    label="View all"
                                    type="route"
                                    :to="{name: 'activity'}"/>
                            </template>
                        </FluxPaneHeader>

                        <FluxPane>
                            <FluxPaneBody>
                                <FluxTimeline>
                                    <FluxTimelineItem
                                        v-for="entry of recentActivity"
                                        :key="entry.id"
                                        :color="memberColor(entry.authorId)"
                                        icon="circle"
                                        :title="memberName(entry.authorId)"
                                        :when="entry.postedAt.toRelative() ?? ''">
                                        {{ entry.message }}
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
                            icon="bullseye"
                            title="Company goals">
                            <template #after>
                                <FluxSecondaryButton
                                    icon-trailing="arrow-right"
                                    label="View all"
                                    type="route"
                                    :to="{name: 'goals'}"/>
                            </template>
                        </FluxPaneHeader>

                        <FluxPane>
                            <FluxPaneBody>
                                <FluxFlex
                                    direction="vertical"
                                    :gap="15">
                                    <FluxFlex
                                        v-for="goal of goals"
                                        :key="goal.id"
                                        direction="vertical"
                                        :gap="6">
                                        <FluxFlex
                                            align="center"
                                            justify="between">
                                            <FluxText
                                                size="small"
                                                :weight="500">{{ goal.title }}</FluxText>
                                            <FluxText
                                                color="muted"
                                                size="small"
                                                tabular>{{ goal.progress }}%</FluxText>
                                        </FluxFlex>
                                        <FluxProgressBar
                                            :color="goal.color"
                                            :max="100"
                                            :value="goal.progress"/>
                                    </FluxFlex>
                                </FluxFlex>
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
    import { FluxBoxedIcon, FluxClickablePane, FluxFlex, FluxFlexItem, FluxGrid, FluxGridColumn, FluxItem, FluxItemActions, FluxItemContent, FluxItemMedia, FluxItemStack, FluxLayerPane, FluxNotice, FluxNoticeStack, FluxPane, FluxPaneBody, FluxPaneHeader, FluxProgressBar, FluxScroller, FluxSecondaryButton, FluxText, FluxTimeline, FluxTimelineItem } from '@flux-ui/components';
    import { FluxStatisticsAreaChart, FluxStatisticsChange, FluxStatisticsChartPane, FluxStatisticsDonutChart, FluxStatisticsGrid, FluxStatisticsKpi, FluxStatisticsLegend, FluxStatisticsMetric, FluxStatisticsSparkline } from '@flux-ui/statistics';
    import type { FluxColor, FluxStatisticsChartAreaSeries, FluxStatisticsChartPieSlice } from '@flux-ui/types';
    import { computed, onMounted } from 'vue';
    import StatusBadge from '@/component/StatusBadge.vue';
    import { defineTitle } from '@/composable';
    import { useActivityStore, useClientsStore, useDealsStore, useEventsStore, useGoalsStore, useInvoicesStore, useProjectsStore, useTeamStore, useUiStore } from '@/store';
    import type { Id, TaskStatus } from '@/types';
    import { formatCurrency, PROJECT_STATUS, TASK_STATUS_COLORS, TASK_STATUS_LABELS } from '@/util';

    defineTitle('grid-2', 'Dashboard');

    const {projects, tasks} = useProjectsStore();
    const {getClient} = useClientsStore();
    const {getMember} = useTeamStore();
    const {upcoming} = useEventsStore();
    const {recent} = useActivityStore();
    const {openValue} = useDealsStore();
    const {outstanding, invoices} = useInvoicesStore();
    const {goals} = useGoalsStore();
    const {tourSeen, startTour} = useUiStore();

    const months = ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

    const activeProjects = computed(() => projects.value.filter(project => project.status === 'active').length);
    const openTasks = computed(() => tasks.value.filter(task => task.status !== 'done').length);
    const pipelineValue = computed(() => formatCurrency(openValue.value));
    const outstandingValue = computed(() => formatCurrency(outstanding.value));
    const overdueInvoices = computed(() => invoices.value.filter(invoice => invoice.status === 'overdue').length);
    const doneCount = computed(() => tasks.value.filter(task => task.status === 'done').length);
    const totalBudget = computed(() => formatCurrency(projects.value.reduce((sum, project) => sum + project.budget, 0)));

    const sparkRevenue = [12, 14, 13, 16, 18, 17, 20, 22, 21, 24, 26, 28];
    const sparkTasks = [4, 6, 5, 8, 7, 9, 6, 10, 8, 11, 9, 12];
    const sparkPipeline = [30, 32, 31, 35, 34, 38, 36, 40, 42, 41, 44, 46];

    const avgProgress = computed(() => {
        if (projects.value.length === 0) {
            return 0;
        }

        return Math.round(projects.value.reduce((sum, project) => sum + project.progress, 0) / projects.value.length);
    });

    const revenueSeries = computed<FluxStatisticsChartAreaSeries[]>(() => {
        const base = projects.value.reduce((sum, project) => sum + project.spent, 0) / 12;

        return [{
            name: 'Revenue',
            color: 'var(--primary-400)',
            data: months.map((_, index) => Math.round(base * (0.55 + index * 0.06)))
        }];
    });

    const taskSlices = computed<FluxStatisticsChartPieSlice[]>(() => {
        const statuses: TaskStatus[] = ['backlog', 'todo', 'in-progress', 'review', 'done'];

        return statuses.map(status => ({
            label: TASK_STATUS_LABELS[status],
            value: tasks.value.filter(task => task.status === status).length,
            color: `var(--${TASK_STATUS_COLORS[status]}-400)`
        }));
    });

    const topProjects = computed(() => projects.value.filter(project => project.status === 'active').slice(0, 5));
    const upcomingEvents = computed(() => upcoming(6));
    const recentActivity = computed(() => recent(7));

    function clientName(clientId: Id): string {
        return getClient(clientId)?.name ?? 'Unknown client';
    }

    function memberName(memberId: Id): string {
        return getMember(memberId)?.name ?? 'Someone';
    }

    function memberColor(memberId: Id): FluxColor {
        return getMember(memberId)?.color ?? 'primary';
    }

    onMounted(() => {
        if (!tourSeen.value) {
            startTour();
        }
    });
</script>
