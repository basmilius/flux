<template>
    <FluxFlex
        direction="vertical"
        :gap="9">
        <FluxBadgeGroup
            badge-label="Engineering"
            icon="arrow-right"
            label="Senior Frontend Developer"
            type="link"
            href="#"/>

        <FluxBadgeGroup
            badge-label="Design"
            icon="arrow-right"
            label="Product Designer"
            type="link"
            href="#"/>

        <FluxBadgeGroup
            badge-label="Marketing"
            icon="arrow-right"
            label="Content Strategist"
            type="link"
            href="#"/>
    </FluxFlex>
</template>

<script
    lang="ts"
    setup>
    import { FluxBadgeGroup, FluxFlex } from '@flux-ui/components';
</script>
