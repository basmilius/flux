<template>
    <FluxStatisticsChartPane
        icon="gauge-high"
        title="Quota usage"
        :aspect-ratio="1.4">
        <FluxStatisticsRadialBar
            tooltip
            :series="series"/>
    </FluxStatisticsChartPane>
</template>

<script
    setup
    lang="ts">
    import { FluxStatisticsChartPane, FluxStatisticsRadialBar } from '@flux-ui/statistics';
    import type { FluxStatisticsChartGaugeSeries } from '@flux-ui/types';

    const series: FluxStatisticsChartGaugeSeries[] = [
        { name: 'Used', value: 72 }
    ];
</script>
