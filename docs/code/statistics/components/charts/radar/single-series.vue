<template>
    <FluxStatisticsChartPane
        icon="user"
        title="Skill profile"
        :aspect-ratio="1.4">
        <FluxStatisticsRadarChart
            :indicators="indicators"
            :series="series"/>
    </FluxStatisticsChartPane>
</template>

<script
    setup
    lang="ts">
    import type { FluxStatisticsChartRadarIndicator, FluxStatisticsChartRadarSeries } from '@flux-ui/types';
    import { FluxStatisticsChartPane, FluxStatisticsRadarChart } from '@flux-ui/statistics';

    const series: FluxStatisticsChartRadarSeries[] = [
        { name: 'Skills', values: [88, 76, 64, 91, 70, 82] }
    ];

    const indicators: FluxStatisticsChartRadarIndicator[] = [
        { name: 'Vue', max: 100 },
        { name: 'TypeScript', max: 100 },
        { name: 'CSS', max: 100 },
        { name: 'Tooling', max: 100 },
        { name: 'Testing', max: 100 },
        { name: 'Design', max: 100 }
    ];
</script>
