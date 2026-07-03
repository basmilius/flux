<template>
    <FluxFlex
        direction="vertical"
        :gap="9">
        <FluxBadgeGroup
            color="success"
            label="All systems are operational again">
            <template #start>
                <FluxBadge label="Resolved"/>
            </template>
        </FluxBadgeGroup>

        <FluxBadgeGroup
            color="warning"
            label="Scheduled downtime on Sunday at 02:00 UTC">
            <template #start>
                <FluxBadge label="Maintenance"/>
            </template>
        </FluxBadgeGroup>

        <FluxBadgeGroup
            color="danger"
            label="We're investigating degraded API performance">
            <template #start>
                <FluxBadge label="Incident"/>
            </template>
        </FluxBadgeGroup>
    </FluxFlex>
</template>

<script
    lang="ts"
    setup>
    import { FluxBadge, FluxBadgeGroup, FluxFlex } from '@flux-ui/components';
</script>
