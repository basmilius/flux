<template>
    <Preview>
        <FluxStatisticsChartPane
            icon="gauge-high"
            title="Quota usage"
            :aspect-ratio="1.4">
            <FluxStatisticsRadialBar
                :series="series"
                :options="options"/>
        </FluxStatisticsChartPane>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import type { ApexOptions } from 'apexcharts';
    import { FluxStatisticsChartPane, FluxStatisticsRadialBar } from '@flux-ui/statistics';

    const series = [72];

    const options: ApexOptions = {
        labels: ['Used']
    };
</script>
