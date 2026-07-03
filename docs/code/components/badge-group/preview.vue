<template>
    <Preview>
        <FluxBadgeGroup
            color="primary"
            icon-trailing="arrow-right"
            label="Check out the new dashboard">
            <template #start>
                <FluxBadge label="New feature"/>
            </template>
        </FluxBadgeGroup>
    </Preview>
</template>

<script
    lang="ts"
    setup>
    import { FluxBadge, FluxBadgeGroup } from '@flux-ui/components';
</script>
