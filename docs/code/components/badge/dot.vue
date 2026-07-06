<template>
    <FluxBadgeStack>
        <FluxBadge
            color="success"
            dot
            label="Operational"/>

        <FluxBadge
            color="warning"
            dot
            label="Degraded"/>

        <FluxBadge
            color="info"
            dot
            label="Maintenance"/>

        <FluxBadge
            color="danger"
            dot
            label="Boot failure"/>
    </FluxBadgeStack>
</template>

<script
    lang="ts"
    setup>
    import { FluxBadge, FluxBadgeStack } from '@flux-ui/components';
</script>
