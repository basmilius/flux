<template>
    <FluxDescriptionList title="Account">
        <FluxDescriptionItem
            icon="user"
            label="Name">
            Bas Milius
        </FluxDescriptionItem>

        <FluxDescriptionItem
            icon="phone"
            label="Phone">
            +31 6 1234 5678
        </FluxDescriptionItem>

        <FluxDescriptionItem
            icon="location-dot"
            label="Location">
            Amsterdam, NL
        </FluxDescriptionItem>

        <FluxDescriptionItem
            icon="circle-check"
            label="Status">
            <FluxBadge
                color="success"
                label="Active"/>
        </FluxDescriptionItem>

        <FluxDescriptionItem
            icon="calendar"
            label="Member since">
            March 2021
        </FluxDescriptionItem>
    </FluxDescriptionList>
</template>

<script
    setup
    lang="ts">
    import { FluxBadge, FluxDescriptionItem, FluxDescriptionList } from '@flux-ui/components';
</script>
