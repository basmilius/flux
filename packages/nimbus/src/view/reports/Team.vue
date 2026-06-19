<template>
    <FluxApplicationContent layout="dashboard">
        <FluxApplicationSection title="Capacity">
            <FluxGrid>
                <FluxGridColumn
                    :lg="6"
                    :xs="12">
                    <FluxStatisticsChartPane
                        icon="chart-simple"
                        title="Workload by discipline"
                        :aspect-ratio="1.8">
                        <FluxStatisticsRadarChart
                            :indicators="radarIndicators"
                            :series="radarSeries"
                            tooltip/>
                    </FluxStatisticsChartPane>
                </FluxGridColumn>

                <FluxGridColumn
                    :lg="6"
                    :xs="12">
                    <FluxStatisticsChartPane
                        icon="gauge-high"
                        title="Utilisation"
                        :aspect-ratio="1.8">
                        <FluxStatisticsRadialBar
                            :series="utilisationSeries"
                            tooltip/>
                    </FluxStatisticsChartPane>
                </FluxGridColumn>
            </FluxGrid>
        </FluxApplicationSection>

        <FluxApplicationSection
            info="Logged hours this week"
            title="Activity heatmap">
            <FluxStatisticsChartPane
                icon="table-cells"
                title="Hours by day"
                :aspect-ratio="3">
                <FluxStatisticsHeatmapChart
                    :series="heatmapSeries"
                    tooltip
                    :x-labels="weekdays"
                    :y-labels="memberNames"/>
            </FluxStatisticsChartPane>
        </FluxApplicationSection>

        <FluxApplicationSection title="Distribution">
            <FluxGrid>
                <FluxGridColumn
                    :lg="7"
                    :xs="12">
                    <FluxStatisticsChartPane
                        icon="chart-simple"
                        title="Hours per project"
                        :aspect-ratio="2.2">
                        <FluxStatisticsBoxPlotChart
                            :labels="boxLabels"
                            :series="boxSeries"
                            tooltip/>
                    </FluxStatisticsChartPane>
                </FluxGridColumn>

                <FluxGridColumn
                    :lg="5"
                    :xs="12">
                    <FluxStatisticsChartPane
                        icon="chart-pie"
                        title="By role"
                        :aspect-ratio="1.6">
                        <FluxStatisticsPolarAreaChart
                            :slices="roleSlices"
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
    import { FluxGrid, FluxGridColumn } from '@flux-ui/components';
    import { FluxStatisticsBoxPlotChart, FluxStatisticsChartPane, FluxStatisticsHeatmapChart, FluxStatisticsPolarAreaChart, FluxStatisticsRadarChart, FluxStatisticsRadialBar } from '@flux-ui/statistics';
    import type { FluxStatisticsChartBoxPlotSeries, FluxStatisticsChartGaugeSeries, FluxStatisticsChartHeatmapSeries, FluxStatisticsChartPieSlice, FluxStatisticsChartRadarIndicator, FluxStatisticsChartRadarSeries } from '@flux-ui/types';
    import { computed } from 'vue';
    import { useTeamStore } from '@/store';

    const {members} = useTeamStore();

    const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
    const team = computed(() => members.value.slice(0, 6));
    const memberNames = computed(() => team.value.map(member => member.name.split(' ')[0]));

    const radarIndicators: FluxStatisticsChartRadarIndicator[] = [
        {name: 'Design', max: 100},
        {name: 'Frontend', max: 100},
        {name: 'Backend', max: 100},
        {name: 'QA', max: 100},
        {name: 'Research', max: 100},
        {name: 'DevOps', max: 100}
    ];

    const radarSeries: FluxStatisticsChartRadarSeries[] = [
        {name: 'Allocated', color: 'var(--primary-400)', values: [82, 91, 74, 58, 47, 63]},
        {name: 'Capacity', color: 'var(--info-300)', values: [90, 95, 85, 70, 60, 75]}
    ];

    const utilisationSeries = computed<FluxStatisticsChartGaugeSeries[]>(() => team.value.slice(0, 4).map((member, index) => ({
        name: member.name.split(' ')[0],
        value: 60 + ((index * 13) % 38),
        color: `var(--${member.color}-400)`
    })));

    const heatmapSeries = computed<FluxStatisticsChartHeatmapSeries[]>(() => [{
        name: 'Hours',
        data: team.value.flatMap((member, memberIndex) => weekdays.map((day, dayIndex) => ({
            x: day,
            y: member.name.split(' ')[0],
            value: (memberIndex * 2 + dayIndex * 3) % 8
        })))
    }]);

    const boxLabels = ['Design', 'Frontend', 'Backend', 'QA'];
    const boxSeries: FluxStatisticsChartBoxPlotSeries[] = [{
        name: 'Hours',
        color: 'var(--primary-400)',
        data: [
            {label: 'Design', min: 2, q1: 4, median: 6, q3: 7, max: 9},
            {label: 'Frontend', min: 3, q1: 5, median: 7, q3: 8, max: 10},
            {label: 'Backend', min: 1, q1: 4, median: 6, q3: 8, max: 11},
            {label: 'QA', min: 1, q1: 2, median: 4, q3: 5, max: 7}
        ]
    }];

    const roleSlices = computed<FluxStatisticsChartPieSlice[]>(() => {
        const byRole = new Map<string, number>();

        for (const member of members.value) {
            byRole.set(member.role, (byRole.get(member.role) ?? 0) + 1);
        }

        const palette = ['var(--primary-400)', 'var(--info-400)', 'var(--success-400)', 'var(--warning-400)', 'var(--danger-400)', 'var(--gray-400)'] as const;

        return [...byRole.entries()].map(([label, value], index) => ({
            label,
            value,
            color: palette[index % palette.length]
        }));
    });
</script>
