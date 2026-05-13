<template>
    <FluxStatisticsChartPane
        icon="gauge-high"
        title="Sprint progress"
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
        { name: 'Stories', value: 76 },
        { name: 'Tasks', value: 88 }
    ];
</script>
