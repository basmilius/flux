<template>
    <FluxStatisticsChartPane
        icon="circle"
        title="Goal progress"
        :aspect-ratio="1.4">
        <FluxStatisticsRadialBar :series="series"/>
    </FluxStatisticsChartPane>
</template>

<script
    setup
    lang="ts">
    import { FluxStatisticsChartPane, FluxStatisticsRadialBar } from '@flux-ui/statistics';

    const series = [{
        data: [{ value: 63, name: 'Average' }],
        detail: {
            formatter: (value: number) => `${value}%`
        },
        title: {
            color: 'var(--foreground-secondary)',
            fontSize: 13,
            fontWeight: 500
        }
    }];
</script>
