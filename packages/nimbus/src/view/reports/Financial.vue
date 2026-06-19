<template>
    <FluxApplicationContent layout="dashboard">
        <FluxApplicationSection
            info="Revenue versus project costs"
            title="Revenue & costs">
            <FluxGrid>
                <FluxGridColumn
                    :lg="7"
                    :xs="12">
                    <FluxStatisticsChartPane
                        icon="chart-bar"
                        title="Monthly"
                        :aspect-ratio="2.2">
                        <FluxStatisticsBarChart
                            :labels="months"
                            :series="barSeries"
                            tooltip/>
                        <template #legend>
                            <FluxStatisticsLegend/>
                        </template>
                    </FluxStatisticsChartPane>
                </FluxGridColumn>

                <FluxGridColumn
                    :lg="5"
                    :xs="12">
                    <FluxStatisticsChartPane
                        icon="chart-line"
                        title="Revenue trend"
                        :aspect-ratio="2.2">
                        <FluxStatisticsLineChart
                            :labels="months"
                            :series="lineSeries"
                            tooltip/>
                        <template #legend>
                            <FluxStatisticsLegendScope>
                                <FluxStatisticsLegendItem
                                    color="primary"
                                    label="Revenue"
                                    :value="formatCurrency(revenueTotal)"/>
                            </FluxStatisticsLegendScope>
                        </template>
                    </FluxStatisticsChartPane>
                </FluxGridColumn>
            </FluxGrid>
        </FluxApplicationSection>

        <FluxApplicationSection
            info="Revenue versus gross margin"
            title="Revenue & margin">
            <FluxStatisticsChartPane
                icon="chart-column"
                title="Mixed"
                :aspect-ratio="2.8">
                <FluxStatisticsMixedChart
                    :labels="months"
                    :series="mixedSeries"
                    tooltip/>
                <template #legend>
                    <FluxStatisticsLegend/>
                </template>
            </FluxStatisticsChartPane>
        </FluxApplicationSection>

        <FluxApplicationSection title="Breakdown">
            <FluxGrid>
                <FluxGridColumn
                    :lg="7"
                    :xs="12">
                    <FluxStatisticsChartPane
                        icon="table-cells"
                        title="Revenue by industry"
                        :aspect-ratio="2.2">
                        <FluxStatisticsTreemapChart
                            :nodes="treemapNodes"
                            tooltip/>
                    </FluxStatisticsChartPane>
                </FluxGridColumn>

                <FluxGridColumn
                    :lg="5"
                    :xs="12">
                    <FluxStatisticsChartPane
                        icon="chart-pie"
                        title="Cost split"
                        :aspect-ratio="1.6">
                        <FluxStatisticsPieChart
                            :slices="costSlices"
                            tooltip/>
                        <template #legend>
                            <FluxStatisticsLegend/>
                        </template>
                    </FluxStatisticsChartPane>
                </FluxGridColumn>
            </FluxGrid>
        </FluxApplicationSection>

        <FluxApplicationSection title="Monthly revenue range">
            <FluxStatisticsChartPane
                icon="chart-column"
                title="Range"
                :aspect-ratio="2.8">
                <FluxStatisticsCandlestickChart
                    :labels="months"
                    :series="candlestickSeries"
                    tooltip/>
            </FluxStatisticsChartPane>
        </FluxApplicationSection>

        <FluxApplicationSection title="Overdue">
            <FluxStatisticsEmpty
                v-if="overdueCount === 0"
                description="No invoices are overdue right now — nice work."
                icon="circle-check"
                title="Nothing overdue"/>
            <FluxStatisticsChartPane
                v-else
                icon="triangle-exclamation"
                title="Overdue invoices"
                :aspect-ratio="3.2">
                <FluxStatisticsBarChart
                    :labels="['Overdue']"
                    :series="[{name: 'Overdue', color: 'var(--danger-400)', data: [overdueCount]}]"
                    tooltip/>
            </FluxStatisticsChartPane>
        </FluxApplicationSection>
    </FluxApplicationContent>
</template>

