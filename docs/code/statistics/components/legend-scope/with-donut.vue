<template>
    <FluxStatisticsBase
        icon="chart-pie"
        title="Traffic sources">
        <FluxStatisticsLegendScope>
            <FluxFlex
                align="center"
                direction="horizontal"
                :gap="18">
                <div style="position: relative; aspect-ratio: 1; flex: 0 0 180px">
                    <FluxStatisticsDonutChart :slices="slices"/>
                </div>

                <FluxStatisticsLegend/>
            </FluxFlex>
        </FluxStatisticsLegendScope>
    </FluxStatisticsBase>
</template>

<script
    setup
    lang="ts">
    import { FluxFlex } from '@flux-ui/components';
    import { FluxStatisticsBase, FluxStatisticsDonutChart, FluxStatisticsLegend, FluxStatisticsLegendScope } from '@flux-ui/statistics';
    import type { FluxStatisticsChartPieSlice } from '@flux-ui/types';

    const slices: FluxStatisticsChartPieSlice[] = [
        { label: 'Organic', value: 44, color: 'primary' },
        { label: 'Direct', value: 28, color: '#10b981' },
        { label: 'Referral', value: 18, color: '#3b82f6' },
        { label: 'Social', value: 10, color: '#f59e0b' }
    ];
</script>
