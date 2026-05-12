<template>
    <FluxStatisticsChartPane
        icon="rectangle-history"
        title="Browser share"
        :aspect-ratio="2.4">
        <FluxStatisticsTreemapChart
            :series="series"
            :options="options"/>
    </FluxStatisticsChartPane>
</template>

<script
    setup
    lang="ts">
    import type { ApexOptions } from 'apexcharts';
    import { FluxStatisticsChartPane, FluxStatisticsTreemapChart } from '@flux-ui/statistics';

    const series = [{
        data: [
            { x: 'Chrome', y: 62 },
            { x: 'Safari', y: 19 },
            { x: 'Edge', y: 10 },
            { x: 'Firefox', y: 6 },
            { x: 'Other', y: 3 }
        ]
    }];

    const options: ApexOptions = {
        colors: ['var(--primary-500)', 'var(--info-500)', 'var(--success-500)', 'var(--warning-500)', 'var(--gray-500)']
    };
</script>
