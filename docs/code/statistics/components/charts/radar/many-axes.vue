<template>
    <FluxStatisticsChartPane
        icon="chart-line"
        title="Product scorecard"
        :aspect-ratio="1.4">
        <FluxStatisticsRadarChart
            :indicators="indicators"
            :series="series"/>
    </FluxStatisticsChartPane>
</template>

<script
    setup
    lang="ts">
    import type { FluxStatisticsChartRadarIndicator, FluxStatisticsChartRadarSeries } from '@flux-ui/types';
    import { FluxStatisticsChartPane, FluxStatisticsRadarChart } from '@flux-ui/statistics';

    const series: FluxStatisticsChartRadarSeries[] = [
        { name: 'Product', values: [84, 76, 92, 68, 80, 74, 88, 82] }
    ];

    const indicators: FluxStatisticsChartRadarIndicator[] = [
        { name: 'Performance', max: 100 },
        { name: 'Stability', max: 100 },
        { name: 'Security', max: 100 },
        { name: 'Usability', max: 100 },
        { name: 'Accessibility', max: 100 },
        { name: 'Documentation', max: 100 },
        { name: 'Support', max: 100 },
        { name: 'Onboarding', max: 100 }
    ];
</script>
