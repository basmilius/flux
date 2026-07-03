<template>
    <FluxBadgeGroup
        color="info"
        icon-trailing="arrow-right"
        label="Read the release notes"
        type="link"
        href="#">
        <template #start>
            <FluxBadge label="What's new?"/>
        </template>
    </FluxBadgeGroup>
</template>

<script
    lang="ts"
    setup>
    import { FluxBadge, FluxBadgeGroup } from '@flux-ui/components';
</script>
