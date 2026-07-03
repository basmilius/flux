<template>
    <FluxFlex
        direction="vertical"
        :gap="9">
        <FluxBadgeGroup
            icon-trailing="arrow-right"
            label="Senior Frontend Developer"
            type="link"
            href="#">
            <template #start>
                <FluxBadge label="Engineering"/>
            </template>
        </FluxBadgeGroup>

        <FluxBadgeGroup
            icon-trailing="arrow-right"
            label="Product Designer"
            type="link"
            href="#">
            <template #start>
                <FluxBadge label="Design"/>
            </template>
        </FluxBadgeGroup>

        <FluxBadgeGroup
            icon-trailing="arrow-right"
            label="Content Strategist"
            type="link"
            href="#">
            <template #start>
                <FluxBadge label="Marketing"/>
            </template>
        </FluxBadgeGroup>
    </FluxFlex>
</template>

<script
    lang="ts"
    setup>
    import { FluxBadge, FluxBadgeGroup, FluxFlex } from '@flux-ui/components';
</script>
