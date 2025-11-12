<template>
    <Preview>
        <FluxPane style="max-width: max-content">
            <FluxPaneBody>
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
            </FluxPaneBody>
        </FluxPane>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import { FluxPane, FluxPaneBody, FluxTabBar, FluxTabBarItem } from '@flux-ui/components';
    import { ref } from 'vue';

    const index = ref(0);
</script>
