<template>
    <FluxBadgeStack>
        <FluxBadgeGroup
            badge-label="Small"
            color="primary"
            label="A compact badge group"
            size="small"/>

        <FluxBadgeGroup
            badge-label="Medium"
            color="primary"
            label="The default badge group"/>

        <FluxBadgeGroup
            badge-label="Large"
            color="primary"
            label="A more prominent badge group"
            size="large"/>
    </FluxBadgeStack>
</template>

<script
    lang="ts"
    setup>
    import { FluxBadgeGroup, FluxBadgeStack } from '@flux-ui/components';
</script>
