<template>
    <FluxStatisticsChartPane
        icon="gauge-high"
        title="Subsystem health"
        :aspect-ratio="1.4">
        <FluxStatisticsRadialBar
            :series="series"
            :options="options"/>

        <template #legend>
            <FluxStatisticsLegend>
                <FluxStatisticsLegendItem
                    color="primary"
                    label="API"/>

                <FluxStatisticsLegendItem
                    color="info"
                    label="DB"/>

                <FluxStatisticsLegendItem
                    color="success"
                    label="Workers"/>
            </FluxStatisticsLegend>
        </template>
    </FluxStatisticsChartPane>
</template>

<script
    setup
    lang="ts">
    import type { ApexOptions } from 'apexcharts';
    import { FluxStatisticsChartPane, FluxStatisticsLegend, FluxStatisticsLegendItem, FluxStatisticsRadialBar } from '@flux-ui/statistics';

    const series = [92, 78, 64];

    const options: ApexOptions = {
        labels: ['API', 'DB', 'Workers']
    };
</script>
