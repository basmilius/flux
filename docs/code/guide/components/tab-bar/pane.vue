<template>
    <FluxPane>
        <FluxPaneHeader
            title="Flux packages"/>
        <FluxTabBar>
            <FluxTabBarItem
                icon="cubes"
                label="Components"
                :is-active="index == 0"
                @click="index = 0"/>

            <FluxTabBarItem
                icon="desktop"
                label="Dashboard"
                :is-active="index == 1"
                @click="index = 1"/>

            <FluxTabBarItem
                icon="puzzle-piece"
                label="Internals"
                :is-active="index == 2"
                @click="index = 2"/>
        </FluxTabBar>

        <FluxPaneBody>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam aliquid aperiam earum facilis fugiat in, itaque laboriosam, libero molestias nulla, pariatur qui quod sequi sint totam? Fuga ipsum placeat unde.
        </FluxPaneBody>
    </FluxPane>
</template>

<script
    setup
    lang="ts">
    import { FluxPane, FluxPaneBody, FluxPaneHeader, FluxTabBar, FluxTabBarItem } from '@flux-ui/components';
    import { ref } from 'vue';

    const index = ref(0);
</script>
