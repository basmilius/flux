<template>
    <Preview>
        <FluxStatisticsChartPane
            icon="chart-line"
            title="Team performance"
            :aspect-ratio="1.4">
            <FluxStatisticsRadarChart
                :options="options"
                :series="series"/>
        </FluxStatisticsChartPane>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import type { EChartsOption } from 'echarts/core';
    import { FluxStatisticsChartPane, FluxStatisticsRadarChart } from '@flux-ui/statistics';

    const series = [{
        data: [
            { value: [82, 65, 73, 91, 70, 88], name: 'This quarter' },
            { value: [70, 60, 64, 80, 65, 75], name: 'Last quarter' }
        ]
    }];

    const options: EChartsOption = {
        radar: {
            indicator: [
                { name: 'Speed', max: 100 },
                { name: 'Quality', max: 100 },
                { name: 'Volume', max: 100 },
                { name: 'Accuracy', max: 100 },
                { name: 'Focus', max: 100 },
                { name: 'Collaboration', max: 100 }
            ]
        }
    };
</script>