<script
    lang="ts"
    setup>
    import { FluxApplicationContent, FluxApplicationSection } from '@flux-ui/application';
    import { FluxGrid, FluxGridColumn } from '@flux-ui/components';
    import { FluxStatisticsBarChart, FluxStatisticsCandlestickChart, FluxStatisticsChartPane, FluxStatisticsEmpty, FluxStatisticsLegend, FluxStatisticsLegendItem, FluxStatisticsLegendScope, FluxStatisticsLineChart, FluxStatisticsMixedChart, FluxStatisticsPieChart, FluxStatisticsTreemapChart } from '@flux-ui/statistics';
    import type { FluxStatisticsChartBarSeries, FluxStatisticsChartCandlestickSeries, FluxStatisticsChartLineSeries, FluxStatisticsChartMixedSeries, FluxStatisticsChartPieSlice, FluxStatisticsChartTreemapNode } from '@flux-ui/types';
    import { computed } from 'vue';
    import { invoiceTotal, useClientsStore, useInvoicesStore, useProjectsStore } from '@/store';
    import { formatCurrency } from '@/util';

    const {projects} = useProjectsStore();
    const {invoices} = useInvoicesStore();
    const {getClient} = useClientsStore();

    const months = ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

    const base = computed(() => projects.value.reduce((sum, project) => sum + project.spent, 0) / 12);
    const revenueData = computed(() => months.map((_, index) => Math.round(base.value * (0.9 + index * 0.07))));
    const costData = computed(() => months.map((_, index) => Math.round(base.value * (0.6 + index * 0.04))));
    const revenueTotal = computed(() => revenueData.value.reduce((sum, value) => sum + value, 0));

    const barSeries = computed<FluxStatisticsChartBarSeries[]>(() => [
        {name: 'Revenue', color: 'var(--primary-400)', data: revenueData.value},
        {name: 'Costs', color: 'var(--gray-400)', data: costData.value}
    ]);

    const lineSeries = computed<FluxStatisticsChartLineSeries[]>(() => [
        {name: 'Revenue', color: 'var(--primary-400)', data: revenueData.value}
    ]);

    const mixedSeries = computed<FluxStatisticsChartMixedSeries[]>(() => [
        {type: 'bar', name: 'Revenue', color: 'var(--primary-400)', data: revenueData.value},
        {type: 'line', name: 'Margin %', color: 'var(--success-400)', data: months.map((_, index) => 30 + index)}
    ]);

    const treemapNodes = computed<FluxStatisticsChartTreemapNode[]>(() => {
        const byIndustry = new Map<string, number>();

        for (const invoice of invoices.value) {
            const industry = getClient(invoice.clientId)?.industry ?? 'Other';
            byIndustry.set(industry, (byIndustry.get(industry) ?? 0) + invoiceTotal(invoice));
        }

        const palette = ['var(--primary-400)', 'var(--info-400)', 'var(--success-400)', 'var(--warning-400)', 'var(--danger-400)', 'var(--gray-400)'] as const;

        return [...byIndustry.entries()]
            .sort((a, b) => b[1] - a[1])
            .slice(0, 6)
            .map(([name, value], index) => ({name, value, color: palette[index % palette.length]}));
    });

    const costSlices = computed<FluxStatisticsChartPieSlice[]>(() => [
        {label: 'Design', value: 32, color: 'var(--primary-400)'},
        {label: 'Development', value: 41, color: 'var(--info-400)'},
        {label: 'Project mgmt', value: 14, color: 'var(--warning-400)'},
        {label: 'Hosting', value: 13, color: 'var(--success-400)'}
    ]);

    const candlestickSeries = computed<FluxStatisticsChartCandlestickSeries[]>(() => [{
        name: 'Revenue',
        data: months.map((label, index) => {
            const open = revenueData.value[index];
            const close = Math.round(open * (0.9 + (index % 3) * 0.08));
            return {label, open, close, low: Math.min(open, close) - 2000, high: Math.max(open, close) + 2500};
        })
    }]);

    const overdueCount = computed(() => invoices.value.filter(invoice => invoice.status === 'overdue').length);
</script>
