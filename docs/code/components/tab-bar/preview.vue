<template>
    <Preview>
        <FluxPane style="max-width: max-content">
            <FluxPaneBody>
                <FluxTabBar>
                    <FluxTabBarItem
                        label="Components"/>

                    <FluxTabBarItem
                        label="Dashboard"/>

                    <FluxTabBarItem
                        label="Internals"/>
                </FluxTabBar>
            </FluxPaneBody>
        </FluxPane>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import { FluxPane, FluxPaneBody, FluxTabBar, FluxTabBarItem } from '@flux-ui/components';
</script>
