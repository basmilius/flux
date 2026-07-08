<template>
    <FluxTabBar>
        <FluxTabBarItem
            label="Overview"
            is-active/>

        <FluxTabBarItem label="Activity"/>

        <FluxTabBarItem label="Settings"/>
    </FluxTabBar>
</template>

<script
    setup
    lang="ts">
    import { FluxTabBar, FluxTabBarItem } from '@flux-ui/components';
</script>
