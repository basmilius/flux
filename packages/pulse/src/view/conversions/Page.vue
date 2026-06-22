<template>
    <FluxApplicationContent layout="dashboard">
        <FluxApplicationSection :info="periodLabel">
            <FluxStatisticsGrid
                :gap="18"
                :lg="4"
                :sm="2"
                :xs="1">
                <FluxStatisticsKpi
                    :change="trend(totals.conversions, previousTotals.conversions)"
                    footer="goal completions"
                    icon="bullseye"
                    title="Conversions"
                    :value="formatCompact(totals.conversions)"/>
                <FluxStatisticsKpi
                    :change="trend(totals.conversionRate, previousTotals.conversionRate)"
                    footer="of all sessions"
                    icon="chart-line"
                    title="Conversion rate"
                    :value="formatRate(totals.conversionRate)"/>
                <FluxStatisticsKpi
                    :change="trend(totals.revenue, previousTotals.revenue)"
                    footer="this period"
                    icon="sack-dollar"
                    title="Revenue"
                    :value="formatCurrency(totals.revenue)"/>
                <FluxStatisticsKpi
                    :change="trend(averageOrderValue, previousAverageOrderValue)"
                    footer="per conversion"
                    icon="coins"
                    title="Avg. order value"
                    :value="formatCurrency(averageOrderValue)"/>
            </FluxStatisticsGrid>
        </FluxApplicationSection>

        <FluxApplicationSection
            info="From first visit to purchase"
            title="Conversion funnel">
            <FluxPane>
                <FluxPaneBody>
                    <div class="funnel">
                        <div
                            v-for="(step, index) of funnelSteps"
                            :key="step.name"
                            class="step">
                            <div class="step-head">
                                <span class="step-name">
                                    <FluxBoxedIcon
                                        color="primary"
                                        name="filter"
                                        :size="24"/>
                                    {{ step.name }}
                                </span>
                                <span class="step-stats">
                                    <strong>{{ formatCompact(step.users) }}</strong>
                                    <small>{{ formatPercent(step.pct) }}</small>
                                </span>
                            </div>
                            <FluxProgressBar
                                color="primary"
                                :max="100"
                                :value="step.pct"/>
                            <small
                                v-if="index > 0"
                                class="step-drop">
                                {{ formatPercent(step.fromPrevious) }} continued · {{ formatPercent(100 - step.fromPrevious) }} dropped off
                            </small>
                        </div>
                    </div>
                </FluxPaneBody>
            </FluxPane>
        </FluxApplicationSection>

        <FluxApplicationSection title="Trends">
            <FluxGrid>
                <FluxGridColumn
                    :lg="8"
                    :xs="12">
                    <FluxStatisticsChartPane
                        icon="chart-line"
                        title="Conversion rate over time"
                        :aspect-ratio="2.4">
                        <FluxStatisticsLineChart
                            :labels="labels"
                            :series="rateSeries"
                            tooltip/>
                        <template #legend>
                            <FluxStatisticsLegendScope>
                                <FluxStatisticsLegendItem
                                    color="primary"
                                    label="Conversion rate"
                                    :value="formatRate(totals.conversionRate)"/>
                            </FluxStatisticsLegendScope>
                        </template>
                    </FluxStatisticsChartPane>
                </FluxGridColumn>

                <FluxGridColumn
                    :lg="4"
                    :xs="12">
                    <FluxStatisticsChartPane
                        icon="chart-pie"
                        title="Attribution"
                        :aspect-ratio="1.4">
                        <FluxStatisticsPieChart
                            :slices="attributionSlices"
                            tooltip/>
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
                    :lg="7"
                    :xs="12">
                    <FluxStatisticsChartPane
                        icon="chart-area"
                        title="Revenue over time"
                        :aspect-ratio="2.2">
                        <FluxStatisticsAreaChart
                            :labels="labels"
                            :series="revenueSeries"
                            tooltip/>
                    </FluxStatisticsChartPane>
                </FluxGridColumn>

                <FluxGridColumn
                    :lg="5"
                    :xs="12">
                    <FluxStatisticsChartPane
                        icon="chart-bar"
                        title="Conversions by channel"
                        :aspect-ratio="1.8">
                        <FluxStatisticsBarChart
                            :labels="channelLabels"
                            :series="channelConversionSeries"
                            tooltip/>
                    </FluxStatisticsChartPane>
                </FluxGridColumn>
            </FluxGrid>
        </FluxApplicationSection>

        <FluxApplicationSection title="Goals">
            <FluxGrid>
                <FluxGridColumn
                    v-for="goal of goals"
                    :key="goal.id"
                    :lg="4"
                    :sm="6"
                    :xs="12">
                    <FluxLayerPane>
                        <FluxPaneHeader
                            :icon="GOAL[goal.type].icon"
                            :title="goal.name">
                            <template #after>
                                <FluxBadge
                                    :color="GOAL[goal.type].color"
                                    :label="formatRate(goal.conversionRate)"/>
                            </template>
                        </FluxPaneHeader>
                        <FluxPane>
                            <FluxPaneBody>
                                <div class="goal">
                                    <span class="goal-value">{{ formatNumber(goal.completions) }}</span>
                                    <span class="goal-sub">completions · {{ formatCurrency(goal.value) }} value</span>
                                    <FluxProgressBar
                                        :color="GOAL[goal.type].color"
                                        :max="100"
                                        :value="goalProgress(goal.conversionRate)"/>
                                </div>
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
    import { FluxBadge, FluxBoxedIcon, FluxGrid, FluxGridColumn, FluxLayerPane, FluxPane, FluxPaneBody, FluxPaneHeader, FluxProgressBar } from '@flux-ui/components';
    import { FluxStatisticsAreaChart, FluxStatisticsBarChart, FluxStatisticsChartPane, FluxStatisticsGrid, FluxStatisticsKpi, FluxStatisticsLegend, FluxStatisticsLegendItem, FluxStatisticsLegendScope, FluxStatisticsLineChart, FluxStatisticsPieChart } from '@flux-ui/statistics';
    import type { FluxStatisticsChartAreaSeries, FluxStatisticsChartBarSeries, FluxStatisticsChartLineSeries, FluxStatisticsChartPieSlice } from '@flux-ui/types';
    import { computed } from 'vue';
    import { defineTitle } from '@/composable';
    import { useAnalyticsStore } from '@/store';
    import { CHANNEL, formatCompact, formatCurrency, formatNumber, formatPercent, formatRate, GOAL, trend } from '@/util';

    defineTitle('bullseye', 'Conversions');

    const {current, totals, previousTotals, labels, periodLabel, channelPeriod, goals, funnel} = useAnalyticsStore();

    const averageOrderValue = computed(() => totals.value.conversions === 0 ? 0 : totals.value.revenue / totals.value.conversions);
    const previousAverageOrderValue = computed(() => previousTotals.value.conversions === 0 ? 0 : previousTotals.value.revenue / previousTotals.value.conversions);

    const funnelSteps = computed(() => {
        const top = funnel.value[0]?.users ?? 1;
        return funnel.value.map((step, index) => ({
            name: step.name,
            users: step.users,
            pct: (step.users / top) * 100,
            fromPrevious: index === 0 ? 100 : (step.users / funnel.value[index - 1].users) * 100
        }));
    });

    const rateSeries = computed<FluxStatisticsChartLineSeries[]>(() => [{
        name: 'Conversion rate',
        color: 'var(--primary-400)',
        data: current.value.map(metric => metric.sessions === 0 ? 0 : Number(((metric.conversions / metric.sessions) * 100).toFixed(2)))
    }]);

    const revenueSeries = computed<FluxStatisticsChartAreaSeries[]>(() => [{
        name: 'Revenue',
        color: 'var(--success-400)',
        data: current.value.map(metric => metric.revenue)
    }]);

    const attributionSlices = computed<FluxStatisticsChartPieSlice[]>(() => channelPeriod.value.map(entry => ({
        label: CHANNEL[entry.channel].label,
        value: Math.round(entry.periodSessions * entry.conversionRate),
        color: `var(--${CHANNEL[entry.channel].color}-400)`
    })));

    const channelLabels = computed(() => channelPeriod.value.map(entry => CHANNEL[entry.channel].label));
    const channelConversionSeries = computed<FluxStatisticsChartBarSeries[]>(() => [{
        name: 'Conversions',
        color: 'var(--primary-400)',
        data: channelPeriod.value.map(entry => Math.round(entry.periodSessions * entry.conversionRate))
    }]);

    const maxGoalRate = computed(() => Math.max(...goals.value.map(goal => goal.conversionRate), 0.0001));

    function goalProgress(rate: number): number {
        return Math.round((rate / maxGoalRate.value) * 100);
    }
</script>

<style scoped>
    .funnel {
        display: flex;
        flex-flow: column;
        gap: 18px;
    }

    .step {
        display: flex;
        flex-flow: column;
        gap: 6px;
    }

    .step-head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
    }

    .step-name {
        display: flex;
        align-items: center;
        gap: 9px;
        font-size: 14px;
        font-weight: 500;
        color: var(--foreground);
    }

    .step-stats {
        display: flex;
        align-items: baseline;
        gap: 9px;
        font-variant-numeric: tabular-nums;
    }

    .step-stats small {
        color: var(--gray-500);
    }

    .step-drop {
        color: var(--gray-500);
    }

    .goal {
        display: flex;
        flex-flow: column;
        gap: 6px;
    }

    .goal-value {
        font-size: 27px;
        font-weight: 600;
        font-variant-numeric: tabular-nums;
        color: var(--foreground);
    }

    .goal-sub {
        font-size: 13px;
        color: var(--gray-500);
    }
</style>
