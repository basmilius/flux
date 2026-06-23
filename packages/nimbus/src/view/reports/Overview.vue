<template>
    <FluxApplicationContent layout="dashboard">
        <FluxApplicationSection>
            <FluxFlex
                direction="vertical"
                :gap="18">
                <FluxFlex justify="end">
                    <FluxSegmentedControl
                        v-model="period"
                        aria-label="Reporting period">
                        <FluxSegmentedControlItem
                            label="This quarter"
                            value="quarter"/>
                        <FluxSegmentedControlItem
                            label="This year"
                            value="year"/>
                        <FluxSegmentedControlItem
                            label="All time"
                            value="all"/>
                    </FluxSegmentedControl>
                </FluxFlex>

                <FluxStatisticsGrid
                    :gap="18"
                    :md="3"
                    :xs="1">
                    <FluxStatisticsComparison
                        :current="revenueThisQuarter"
                        current-label="This quarter"
                        :format="formatCurrency"
                        icon="sack-dollar"
                        :previous="revenueLastQuarter"
                        previous-label="Last quarter"
                        show-delta
                        title="Revenue"/>
                    <FluxStatisticsComparison
                        :current="wonValue"
                        current-label="Won"
                        :format="formatCurrency"
                        icon="handshake"
                        :previous="openValue"
                        previous-label="Open"
                        show-delta
                        title="Deals"/>
                    <FluxStatisticsMeter
                        color="success"
                        footer="Invoices collected"
                        icon="file-invoice-dollar"
                        sub-title="of invoiced revenue"
                        title="Collection rate"
                        :value="collectionRate"/>
                </FluxStatisticsGrid>
            </FluxFlex>
        </FluxApplicationSection>

        <FluxApplicationSection
            info="Highest-budget engagements"
            title="Top projects">
            <FluxStatisticsDetailsTable title="Top projects by budget">
                <FluxStatisticsDetailsTableRow
                    v-for="project of topProjects"
                    :key="project.id"
                    :label="project.name"
                    :value="formatCurrency(project.budget)"/>
            </FluxStatisticsDetailsTable>
        </FluxApplicationSection>

        <FluxApplicationSection
            info="Invoiced revenue per industry"
            title="Revenue breakdown">
            <FluxStatisticsPercentageBar :items="industryItems"/>
        </FluxApplicationSection>
    </FluxApplicationContent>
</template>

<script
    lang="ts"
    setup>
    import { FluxApplicationContent, FluxApplicationSection } from '@flux-ui/application';
    import { FluxFlex, FluxSegmentedControl, FluxSegmentedControlItem } from '@flux-ui/components';
    import { FluxStatisticsComparison, FluxStatisticsDetailsTable, FluxStatisticsDetailsTableRow, FluxStatisticsGrid, FluxStatisticsMeter, FluxStatisticsPercentageBar } from '@flux-ui/statistics';
    import type { FluxStatisticsPercentageBarItemObject } from '@flux-ui/types';
    import { computed, ref } from 'vue';
    import { invoiceTotal, useClientsStore, useDealsStore, useInvoicesStore, useProjectsStore } from '@/store';
    import { formatCurrency } from '@/util';

    const {projects} = useProjectsStore();
    const {invoices, paidTotal, outstanding} = useInvoicesStore();
    const {wonValue, openValue} = useDealsStore();
    const {getClient} = useClientsStore();

    const period = ref<string | number>('quarter');

    const totalSpent = computed(() => projects.value.reduce((sum, project) => sum + project.spent, 0));
    const topProjects = computed(() => [...projects.value].sort((a, b) => b.budget - a.budget).slice(0, 6));
    const revenueThisQuarter = computed(() => Math.round(totalSpent.value * 0.34));
    const revenueLastQuarter = computed(() => Math.round(totalSpent.value * 0.29));

    const collectionRate = computed(() => {
        const total = paidTotal.value + outstanding.value;
        return total === 0 ? 0 : paidTotal.value / total;
    });

    const industryItems = computed<FluxStatisticsPercentageBarItemObject[]>(() => {
        const byIndustry = new Map<string, number>();

        for (const invoice of invoices.value) {
            const industry = getClient(invoice.clientId)?.industry ?? 'Other';
            byIndustry.set(industry, (byIndustry.get(industry) ?? 0) + invoiceTotal(invoice));
        }

        const palette = ['var(--primary-400)', 'var(--info-400)', 'var(--success-400)', 'var(--warning-400)', 'var(--danger-400)', 'var(--gray-400)'] as const;

        return [...byIndustry.entries()]
            .sort((a, b) => b[1] - a[1])
            .slice(0, 6)
            .map(([label, value], index) => ({
                label,
                value,
                color: palette[index % palette.length],
                displayValue: formatCurrency(value)
            }));
    });
</script>
