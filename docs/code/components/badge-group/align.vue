<template>
    <FluxBadgeStack>
        <FluxBadgeGroup
            badge-label="New feature"
            color="primary"
            label="We've just released the new dashboard"/>

        <FluxBadgeGroup
            align="trailing"
            badge-label="New feature"
            color="primary"
            label="We've just released the new dashboard"/>
    </FluxBadgeStack>
</template>

<script
    lang="ts"
    setup>
    import { FluxBadgeGroup, FluxBadgeStack } from '@flux-ui/components';
</script>
