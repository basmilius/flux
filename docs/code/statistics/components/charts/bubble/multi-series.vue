<template>
    <FluxStatisticsChartPane
        icon="cubes"
        title="Segment volume"
        :aspect-ratio="3">
        <FluxStatisticsBubbleChart :series="series"/>

        <template #legend>
            <FluxStatisticsLegend>
                <FluxStatisticsLegendItem
                    color="primary"
                    label="Retail"/>

                <FluxStatisticsLegendItem
                    color="info"
                    label="Enterprise"/>
            </FluxStatisticsLegend>
        </template>
    </FluxStatisticsChartPane>
</template>

<script
    setup
    lang="ts">
    import { FluxStatisticsBubbleChart, FluxStatisticsChartPane, FluxStatisticsLegend, FluxStatisticsLegendItem } from '@flux-ui/statistics';

    const series = [
        { name: 'Retail', data: [[10, 12, 20], [25, 30, 18], [40, 22, 24], [55, 40, 28]] },
        { name: 'Enterprise', data: [[12, 35, 14], [28, 18, 32], [44, 50, 12], [60, 28, 22]] }
    ];
</script>
