<template>
    <FluxStatisticsChartPane
        icon="chart-line"
        title="Feature coverage"
        :aspect-ratio="1.4">
        <FluxStatisticsRadarChart
            :options="options"
            :series="series"/>
    </FluxStatisticsChartPane>
</template>

<script
    setup
    lang="ts">
    import type { EChartsOption } from 'echarts/core';
    import { FluxStatisticsChartPane, FluxStatisticsRadarChart } from '@flux-ui/statistics';

    const series = [{
        areaStyle: { opacity: 0.55 },
        lineStyle: { width: 3 },
        data: [
            { value: [75, 90, 60, 80, 70, 85], name: 'Coverage' }
        ]
    }];

    const options: EChartsOption = {
        radar: {
            indicator: [
                { name: 'Auth', max: 100 },
                { name: 'API', max: 100 },
                { name: 'UI', max: 100 },
                { name: 'Storage', max: 100 },
                { name: 'Sync', max: 100 },
                { name: 'Search', max: 100 }
            ]
        }
    };
</script>
