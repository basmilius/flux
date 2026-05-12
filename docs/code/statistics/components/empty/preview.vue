<template>
    <Preview>
        <FluxStatisticsChartPane
            icon="chart-line"
            title="Revenue"
            :aspect-ratio="2.4">
            <FluxStatisticsEmpty
                icon="chart-line"
                title="No data yet"
                description="Once you record your first sale, a revenue chart will appear here."/>
        </FluxStatisticsChartPane>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import { FluxStatisticsChartPane, FluxStatisticsEmpty } from '@flux-ui/statistics';
</script>
