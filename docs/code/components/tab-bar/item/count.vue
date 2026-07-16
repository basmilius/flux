<template>
    <FluxTabBar>
        <FluxTabBarItem
            icon="envelope"
            :is-active="index == 0"
            label="Inbox"
            @click="index = 0">
            <template #end>
                <FluxBadge label="12"/>
            </template>
        </FluxTabBarItem>

        <FluxTabBarItem
            icon="file-lines"
            :is-active="index == 1"
            label="Drafts"
            @click="index = 1">
            <template #end>
                <FluxBadge label="3"/>
            </template>
        </FluxTabBarItem>

        <FluxTabBarItem
            icon="paper-plane"
            :is-active="index == 2"
            label="Sent"
            @click="index = 2"/>
    </FluxTabBar>
</template>

<script
    setup
    lang="ts">
    import { FluxBadge, FluxTabBar, FluxTabBarItem } from '@flux-ui/components';
    import { ref } from 'vue';

    const index = ref(0);
</script>
