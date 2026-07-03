<template>
    <FluxBadgeStack>
        <FluxBadgeGroup
            color="primary"
            label="We've just released the new dashboard">
            <template #start>
                <FluxBadge label="New feature"/>
            </template>
        </FluxBadgeGroup>

        <FluxBadgeGroup
            color="primary"
            label="We've just released the new dashboard">
            <template #end>
                <FluxBadge label="New feature"/>
            </template>
        </FluxBadgeGroup>
    </FluxBadgeStack>
</template>

<script
    lang="ts"
    setup>
    import { FluxBadge, FluxBadgeGroup, FluxBadgeStack } from '@flux-ui/components';
</script>
