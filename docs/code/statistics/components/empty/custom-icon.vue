<template>
    <FluxStatisticsChartPane
        icon="bell"
        title="Notifications"
        :aspect-ratio="2.4">
        <FluxStatisticsEmpty
            icon="bell"
            title="All caught up"
            description="You have no new notifications. Anything new will show up here."/>
    </FluxStatisticsChartPane>
</template>

<script
    setup
    lang="ts">
    import { FluxStatisticsChartPane, FluxStatisticsEmpty } from '@flux-ui/statistics';
</script>
