<template>
    <FluxDescriptionList>
        <FluxDescriptionItem
            icon="circle-check"
            label="Status">
            <FluxBadge
                color="success"
                label="Active"/>
        </FluxDescriptionItem>
    </FluxDescriptionList>
</template>

<script
    setup
    lang="ts">
    import { FluxBadge, FluxDescriptionItem, FluxDescriptionList } from '@flux-ui/components';
</script>
