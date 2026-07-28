<template>
    <FluxStatisticsChartPane
        icon="chart-line"
        title="Monthly revenue"
        :aspect-ratio="2.5"
        :is-loading="isLoading">
        <FluxStatisticsAreaChart :series="series"/>

        <template #toolbar>
            <FluxSecondaryButton
                label="Reload"
                @click="reload"/>
        </template>
    </FluxStatisticsChartPane>
</template>

<script
    setup
    lang="ts">
    import { FluxSecondaryButton } from '@flux-ui/components';
    import { FluxStatisticsAreaChart, FluxStatisticsChartPane } from '@flux-ui/statistics';
    import { ref } from 'vue';

    const isLoading = ref(false);

    const series = [{
        name: 'Revenue',
        data: [4200, 5800, 4900, 7100, 6300, 8900, 7400, 9200, 8100, 10400, 9600, 11200]
    }];

    function reload(): void {
        isLoading.value = true;

        setTimeout(() => isLoading.value = false, 2000);
    }
</script>
