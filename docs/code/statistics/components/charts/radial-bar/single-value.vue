<template>
    <FluxStatisticsChartPane
        icon="circle-check"
        title="Tasks complete"
        :aspect-ratio="1.4">
        <FluxStatisticsRadialBar :series="series"/>
    </FluxStatisticsChartPane>
</template>

<script
    setup
    lang="ts">
    import { FluxStatisticsChartPane, FluxStatisticsRadialBar } from '@flux-ui/statistics';

    const series = [{
        data: [{ value: 84, name: 'Done' }]
    }];
</script>
