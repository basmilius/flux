<template>
    <FluxStatisticsChartPane
        icon="rectangle-history"
        title="Browser share"
        :aspect-ratio="2.4">
        <FluxStatisticsTreemapChart :series="series"/>
    </FluxStatisticsChartPane>
</template>

<script
    setup
    lang="ts">
    import { FluxStatisticsChartPane, FluxStatisticsTreemapChart } from '@flux-ui/statistics';

    const series = [{
        color: ['var(--primary-500)', 'var(--info-500)', 'var(--success-500)', 'var(--warning-500)', 'var(--gray-500)'],
        data: [
            { value: 62, name: 'Chrome' },
            { value: 19, name: 'Safari' },
            { value: 10, name: 'Edge' },
            { value: 6, name: 'Firefox' },
            { value: 3, name: 'Other' }
        ]
    }];
</script>
