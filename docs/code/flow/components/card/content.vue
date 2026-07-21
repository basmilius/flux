<template>
    <div style="display: flex; justify-content: center; padding: 12px 0">
        <FluxFlowActionCard title="Generate Report" icon="brain" color="primary">
            Summarizes the quarter's numbers into an executive brief.

            <FluxDescriptionList>
                <FluxDescriptionItem label="Model">Opus 4.8</FluxDescriptionItem>
                <FluxDescriptionItem label="Tokens">394</FluxDescriptionItem>
                <FluxDescriptionItem label="Duration">0.43s</FluxDescriptionItem>
            </FluxDescriptionList>

            <FluxStatisticsLegend direction="vertical">
                <FluxStatisticsLegendItem color="primary" label="Revenue" value="+12%"/>
                <FluxStatisticsLegendItem color="warning" label="Churn" value="-3%"/>
                <FluxStatisticsLegendItem color="success" label="Retention" value="94%"/>
            </FluxStatisticsLegend>
        </FluxFlowActionCard>
    </div>
</template>

<script
    setup
    lang="ts">
    import { FluxDescriptionItem, FluxDescriptionList } from '@flux-ui/components';
    import { FluxFlowActionCard } from '@flux-ui/flow';
    import { FluxStatisticsLegend, FluxStatisticsLegendItem } from '@flux-ui/statistics';
</script>
