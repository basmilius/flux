<template>
    <FluxStatisticsChartPane
        icon="calendar-range"
        title="Release timeline"
        :aspect-ratio="2.4">
        <FluxStatisticsRangeBarChart :series="series"/>

        <template #legend>
            <FluxStatisticsLegend>
                <FluxStatisticsLegendItem
                    color="primary"
                    label="Frontend"/>

                <FluxStatisticsLegendItem
                    color="info"
                    label="Backend"/>
            </FluxStatisticsLegend>
        </template>
    </FluxStatisticsChartPane>
</template>

<script
    setup
    lang="ts">
    import { FluxStatisticsChartPane, FluxStatisticsLegend, FluxStatisticsLegendItem, FluxStatisticsRangeBarChart } from '@flux-ui/statistics';

    const series = [
        {
            name: 'Frontend',
            data: [
                { x: 'Components', y: [new Date(2026, 1, 1).getTime(), new Date(2026, 1, 18).getTime()] },
                { x: 'Pages', y: [new Date(2026, 1, 15).getTime(), new Date(2026, 2, 12).getTime()] }
            ]
        },
        {
            name: 'Backend',
            data: [
                { x: 'API', y: [new Date(2026, 0, 20).getTime(), new Date(2026, 1, 22).getTime()] },
                { x: 'Migrations', y: [new Date(2026, 1, 5).getTime(), new Date(2026, 1, 14).getTime()] }
            ]
        }
    ];
</script>
