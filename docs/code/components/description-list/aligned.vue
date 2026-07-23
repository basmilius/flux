<template>
    <FluxDescriptionList
        title="Account"
        :label-width="180">
        <FluxDescriptionItem label="Name">
            Bas Milius
        </FluxDescriptionItem>

        <FluxDescriptionItem label="Phone">
            +31 6 1234 5678
        </FluxDescriptionItem>

        <FluxDescriptionItem label="Location">
            Amsterdam, NL
        </FluxDescriptionItem>

        <FluxDescriptionItem label="Status">
            <FluxBadge
                color="success"
                label="Active"/>
        </FluxDescriptionItem>

        <FluxDescriptionItem label="Member since">
            March 2021
        </FluxDescriptionItem>
    </FluxDescriptionList>
</template>

<script
    setup
    lang="ts">
    import { FluxBadge, FluxDescriptionItem, FluxDescriptionList } from '@flux-ui/components';
</script>
