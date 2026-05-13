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
    import type { FluxStatisticsChartGaugeSeries } from '@flux-ui/types';
    import { FluxStatisticsChartPane, FluxStatisticsRadialBar } from '@flux-ui/statistics';

    const series: FluxStatisticsChartGaugeSeries[] = [
        { name: 'Done', value: 84 }
    ];
</script>
