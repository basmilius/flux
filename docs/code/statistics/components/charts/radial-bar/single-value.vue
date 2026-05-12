<template>
    <FluxStatisticsChartPane
        icon="circle-check"
        title="Tasks complete"
        :aspect-ratio="1.4">
        <FluxStatisticsRadialBar
            :series="series"
            :options="options"/>
    </FluxStatisticsChartPane>
</template>

<script
    setup
    lang="ts">
    import type { ApexOptions } from 'apexcharts';
    import { FluxStatisticsChartPane, FluxStatisticsRadialBar } from '@flux-ui/statistics';

    const series = [84];

    const options: ApexOptions = {
        labels: ['Done']
    };
</script>
