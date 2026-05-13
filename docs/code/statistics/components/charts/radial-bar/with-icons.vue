<template>
    <FluxStatisticsChartPane
        icon="gauge-high"
        title="Service health"
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
        { name: 'API', value: 94, color: 'success', icon: 'server' },
        { name: 'Database', value: 82, color: 'info', icon: 'database' },
        { name: 'Storage', value: 68, color: 'warning', icon: 'hard-drive' }
    ];
</script>
