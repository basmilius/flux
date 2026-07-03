<template>
    <FluxBadgeStack>
        <FluxBadge
            color="primary"
            label="Small"
            size="small"/>

        <FluxBadge
            color="primary"
            label="Medium"/>

        <FluxBadge
            color="primary"
            label="Large"
            size="large"/>
    </FluxBadgeStack>
</template>

<script
    lang="ts"
    setup>
    import { FluxBadge, FluxBadgeStack } from '@flux-ui/components';
</script>
