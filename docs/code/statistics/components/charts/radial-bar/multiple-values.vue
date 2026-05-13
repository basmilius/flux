<template>
    <FluxStatisticsChartPane
        icon="gauge-high"
        title="Subsystem health"
        :aspect-ratio="1.4">
        <FluxStatisticsRadialBar :series="series"/>

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
    import { FluxStatisticsChartPane, FluxStatisticsLegend, FluxStatisticsLegendItem, FluxStatisticsRadialBar } from '@flux-ui/statistics';

    const series = [
        { radius: '90%', data: [{ value: 92, name: 'API' }], title: { offsetCenter: [0, '-70%'] }, detail: { offsetCenter: [0, '-55%'] } },
        { radius: '70%', data: [{ value: 78, name: 'DB' }], title: { offsetCenter: [0, '-25%'] }, detail: { offsetCenter: [0, '-10%'] } },
        { radius: '50%', data: [{ value: 64, name: 'Workers' }], title: { offsetCenter: [0, '20%'] }, detail: { offsetCenter: [0, '35%'] } }
    ];
</script>
