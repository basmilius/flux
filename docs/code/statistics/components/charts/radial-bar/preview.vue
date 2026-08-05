<template>
    <Preview>
        <FluxStatisticsChartPane
            icon="gauge-high"
            title="Quota usage"
            :aspect-ratio="1.4">
            <FluxStatisticsRadialBar :series="series"/>
        </FluxStatisticsChartPane>
    </Preview>
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
