<template>
    <FluxStatisticsChartPane
        icon="gauge-high"
        title="Subsystem health"
        :aspect-ratio="1.4">
        <FluxStatisticsRadialBar :series="series"/>

        <template #legend>
            <FluxStatisticsLegend/>
        </template>
    </FluxStatisticsChartPane>
</template>

<script
    setup
    lang="ts">
    import type { FluxStatisticsChartGaugeSeries } from '@flux-ui/types';
    import { FluxStatisticsChartPane, FluxStatisticsLegend, FluxStatisticsRadialBar } from '@flux-ui/statistics';

    const series: FluxStatisticsChartGaugeSeries[] = [
        { name: 'API', value: 92 },
        { name: 'DB', value: 78 },
        { name: 'Workers', value: 64 }
    ];
</script>
