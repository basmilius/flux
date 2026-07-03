<template>
    <FluxBadgeStack>
        <FluxBadgeGroup
            badge-label="New feature"
            label="We've just released the new dashboard"/>

        <FluxBadgeGroup
            badge-label="Update"
            color="success"
            label="Version 2.4 is now available"/>
    </FluxBadgeStack>
</template>

<script
    lang="ts"
    setup>
    import { FluxBadgeGroup, FluxBadgeStack } from '@flux-ui/components';
</script>
