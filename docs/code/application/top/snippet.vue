<template>
    <FluxApplicationTop
        icon="house"
        title="Dashboard">
        <template #end>
            <FluxPrimaryButton
                icon-leading="plus"
                label="New"/>
        </template>

        <template #tabs>
            <FluxTabBarItem
                label="Overview"
                :to="{name: 'dashboard.overview'}"/>

            <FluxTabBarItem
                label="Activity"
                :to="{name: 'dashboard.activity'}"/>
        </template>
    </FluxApplicationTop>
</template>

<script
    setup
    lang="ts">
    import { FluxApplicationTop } from '@flux-ui/application';
    import { FluxPrimaryButton, FluxTabBarItem } from '@flux-ui/components';
</script>
