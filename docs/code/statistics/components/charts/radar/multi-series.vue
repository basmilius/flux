<template>
    <FluxStatisticsChartPane
        icon="users"
        title="Profile comparison"
        :aspect-ratio="1.4">
        <FluxStatisticsRadarChart
            :series="series"
            :options="options"/>

        <template #legend>
            <FluxStatisticsLegend>
                <FluxStatisticsLegendItem
                    color="primary"
                    label="Alice"/>

                <FluxStatisticsLegendItem
                    color="info"
                    label="Bob"/>
            </FluxStatisticsLegend>
        </template>
    </FluxStatisticsChartPane>
</template>

<script
    setup
    lang="ts">
    import type { ApexOptions } from 'apexcharts';
    import { FluxStatisticsChartPane, FluxStatisticsLegend, FluxStatisticsLegendItem, FluxStatisticsRadarChart } from '@flux-ui/statistics';

    const series = [
        { name: 'Alice', data: [90, 80, 70, 95, 85, 78] },
        { name: 'Bob', data: [60, 70, 80, 75, 65, 85] }
    ];

    const options: ApexOptions = {
        labels: ['Speed', 'Accuracy', 'Quality', 'Volume', 'Focus', 'Collaboration']
    };
</script>
