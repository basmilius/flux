<template>
    <FluxStatisticsChartPane
        icon="users"
        title="Engineering review"
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
        { name: 'Frontend', icon: 'desktop', color: 'primary', values: [88, 76, 64, 91, 70, 82] },
        { name: 'Backend', icon: 'server', color: 'info', values: [72, 90, 78, 82, 85, 76] }
    ];

    const indicators: FluxStatisticsChartRadarIndicator[] = [
        { name: 'Speed', max: 100 },
        { name: 'Stability', max: 100 },
        { name: 'Volume', max: 100 },
        { name: 'Quality', max: 100 },
        { name: 'Coverage', max: 100 },
        { name: 'Velocity', max: 100 }
    ];
</script>
