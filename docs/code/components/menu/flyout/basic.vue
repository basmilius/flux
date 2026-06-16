<template>
    <div style="display: flex; flex-flow: column; gap: 15px">
        <div style="display: flex; align-items: center; gap: 9px">
            <FluxToggle
                v-model="showCone"/>

            Prediction cone
        </div>

        <FluxPane style="width: 300px">
            <FluxMenu :debug-cone="showCone">
                <FluxMenuGroup>
                    <FluxMenuItem
                        icon-leading="plus"
                        label="New file"/>

                    <FluxMenuFlyout
                        icon="arrow-up-from-square"
                        label="Export as">
                        <FluxMenu>
                            <FluxMenuGroup>
                                <FluxMenuItem label="PDF"/>

                                <FluxMenuItem label="PNG"/>

                                <FluxMenuItem label="SVG"/>
                            </FluxMenuGroup>
                        </FluxMenu>
                    </FluxMenuFlyout>
                </FluxMenuGroup>
            </FluxMenu>
        </FluxPane>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { FluxMenu, FluxMenuFlyout, FluxMenuGroup, FluxMenuItem, FluxPane, FluxToggle } from '@flux-ui/components';
    import { ref } from 'vue';

    const showCone = ref(false);
</script>
