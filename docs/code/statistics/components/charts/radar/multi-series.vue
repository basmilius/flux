<template>
    <FluxStatisticsChartPane
        icon="users"
        title="Profile comparison"
        :aspect-ratio="1.4">
        <FluxStatisticsRadarChart
            :indicators="indicators"
            :series="series"/>

        <template #legend>
            <FluxStatisticsLegend/>
        </template>
    </FluxStatisticsChartPane>
</template>

<script
    setup
    lang="ts">
    import type { FluxStatisticsChartRadarIndicator, FluxStatisticsChartRadarSeries } from '@flux-ui/types';
    import { FluxStatisticsChartPane, FluxStatisticsLegend, FluxStatisticsRadarChart } from '@flux-ui/statistics';

    const series: FluxStatisticsChartRadarSeries[] = [
        { name: 'Alice', values: [90, 80, 70, 95, 85, 78] },
        { name: 'Bob', values: [60, 70, 80, 75, 65, 85] }
    ];

    const indicators: FluxStatisticsChartRadarIndicator[] = [
        { name: 'Speed', max: 100 },
        { name: 'Accuracy', max: 100 },
        { name: 'Quality', max: 100 },
        { name: 'Volume', max: 100 },
        { name: 'Focus', max: 100 },
        { name: 'Collaboration', max: 100 }
    ];
</script>
