<template>
    <FluxStatisticsChartPane
        icon="chart-line"
        title="Pipeline"
        :aspect-ratio="2">
        <FluxStatisticsEmpty
            icon="circle-plus"
            title="No deals in your pipeline"
            description="Add a deal to start tracking conversion rate and value.">
            <FluxPrimaryButton
                label="Create deal"
                icon-before="plus"/>
        </FluxStatisticsEmpty>
    </FluxStatisticsChartPane>
</template>

<script
    setup
    lang="ts">
    import { FluxPrimaryButton } from '@flux-ui/components';
    import { FluxStatisticsChartPane, FluxStatisticsEmpty } from '@flux-ui/statistics';
</script>
