<template>
    <Preview>
        <FluxStatisticsChartPane
            icon="grid-2"
            title="Weekly activity"
            :aspect-ratio="2.4">
            <FluxStatisticsHeatmapChart :series="series"/>
        </FluxStatisticsChartPane>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import { FluxStatisticsChartPane, FluxStatisticsHeatmapChart } from '@flux-ui/statistics';

    function row(name: string) {
        return {
            name,
            data: Array.from({ length: 12 }, (_, i) => ({ x: `W${i + 1}`, y: Math.round(Math.random() * 100) }))
        };
    }

    const series = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(row);
</script>
