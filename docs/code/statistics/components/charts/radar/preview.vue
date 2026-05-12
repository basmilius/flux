<template>
    <Preview>
        <FluxStatisticsChartPane
            icon="chart-line"
            title="Team performance"
            :aspect-ratio="1.4">
            <FluxStatisticsRadarChart :series="series"/>
        </FluxStatisticsChartPane>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import { FluxStatisticsChartPane, FluxStatisticsRadarChart } from '@flux-ui/statistics';

    const series = [
        {
            name: 'This quarter',
            data: [82, 65, 73, 91, 70, 88]
        },
        {
            name: 'Last quarter',
            data: [70, 60, 64, 80, 65, 75]
        }
    ];
</script>
