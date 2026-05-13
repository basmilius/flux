<template>
    <FluxStatisticsChartPane
        icon="user"
        title="Skill profile"
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
        data: [
            { value: [88, 76, 64, 91, 70, 82], name: 'Skills' }
        ]
    }];

    const options: EChartsOption = {
        radar: {
            indicator: [
                { name: 'Vue', max: 100 },
                { name: 'TypeScript', max: 100 },
                { name: 'CSS', max: 100 },
                { name: 'Tooling', max: 100 },
                { name: 'Testing', max: 100 },
                { name: 'Design', max: 100 }
            ]
        }
    };
</script>
