<template>
    <Preview>
        <FluxStatisticsChartPane
            icon="chart-pie"
            title="Traffic sources"
            :aspect-ratio="1.5">
            <FluxStatisticsDonutChart :series="series"/>

            <template #legend>
                <FluxStatisticsLegend/>
            </template>
        </FluxStatisticsChartPane>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import { FluxStatisticsChartPane, FluxStatisticsDonutChart, FluxStatisticsLegend } from '@flux-ui/statistics';

    const series = [{
        color: ['var(--primary-600)', '#10b981', '#3b82f6', '#f59e0b'],
        data: [
            { value: 44, name: 'Organic' },
            { value: 28, name: 'Direct' },
            { value: 18, name: 'Referral' },
            { value: 10, name: 'Social' }
        ]
    }];
</script>
