<template>
    <FluxApplicationContent layout="dashboard">
        <FluxApplicationSection
            info="Open value per pipeline stage"
            title="Pipeline by stage">
            <FluxStatisticsChartPane
                icon="chart-pie"
                title="Stages"
                :aspect-ratio="2.4">
                <FluxStatisticsDonutChart
                    :slices="dealSlices"
                    tooltip/>
                <template #legend>
                    <FluxStatisticsLegend/>
                </template>
            </FluxStatisticsChartPane>
        </FluxApplicationSection>

        <FluxApplicationSection title="Opportunities">
            <FluxGrid>
                <FluxGridColumn
                    :lg="6"
                    :xs="12">
                    <FluxStatisticsChartPane
                        icon="chart-line"
                        title="Value vs. win probability"
                        :aspect-ratio="1.8">
                        <FluxStatisticsScatterChart
                            :series="scatterSeries"
                            tooltip
                            x-axis-labels
                            y-axis-labels/>
                    </FluxStatisticsChartPane>
                </FluxGridColumn>

                <FluxGridColumn
                    :lg="6"
                    :xs="12">
                    <FluxStatisticsChartPane
                        icon="chart-simple"
                        title="Value vs. time to close"
                        :aspect-ratio="1.8">
                        <FluxStatisticsBubbleChart
                            :series="bubbleSeries"
                            tooltip
                            x-axis-labels
                            y-axis-labels/>
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
    import { FluxGrid, FluxGridColumn } from '@flux-ui/components';
    import { FluxStatisticsBubbleChart, FluxStatisticsChartPane, FluxStatisticsDonutChart, FluxStatisticsLegend, FluxStatisticsScatterChart } from '@flux-ui/statistics';
    import type { FluxStatisticsChartBubbleSeries, FluxStatisticsChartPieSlice, FluxStatisticsChartScatterSeries } from '@flux-ui/types';
    import { computed } from 'vue';
    import { useDealsStore } from '@/store';
    import type { DealStage } from '@/types';
    import { DEAL_STAGE } from '@/util';

    const {deals, totalForStage} = useDealsStore();

    const dealSlices = computed<FluxStatisticsChartPieSlice[]>(() => {
        const stages: DealStage[] = ['lead', 'qualified', 'proposal', 'negotiation', 'won'];

        return stages
            .filter(stage => totalForStage(stage) > 0)
            .map(stage => ({
                label: DEAL_STAGE[stage].label,
                value: totalForStage(stage),
                color: `var(--${DEAL_STAGE[stage].color}-400)`
            }));
    });

    const openDeals = computed(() => deals.value.filter(deal => deal.stage !== 'won' && deal.stage !== 'lost'));

    const scatterSeries = computed<FluxStatisticsChartScatterSeries[]>(() => [{
        name: 'Deals',
        color: 'var(--primary-400)',
        data: openDeals.value.map(deal => ({x: deal.probability, y: Math.round(deal.value / 1000)}))
    }]);

    const bubbleSeries = computed<FluxStatisticsChartBubbleSeries[]>(() => [{
        name: 'Deals',
        color: 'var(--info-400)',
        data: openDeals.value.map(deal => ({
            x: Math.max(0, Math.round(deal.closeDate.diffNow('days').days)),
            y: Math.round(deal.value / 1000),
            size: Math.max(6, Math.round(deal.probability / 4))
        }))
    }]);
</script>
