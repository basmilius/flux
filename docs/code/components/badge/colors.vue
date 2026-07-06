<template>
    <FluxBadgeStack>
        <FluxBadge label="Neutral"/>

        <FluxBadge
            color="primary"
            label="Primary"/>

        <FluxBadge
            color="info"
            label="Info"/>

        <FluxBadge
            color="success"
            label="Success"/>

        <FluxBadge
            color="warning"
            label="Warning"/>

        <FluxBadge
            color="danger"
            label="Danger"/>
    </FluxBadgeStack>
</template>

<script
    lang="ts"
    setup>
    import { FluxBadge, FluxBadgeStack } from '@flux-ui/components';
</script>
