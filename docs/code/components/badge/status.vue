<template>
    <FluxBadgeStack>
        <FluxBadge
            color="success"
            icon="circle-check"
            label="Paid"/>

        <FluxBadge
            color="warning"
            icon="hourglass-clock"
            label="Pending"/>

        <FluxBadge
            color="info"
            icon="rotate"
            label="Refunded"/>

        <FluxBadge
            color="danger"
            icon="circle-exclamation"
            label="Overdue"/>
    </FluxBadgeStack>
</template>

<script
    lang="ts"
    setup>
    import { FluxBadge, FluxBadgeStack } from '@flux-ui/components';
</script>
