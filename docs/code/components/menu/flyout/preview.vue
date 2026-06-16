<template>
    <Preview>
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

                                    <FluxMenuItem
                                        icon-leading="copy"
                                        label="Copy link"/>
                                </FluxMenuGroup>
                            </FluxMenu>
                        </FluxMenuFlyout>
                    </FluxMenuGroup>

                    <FluxSeparator/>

                    <FluxMenuGroup>
                        <FluxMenuItem
                            icon-leading="trash"
                            is-destructive
                            label="Delete"/>
                    </FluxMenuGroup>
                </FluxMenu>
            </FluxPane>
        </div>
    </Preview>
</template>

<script
    lang="ts"
    setup>
    import { FluxMenu, FluxMenuFlyout, FluxMenuGroup, FluxMenuItem, FluxPane, FluxSeparator, FluxToggle } from '@flux-ui/components';
    import { ref } from 'vue';

    const showCone = ref(false);
</script>
