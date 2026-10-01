<template>
    <Preview>
        <FluxTree style="max-width: 450px">
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
    </Preview>
</template>

<script
    lang="ts"
    setup>
    import { FluxTree, FluxTreeItem } from '@flux-ui/components';
</script>
