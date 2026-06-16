<template>
    <FluxDescriptionList direction="horizontal">
        <FluxDescriptionItem
            icon="building"
            label="Company">
            Oracle Studios
        </FluxDescriptionItem>

        <FluxDescriptionItem
            icon="user"
            label="Job Title">
            Product Manager
        </FluxDescriptionItem>

        <FluxDescriptionItem
            icon="money-bill"
            label="Revenue">
            $ 4,000
        </FluxDescriptionItem>
    </FluxDescriptionList>
</template>

<script
    setup
    lang="ts">
    import { FluxDescriptionItem, FluxDescriptionList } from '@flux-ui/components';
</script>
