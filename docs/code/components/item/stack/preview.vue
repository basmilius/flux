<template>
    <Preview>
        <FluxPane style="width: min(100%, 420px)">
            <FluxItemStack>
                <FluxItem
                    v-for="item in items"
                    :key="item.label">
                    <FluxItemContent is-center>
                        <strong>{{ item.label }}</strong>
                        <span style="font-size: .875rem; opacity: .6">{{ item.value }}</span>
                    </FluxItemContent>
                </FluxItem>
            </FluxItemStack>
        </FluxPane>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import { FluxItem, FluxItemContent, FluxItemStack, FluxPane } from '@flux-ui/components';

    const items = [
        {label: 'Status', value: 'Active'},
        {label: 'Created', value: 'January 1, 2025'},
        {label: 'Updated', value: 'March 7, 2026'}
    ];
</script>
