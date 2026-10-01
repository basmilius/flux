<template>
    <FluxTree>
        <FluxTreeItem label="Meridian Studio">
            <FluxTreeItem color="success">
                <template #label>
                    <FluxText :weight="600">Billing and subscriptions</FluxText>
                    <br>
                    <FluxText
                        color="muted"
                        size="small">Customer platform</FluxText>
                </template>
            </FluxTreeItem>
        </FluxTreeItem>
    </FluxTree>
</template>

<script
    lang="ts"
    setup>
    import { FluxText, FluxTree, FluxTreeItem } from '@flux-ui/components';
</script>
