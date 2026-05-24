<template>
    <FluxStatisticsBase
        icon="chart-pie"
        title="Sales by category">
        <FluxStatisticsLegendScope>
            <FluxFlex
                align="center"
                direction="horizontal"
                :gap="18">
                <div style="position: relative; aspect-ratio: 1; flex: 0 0 180px">
                    <FluxStatisticsPieChart :slices="slices"/>
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
    import { FluxStatisticsBase, FluxStatisticsLegend, FluxStatisticsLegendScope, FluxStatisticsPieChart } from '@flux-ui/statistics';
    import type { FluxStatisticsChartPieSlice } from '@flux-ui/types';

    const slices: FluxStatisticsChartPieSlice[] = [
        { label: 'Electronics', value: 38, color: 'primary', icon: 'laptop' },
        { label: 'Clothing', value: 27, color: '#10b981', icon: 'shirt' },
        { label: 'Books', value: 20, color: '#3b82f6', icon: 'book' },
        { label: 'Other', value: 15, color: '#f59e0b', icon: 'cubes' }
    ];
</script>
