<template>
    <FluxStatisticsChartPane
        icon="users"
        title="Profile comparison"
        :aspect-ratio="1.4">
        <FluxStatisticsRadarChart
            :options="options"
            :series="series"/>

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
    import type { EChartsOption } from 'echarts/core';
    import { FluxStatisticsChartPane, FluxStatisticsLegend, FluxStatisticsLegendItem, FluxStatisticsRadarChart } from '@flux-ui/statistics';

    const series = [{
        data: [
            { value: [90, 80, 70, 95, 85, 78], name: 'Alice' },
            { value: [60, 70, 80, 75, 65, 85], name: 'Bob' }
        ]
    }];

    const options: EChartsOption = {
        radar: {
            indicator: [
                { name: 'Speed', max: 100 },
                { name: 'Accuracy', max: 100 },
                { name: 'Quality', max: 100 },
                { name: 'Volume', max: 100 },
                { name: 'Focus', max: 100 },
                { name: 'Collaboration', max: 100 }
            ]
        }
    };
</script>
