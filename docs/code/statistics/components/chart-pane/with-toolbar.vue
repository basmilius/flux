<template>
    <FluxStatisticsChartPane
        icon="chart-line"
        title="Monthly revenue"
        :aspect-ratio="2.5">
        <FluxStatisticsAreaChart :series="series"/>

        <template #legend>
            <FluxStatisticsLegend>
                <FluxStatisticsLegendItem
                    color="primary"
                    label="Revenue"/>
            </FluxStatisticsLegend>
        </template>

        <template #toolbar>
            <FluxToolbarGroup>
                <FluxAction icon="arrow-down-to-line"/>
            </FluxToolbarGroup>
        </template>
    </FluxStatisticsChartPane>
</template>

<script
    setup
    lang="ts">
    import { FluxAction, FluxToolbarGroup } from '@flux-ui/components';
    import { FluxStatisticsAreaChart, FluxStatisticsChartPane, FluxStatisticsLegend, FluxStatisticsLegendItem } from '@flux-ui/statistics';

    const series = [{
        name: 'Revenue',
        data: [4200, 5800, 4900, 7100, 6300, 8900, 7400, 9200, 8100, 10400, 9600, 11200]
    }];
</script>
