<template>
    <div style="display: flex; flex-flow: column; gap: 15px">
        <div style="display: flex; align-items: center; gap: 9px">
            <FluxToggle
                v-model="showCone"/>

            Prediction cone
        </div>

        <FluxContextMenu :debug-cone="showCone">
            <FluxPane style="padding: 36px; text-align: center">
                Right-click here
            </FluxPane>

            <template #menu="{close}">
                <FluxMenu>
                    <FluxMenuGroup>
                        <FluxMenuItem
                            icon-leading="pen"
                            label="Rename"
                            type="button"
                            @click="close"/>

                        <FluxMenuFlyout
                            icon="arrow-up-from-square"
                            label="Share">
                            <FluxMenu>
                                <FluxMenuGroup>
                                    <FluxMenuItem
                                        icon-leading="paper-plane"
                                        label="Email"
                                        type="button"
                                        @click="close"/>

                                    <FluxMenuItem
                                        icon-leading="copy"
                                        label="Copy link"
                                        type="button"
                                        @click="close"/>
                                </FluxMenuGroup>
                            </FluxMenu>
                        </FluxMenuFlyout>
                    </FluxMenuGroup>

                    <FluxSeparator/>

                    <FluxMenuGroup>
                        <FluxMenuItem
                            icon-leading="trash"
                            is-destructive
                            label="Delete"
                            type="button"
                            @click="close"/>
                    </FluxMenuGroup>
                </FluxMenu>
            </template>
        </FluxContextMenu>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { FluxContextMenu, FluxMenu, FluxMenuFlyout, FluxMenuGroup, FluxMenuItem, FluxPane, FluxSeparator, FluxToggle } from '@flux-ui/components';
    import { ref } from 'vue';

    const showCone = ref(false);
</script>
