<template>
    <FluxFlex
        direction="vertical"
        :gap="9">
        <FluxBadgeGroup
            badge-label="Resolved"
            color="success"
            label="All systems are operational again"/>

        <FluxBadgeGroup
            badge-label="Maintenance"
            color="warning"
            label="Scheduled downtime on Sunday at 02:00 UTC"/>

        <FluxBadgeGroup
            badge-label="Incident"
            color="danger"
            label="We're investigating degraded API performance"/>
    </FluxFlex>
</template>

<script
    lang="ts"
    setup>
    import { FluxBadgeGroup, FluxFlex } from '@flux-ui/components';
</script>
