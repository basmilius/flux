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
                        icon-leading="pen"
                        label="Edit"/>

                    <FluxMenuFlyout
                        icon="arrow-up-from-square"
                        label="Share">
                        <FluxMenu>
                            <FluxMenuGroup>
                                <FluxMenuItem
                                    icon-leading="paper-plane"
                                    label="Email"/>

                                <FluxMenuFlyout
                                    icon="users"
                                    label="Social">
                                    <FluxMenu>
                                        <FluxMenuGroup>
                                            <FluxMenuItem label="Mastodon"/>

                                            <FluxMenuItem label="Bluesky"/>

                                            <FluxMenuItem label="LinkedIn"/>
                                        </FluxMenuGroup>
                                    </FluxMenu>
                                </FluxMenuFlyout>

                                <FluxMenuItem
                                    icon-leading="copy"
                                    label="Copy link"/>
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
