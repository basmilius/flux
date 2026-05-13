<template>
    <Preview>
        <FluxStatisticsChartPane
            icon="chart-line"
            title="Team performance"
            :aspect-ratio="1.4">
            <FluxStatisticsRadarChart
                :indicators="indicators"
                :series="series"/>
        </FluxStatisticsChartPane>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import type { FluxStatisticsChartRadarIndicator, FluxStatisticsChartRadarSeries } from '@flux-ui/types';
    import { FluxStatisticsChartPane, FluxStatisticsRadarChart } from '@flux-ui/statistics';

    const series: FluxStatisticsChartRadarSeries[] = [
        { name: 'This quarter', values: [82, 65, 73, 91, 70, 88] },
        { name: 'Last quarter', values: [70, 60, 64, 80, 65, 75] }
    ];

    const indicators: FluxStatisticsChartRadarIndicator[] = [
        { name: 'Speed', max: 100 },
        { name: 'Quality', max: 100 },
        { name: 'Volume', max: 100 },
        { name: 'Accuracy', max: 100 },
        { name: 'Focus', max: 100 },
        { name: 'Collaboration', max: 100 }
    ];
</script>
