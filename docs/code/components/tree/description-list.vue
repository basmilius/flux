<template>
    <FluxDescriptionList>
        <FluxDescriptionItem
            is-stacked
            label="Project">
            <FluxTree>
                <FluxTreeItem
                    color="primary"
                    label="Meridian Studio — Digital product design and platform engineering">
                    <FluxTreeItem
                        color="info"
                        label="Customer platform">
                        <FluxTreeItem
                            color="success"
                            is-highlighted
                            label="Billing and subscriptions"/>
                    </FluxTreeItem>
                </FluxTreeItem>
            </FluxTree>
        </FluxDescriptionItem>

        <FluxDescriptionItem
            is-stacked
            label="Contact">
            Platform team
        </FluxDescriptionItem>
    </FluxDescriptionList>
</template>

<script
    lang="ts"
    setup>
    import { FluxDescriptionItem, FluxDescriptionList, FluxTree, FluxTreeItem } from '@flux-ui/components';
</script>
