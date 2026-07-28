<template>
    <FluxApplicationPageHeader title="Project Atlas">
        <template #actions>
            <FluxPrimaryButton
                icon-leading="plus"
                label="New task"/>
        </template>

        <FluxTabBar>
            <FluxTabBarItem
                label="Board"
                :is-active="index === 0"
                @click="index = 0"/>

            <FluxTabBarItem
                label="Backlog"
                :is-active="index === 1"
                @click="index = 1"/>

            <FluxTabBarItem
                label="Activity"
                :is-active="index === 2"
                @click="index = 2"/>
        </FluxTabBar>
    </FluxApplicationPageHeader>
</template>

<script
    setup
    lang="ts">
    import { FluxApplicationPageHeader } from '@flux-ui/application';
    import { FluxPrimaryButton, FluxTabBar, FluxTabBarItem } from '@flux-ui/components';
    import { ref } from 'vue';

    const index = ref(0);
</script>
