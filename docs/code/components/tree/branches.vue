<template>
    <FluxTree>
        <FluxTreeItem
            color="primary"
            label="Meridian Studio">
            <FluxTreeItem
                color="info"
                label="Customer platform">
                <FluxTreeItem label="Account management"/>
                <FluxTreeItem
                    color="success"
                    is-highlighted
                    label="Billing and subscriptions"/>
            </FluxTreeItem>

            <FluxTreeItem
                color="warning"
                label="Internal tools">
                <FluxTreeItem label="Asset library"/>
            </FluxTreeItem>
        </FluxTreeItem>

        <FluxTreeItem label="Shared services"/>
    </FluxTree>
</template>

<script
    lang="ts"
    setup>
    import { FluxTree, FluxTreeItem } from '@flux-ui/components';
</script>
