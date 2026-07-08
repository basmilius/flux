<template>
    <FluxTabBar>
        <FluxTabBarItem
            icon="house"
            label="Home"
            is-active/>

        <FluxTabBarItem
            icon="chart-line"
            label="Analytics"/>

        <FluxTabBarItem
            icon="gear"
            label="Settings"/>
    </FluxTabBar>
</template>

<script
    setup
    lang="ts">
    import { FluxTabBar, FluxTabBarItem } from '@flux-ui/components';
</script>
