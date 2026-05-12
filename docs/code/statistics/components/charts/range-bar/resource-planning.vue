<template>
    <FluxStatisticsChartPane
        icon="users"
        title="Team availability"
        :aspect-ratio="2.4">
        <FluxStatisticsRangeBarChart :series="series"/>
    </FluxStatisticsChartPane>
</template>

<script
    setup
    lang="ts">
    import { FluxStatisticsChartPane, FluxStatisticsRangeBarChart } from '@flux-ui/statistics';

    const series = [{
        name: 'Schedule',
        data: [
            { x: 'Alice', y: [new Date(2026, 4, 4).getTime(), new Date(2026, 4, 8).getTime()] },
            { x: 'Bob', y: [new Date(2026, 4, 6).getTime(), new Date(2026, 4, 11).getTime()] },
            { x: 'Carol', y: [new Date(2026, 4, 5).getTime(), new Date(2026, 4, 9).getTime()] },
            { x: 'Dan', y: [new Date(2026, 4, 8).getTime(), new Date(2026, 4, 13).getTime()] }
        ]
    }];
</script>
