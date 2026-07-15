<template>
    <FluxStatisticsBase
        style="min-width: 100%; max-width: 420px"
        icon="chart-pie"
        title="Traffic sources">
        <FluxStatisticsPercentageBar :items="items"/>
    </FluxStatisticsBase>
</template>

<script
    setup
    lang="ts">
    import { FluxStatisticsBase, FluxStatisticsPercentageBar } from '@flux-ui/statistics';
    import type { FluxStatisticsPercentageBarItemObject } from '@flux-ui/types';

    const items: FluxStatisticsPercentageBarItemObject[] = [
        { label: 'Organic', color: 'primary', value: 0.48 },
        { label: 'Direct', color: 'success', value: 0.24 },
        { label: 'Referral', color: 'info', value: 0.16 },
        { label: 'Social', color: 'warning', value: 0.08 },
        { label: 'Other', color: 'gray', value: 0.04 }
    ];
</script>
