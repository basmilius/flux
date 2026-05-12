<template>
    <FluxStatisticsChartPane
        icon="user"
        title="Skill profile"
        :aspect-ratio="1.4">
        <FluxStatisticsRadarChart
            :series="series"
            :options="options"/>
    </FluxStatisticsChartPane>
</template>

<script
    setup
    lang="ts">
    import type { ApexOptions } from 'apexcharts';
    import { FluxStatisticsChartPane, FluxStatisticsRadarChart } from '@flux-ui/statistics';

    const series = [{
        name: 'Skills',
        data: [88, 76, 64, 91, 70, 82]
    }];

    const options: ApexOptions = {
        labels: ['Vue', 'TypeScript', 'CSS', 'Tooling', 'Testing', 'Design']
    };
</script>
