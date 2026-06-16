<template>
    <FluxDescriptionList title="Order summary">
        <FluxDescriptionItem
            icon="file-lines"
            label="Order">
            <FluxAction icon="copy"/>
            #2024-0042
        </FluxDescriptionItem>

        <FluxDescriptionItem
            icon="circle-check"
            label="Payment">
            <FluxBadge
                color="success"
                label="Paid"/>
        </FluxDescriptionItem>

        <FluxDescriptionItem
            icon="truck"
            label="Shipping">
            Express
        </FluxDescriptionItem>

        <FluxDescriptionItem
            icon="money-bill"
            label="Total">
            € 1,240.00
        </FluxDescriptionItem>

        <FluxDescriptionItem
            icon="location-dot"
            is-stacked
            label="Delivery address">
            1600 Amphitheatre Parkway, Mountain View, CA 94043
        </FluxDescriptionItem>
    </FluxDescriptionList>
</template>

<script
    setup
    lang="ts">
    import { FluxAction, FluxBadge, FluxDescriptionItem, FluxDescriptionList } from '@flux-ui/components';
</script>
