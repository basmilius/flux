<template>
    <FluxFlex
        direction="vertical"
        :gap="9">
        <FluxBadgeGroup
            color="primary"
            label="A compact badge group"
            size="small">
            <template #start>
                <FluxBadge label="Small"/>
            </template>
        </FluxBadgeGroup>

        <FluxBadgeGroup
            color="primary"
            label="The default badge group">
            <template #start>
                <FluxBadge label="Medium"/>
            </template>
        </FluxBadgeGroup>

        <FluxBadgeGroup
            color="primary"
            label="A more prominent badge group"
            size="large">
            <template #start>
                <FluxBadge label="Large"/>
            </template>
        </FluxBadgeGroup>
    </FluxFlex>
</template>

<script
    lang="ts"
    setup>
    import { FluxBadge, FluxBadgeGroup, FluxFlex } from '@flux-ui/components';
</script>
