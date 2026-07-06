<template>
    <FluxBadgeStack>
        <FluxBadge
            colored
            label="Neutral"/>

        <FluxBadge
            color="primary"
            colored
            label="Primary"/>

        <FluxBadge
            color="info"
            colored
            label="Info"/>

        <FluxBadge
            color="success"
            colored
            label="Success"/>

        <FluxBadge
            color="warning"
            colored
            label="Warning"/>

        <FluxBadge
            color="danger"
            colored
            label="Danger"/>
    </FluxBadgeStack>
</template>

<script
    lang="ts"
    setup>
    import { FluxBadge, FluxBadgeStack } from '@flux-ui/components';
</script>
