<template>
    <Preview>
        <FluxStatisticsChartPane
            icon="calendar-range"
            title="Project timeline"
            :aspect-ratio="2.4">
            <FluxStatisticsRangeBarChart :series="series"/>
        </FluxStatisticsChartPane>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import { FluxStatisticsChartPane, FluxStatisticsRangeBarChart } from '@flux-ui/statistics';

    const series = [{
        name: 'Tasks',
        data: [
            { x: 'Discovery', y: [new Date(2026, 0, 5).getTime(), new Date(2026, 0, 18).getTime()] },
            { x: 'Design', y: [new Date(2026, 0, 14).getTime(), new Date(2026, 1, 6).getTime()] },
            { x: 'Build', y: [new Date(2026, 1, 1).getTime(), new Date(2026, 2, 15).getTime()] },
            { x: 'QA', y: [new Date(2026, 2, 10).getTime(), new Date(2026, 2, 28).getTime()] },
            { x: 'Launch', y: [new Date(2026, 2, 25).getTime(), new Date(2026, 3, 5).getTime()] }
        ]
    }];
</script>
